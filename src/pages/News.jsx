import { useEffect, useState } from "react";
import { useLang } from "../i18n";
import "../../css/旅游咨询.css";

const TAG_RULES = [
  { pattern: /文化|文博|非遗|节日|龙舟|荔枝/, label: "文化活动", cls: "news-tag-amber" },
  { pattern: /高铁|公路|高速|交通|贯通|提速/, label: "交通建设", cls: "news-tag-blue" },
  { pattern: /旅游|度假|旺季|滨海|第一滩/, label: "旅游动态", cls: "news-tag-green" },
  { pattern: /生态|绿美|空气|环保/, label: "生态环境", cls: "news-tag-teal" },
  { pattern: /产业|投资|产值|经济/, label: "产业经济", cls: "news-tag-purple" },
  { pattern: /乡村|振兴|百千万/, label: "乡村振兴", cls: "news-tag-rose" },
  { pattern: /教育|研学|基地/, label: "教育研学", cls: "news-tag-sky" },
];

function getTag(title) {
  for (const rule of TAG_RULES) {
    if (rule.pattern.test(title)) return rule;
  }
  return { label: "旅游资讯", cls: "news-tag-blue" };
}

const MONTH_ZH = ["", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

function parseDate(dateStr) {
  const parts = String(dateStr).split("-");
  if (parts.length < 3) return { day: dateStr, month: "", year: "" };
  const m = parseInt(parts[1], 10);
  return { day: parts[2], month: MONTH_ZH[m] || m, year: parts[0] };
}

function NewsItem({ item, index }) {
  const d = parseDate(item.date);
  const tag = getTag(item.title);
  return (
    <li className={"news-item" + (index === 0 ? " pinned" : "")}>
      <div className="news-date-col">
        <div className="news-date-box">
          <span className="news-date-day">{d.day}</span>
          <span className="news-date-month">{d.month}</span>
        </div>
        {d.year ? <span className="news-date-year">{d.year}</span> : null}
      </div>
      <div className="news-content-col">
        <div className="news-tag-row">
          <span className={"news-tag " + tag.cls}>{tag.label}</span>
        </div>
        <h3 className="news-title">{item.title}</h3>
        <div className="news-meta">
          <span>{item.date}</span>
          <span className="dot"></span>
          <span>茂名旅游</span>
          <span className="read-more">阅读全文 →</span>
        </div>
      </div>
    </li>
  );
}

export default function News() {
  const { t } = useLang();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok || !data.data) throw new Error("bad");
        setItems(data.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="news-card">
      <div className="page-title">
        <span>{t("nav_news")}</span>
        <span className="count">{items.length ? "共 " + items.length + " 条" : ""}</span>
      </div>
      <div className="news-divider"></div>
      <ul className="news-list">
        {loading
          ? [1, 2, 3, 4, 5].map((n) => (
              <li className="skeleton-item" key={n}>
                <div className="skeleton-box"></div>
                <div className="skeleton-lines">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                </div>
              </li>
            ))
          : error
            ? (
                <li className="news-empty">
                  <span className="news-empty-icon">⚠</span>
                  加载失败<br /><span style={{ fontSize: 12, opacity: 0.6 }}>请确认后端服务已启动</span>
                </li>
              )
            : items.length === 0
              ? (
                  <li className="news-empty">
                    <span className="news-empty-icon">⌘</span>
                    暂无资讯<br /><span style={{ fontSize: 12, opacity: 0.6 }}>资讯将在发布后自动显示</span>
                  </li>
                )
              : items.map((item, index) => (
                  <NewsItem key={item.id} item={item} index={index} />
                ))}
      </ul>
    </div>
  );
}