import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { useLang } from "../i18n";
import { zh, en } from "../../js/i18n.js";
import "../../css/旅游线路.css";
import "./booking.css";

const typeMap = { coastal: "滨海风光", mountain: "山地景观", cultural: "文化古迹" };

function RouteCard({ route, dict, onBook }) {
  const title = dict["route_card_" + route.id + "_title"] || route.title;
  const desc = dict["route_card_" + route.id + "_desc"] || route.description;
  return (
    <div className="route-card">
      <img loading="lazy" src={route.img} alt={title} />
      <div className="route-info">
        <h3>{title}</h3>
        <p className="days">{route.days}天 {typeMap[route.destination] || "综合旅游"}</p>
        <p className="description">{desc}</p>
        <div className="price">¥{route.price}<span className="unit">/人起</span></div>
        <button className="book-btn" onClick={() => onBook(route)}>立即预订</button>
      </div>
    </div>
  );
}

function CommentItem({ comment }) {
  const initial = comment.username.charAt(0).toUpperCase();
  return (
    <div className="comment-item">
      <div className="comment-avatar">{initial}</div>
      <div className="comment-body">
        <div className="comment-meta">
          <span className="comment-name">{comment.username}</span>
          {comment.route_title ? <span className="comment-route-label">{comment.route_title}</span> : null}
          <span className="comment-date">{comment.created_at}</span>
        </div>
        <div className="comment-text">{comment.content}</div>
      </div>
    </div>
  );
}

export default function RoutesPage() {
  const { lang, t } = useLang();
  const { username } = useAuth();
  const dict = lang === "en" ? en : zh;

  const [routes, setRoutes] = useState([]);
  const [routesLoading, setRoutesLoading] = useState(true);
  const [filters, setFilters] = useState({ destination: "all", price: "all", days: "all" });

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentFilter, setCommentFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [commentHint, setCommentHint] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const [booking, setBooking] = useState({
    open: false, routeId: null, routeName: "", name: "", phone: "", people: "1", remark: "", error: "", submitting: false,
  });

  useEffect(() => {
    setRoutesLoading(true);
    const params = new URLSearchParams();
    if (filters.destination !== "all") params.set("destination", filters.destination);
    if (filters.price !== "all") {
      const parts = filters.price.split("-");
      if (parts.length === 2 && parts[1]) {
        params.set("priceMin", parts[0]);
        params.set("priceMax", parts[1]);
      } else {
        params.set("priceMin", parts[0].replace("+", ""));
      }
    }
    if (filters.days !== "all") params.set("days", filters.days);
    api.get("/api/routes" + (params.toString() ? "?" + params.toString() : ""))
      .then(({ data }) => {
        if (data && data.ok) setRoutes(data.data || []);
        else setRoutes([]);
      })
      .catch(() => setRoutes([]))
      .finally(() => setRoutesLoading(false));
  }, [filters]);

  useEffect(() => {
    setCommentsLoading(true);
    const url = commentFilter === "all" ? "/api/comments" : "/api/routes/" + commentFilter + "/comments";
    api.get(url)
      .then(({ data }) => {
        if (data && data.ok) setComments(data.data || []);
        else setComments([]);
      })
      .catch(() => setComments([]))
      .finally(() => setCommentsLoading(false));
  }, [commentFilter]);

  const handleSubmitComment = async () => {
    if (!username) {
      setCommentHint("请先登录后再评论");
      return;
    }
    const content = commentContent.trim();
    if (!content) {
      setCommentHint("请填写评价内容");
      return;
    }
    if (commentFilter === "all") {
      setCommentHint("请先在上方选择一条线路");
      return;
    }
    setCommentHint("");
    setSubmittingComment(true);
    const { data } = await api.post("/api/routes/" + commentFilter + "/comments", {
      username,
      content,
    });
    setSubmittingComment(false);
    if (data && data.ok) {
      setCommentContent("");
      setCommentHint("评价成功！");
      api.get("/api/routes/" + commentFilter + "/comments").then(({ data }) => {
        if (data && data.ok) setComments(data.data || []);
        setCommentsLoading(false);
      });
    } else {
      setCommentHint((data && data.msg) || "提交失败");
    }
  };

  const openBooking = (route) => {
    setBooking({
      open: true,
      routeId: route.id,
      routeName: route.title,
      name: username || "",
      phone: "",
      people: "1",
      remark: "",
      error: "",
      submitting: false,
    });
  };

  const closeBooking = () => setBooking((b) => ({ ...b, open: false, routeId: null }));
  const setBookingField = (field, value) => setBooking((b) => ({ ...b, [field]: value }));

  const handleSubmitBooking = async () => {
    const name = booking.name.trim();
    const phone = booking.phone.trim();
    const people = parseInt(booking.people, 10) || 1;
    if (!name) {
      setBooking((b) => ({ ...b, error: "请输入姓名" }));
      return;
    }
    if (!phone) {
      setBooking((b) => ({ ...b, error: "请输入电话" }));
      return;
    }
    if (!/^1\d{10}$/.test(phone) && !/^\d{3,4}-?\d{7,8}$/.test(phone)) {
      setBooking((b) => ({ ...b, error: "请输入有效的手机或固话号码" }));
      return;
    }
    setBooking((b) => ({ ...b, error: "", submitting: true }));
    const { data } = await api.post("/api/routes/" + booking.routeId + "/book", {
      name,
      phone,
      people,
      remark: booking.remark.trim(),
    });
    setBooking((b) => ({ ...b, submitting: false }));
    if (data && data.ok) {
      alert(data.msg || "预订成功！");
      closeBooking();
    } else {
      setBooking((b) => ({ ...b, error: (data && data.msg) || "预订失败" }));
    }
  };

  const shownComments = expanded ? comments : comments.slice(0, 2);

  return (
    <div className="travel-container">
      <h2>茂名精选旅游线路</h2>
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="destinationFilter">目的地类型:</label>
          <select id="destinationFilter" value={filters.destination} onChange={(e) => setFilters({ ...filters, destination: e.target.value })}>
            <option value="all">全部</option>
            <option value="coastal">滨海风光</option>
            <option value="mountain">山地景观</option>
            <option value="cultural">文化古迹</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="priceFilter">价格范围:</label>
          <select id="priceFilter" value={filters.price} onChange={(e) => setFilters({ ...filters, price: e.target.value })}>
            <option value="all">全部</option>
            <option value="0-200">200元以下</option>
            <option value="200-500">200-500元</option>
            <option value="500-1000">500-1000元</option>
            <option value="1000+">1000元以上</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="daysFilter">游玩天数:</label>
          <select id="daysFilter" value={filters.days} onChange={(e) => setFilters({ ...filters, days: e.target.value })}>
            <option value="all">全部</option>
            <option value="1">1天</option>
            <option value="2-3">2-3天</option>
            <option value="4+">4天以上</option>
          </select>
        </div>
      </div>

      <div className="route-list">
        {routesLoading ? (
          <p className="no-result">加载中...</p>
        ) : routes.length === 0 ? (
          <p className="no-result">没有找到符合条件的线路</p>
        ) : (
          routes.map((route) => (
            <RouteCard key={route.id} route={route} dict={dict} onBook={openBooking} />
          ))
        )}
      </div>

      <div className="comments-section" id="commentsSection">
        <div className="comments-header">
          <h3>游客评价</h3>
          <div className="comments-filter">
            <select
              value={commentFilter}
              onChange={(e) => {
                setCommentFilter(e.target.value);
                setExpanded(false);
              }}
            >
              <option value="all">全部线路</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>{route.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="comments-list">
          {commentsLoading ? (
            <div className="comments-loading">加载评论中...</div>
          ) : comments.length === 0 ? (
            <div className="comments-empty">暂无评价，来发表第一条吧</div>
          ) : (
            <>
              {shownComments.map((comment, index) => (
                <CommentItem key={comment.id || index} comment={comment} />
              ))}
              {comments.length > 2 && (
                <div className="comments-toggle">
                  <span className="toggle-btn" onClick={() => setExpanded(!expanded)}>
                    {expanded ? "收起评论 " : "展开全部 " + comments.length + " 条评论 "}
                    <span className="toggle-arrow">{expanded ? "▴" : "▾"}</span>
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="comment-form" id="commentForm">
          <div className="comment-form-header">
            <h4>发表评价</h4>
            <span className={"comment-login-status " + (username ? "logged-in" : "not-logged-in")}>
              {username ? (
                <>以 <strong>{username}</strong> 发表</>
              ) : (
                <>请先 <Link to="/login" className="login-link">登录</Link> 后再评论哟</>
              )}
            </span>
          </div>
          {!username && (
            <div className="comment-form-row">
              <input type="text" className="comment-input" placeholder="您的称呼" maxLength="20" disabled />
            </div>
          )}
          <div className="comment-form-row">
            <textarea
              className="comment-textarea"
              placeholder="分享您的旅行体验..."
              rows="3"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
          </div>
          <div className="comment-form-actions">
            <span className="comment-form-hint">{commentHint}</span>
            <button
              className="comment-submit"
              disabled={!username || submittingComment}
              onClick={handleSubmitComment}
            >
              {submittingComment ? "提交中..." : "提交评价"}
            </button>
          </div>
        </div>
      </div>

      {booking.open && (
        <div className="modal-overlay active">
          <div className="modal-box">
            <button className="modal-close" onClick={closeBooking}>&times;</button>
            <h3>预订线路</h3>
            <div className="route-name">{booking.routeName}</div>
            <div className="modal-field">
              <label htmlFor="modalName">姓名 *</label>
              <input type="text" id="modalName" placeholder="请输入您的姓名" maxLength="20" value={booking.name} onChange={(e) => setBookingField("name", e.target.value)} />
            </div>
            <div className="modal-field">
              <label htmlFor="modalPhone">电话 *</label>
              <input type="tel" id="modalPhone" placeholder="请输入您的手机号码" maxLength="15" value={booking.phone} onChange={(e) => setBookingField("phone", e.target.value)} />
            </div>
            <div className="modal-field">
              <label htmlFor="modalPeople">人数</label>
              <input type="number" id="modalPeople" value={booking.people} min="1" max="50" onChange={(e) => setBookingField("people", e.target.value)} />
            </div>
            <div className="modal-field">
              <label htmlFor="modalRemark">备注</label>
              <textarea id="modalRemark" placeholder="其他需求，如特殊饮食等" rows="2" value={booking.remark} onChange={(e) => setBookingField("remark", e.target.value)}></textarea>
            </div>
            <div className="modal-error">{booking.error}</div>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={closeBooking}>取消</button>
              <button className="modal-submit" disabled={booking.submitting} onClick={handleSubmitBooking}>
                {booking.submitting ? "提交中..." : "确认预订"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}