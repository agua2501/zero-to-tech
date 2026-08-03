/* ===========================================
   旅游线路页模块：评论列表与提交
   =========================================== */

let commentsData = [];

export function initComments() {
  loadAllComments();
  const routeFilter = document.getElementById("commentRouteFilter");
  const submitBtn = document.getElementById("commentSubmit");
  const list = document.getElementById("commentsList");
  if (routeFilter) {
    routeFilter.addEventListener("change", function () {
      loadAllComments(this.value);
    });
  }
  if (submitBtn) submitBtn.addEventListener("click", submitComment);
  if (list) {
    list.addEventListener("click", function (e) {
      if (e.target.closest(".toggle-btn")) toggleComments();
    });
  }
}

export function updateCommentLoginUI() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const nameRow = document.getElementById("commentNameRow");
  const nameInput = document.getElementById("commentName");
  const statusEl = document.getElementById("commentLoginStatus");
  const submitBtn = document.getElementById("commentSubmit");
  if (!nameRow || !nameInput || !statusEl || !submitBtn) return;

  if (token && username) {
    nameRow.style.display = "none";
    nameInput.value = username;
    statusEl.innerHTML = "以 <strong>" + username + "</strong> 发表";
    statusEl.className = "comment-login-status logged-in";
    submitBtn.disabled = false;
  } else {
    nameRow.style.display = "block";
    nameInput.value = "";
    statusEl.innerHTML = "请先 <a href='js/登录/Login.html' class='login-link'>登录</a> 后再评论哟";
    statusEl.className = "comment-login-status not-logged-in";
    submitBtn.disabled = true;
  }
}

function loadAllComments(routeId) {
  routeId = routeId || document.getElementById("commentRouteFilter").value;
  const url = routeId === "all" ? "/api/comments" : "/api/routes/" + routeId + "/comments";
  const list = document.getElementById("commentsList");
  list.innerHTML = '<div class="comments-loading">加载评论中...</div>';

  fetch(url)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data.ok || !data.data || !data.data.length) {
        list.innerHTML = '<div class="comments-empty">暂无评价，来发表第一条吧</div>';
        return;
      }
      commentsData = data.data;
      renderCommentsLimited(2);
    })
    .catch(function () {
      list.innerHTML = '<div class="comments-empty">加载评论失败</div>';
    });
}

function renderCommentsLimited(showCount) {
  const list = document.getElementById("commentsList");
  const total = commentsData.length;
  const show = Math.min(showCount, total);
  let html = commentsData.slice(0, show).map(function (c) {
    return renderComment(c);
  }).join("");

  if (total > showCount) {
    html += '<div class="comments-toggle">'
      + '<span class="toggle-btn">'
      + '展开全部 ' + total + ' 条评论 '
      + '<span class="toggle-arrow">▾</span>'
      + '</span>'
      + '</div>';
  }

  list.innerHTML = html;
  list.setAttribute("data-expanded", "false");
}

function toggleComments() {
  const list = document.getElementById("commentsList");
  const expanded = list.getAttribute("data-expanded") === "true";

  if (expanded) {
    renderCommentsLimited(2);
    list.setAttribute("data-expanded", "false");
  } else {
    let html = commentsData.map(function (c) {
      return renderComment(c);
    }).join("");
    html += '<div class="comments-toggle">'
      + '<span class="toggle-btn">'
      + '收起评论 '
      + '<span class="toggle-arrow">▴</span>'
      + '</span>'
      + '</div>';
    list.innerHTML = html;
    list.setAttribute("data-expanded", "true");
  }
}

function renderComment(c) {
  const initial = c.username.charAt(0).toUpperCase();
  const routeLabel = c.route_title ? '<span class="comment-route-label">' + c.route_title + '</span>' : '';
  return '<div class="comment-item">' +
    '<div class="comment-avatar">' + initial + '</div>' +
    '<div class="comment-body">' +
    '<div class="comment-meta">' +
    '<span class="comment-name">' + escapeHtml(c.username) + '</span>' +
    routeLabel +
    '<span class="comment-date">' + c.created_at + '</span>' +
    '</div>' +
    '<div class="comment-text">' + escapeHtml(c.content) + '</div>' +
    '</div>' +
    '</div>';
}

function submitComment() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const hint = document.getElementById("commentHint");
  const btn = document.getElementById("commentSubmit");
  if (!hint || !btn) return;

  if (!token || !username) {
    hint.innerHTML = "请先 <a href='js/登录/Login.html' style='color:var(--blue);text-decoration:underline'>登录</a> 后再评论哟";
    hint.style.color = "#D4504C";
    return;
  }

  const content = document.getElementById("commentContent").value.trim();
  const routeId = document.getElementById("commentRouteFilter").value;

  if (!content) {
    hint.textContent = "请填写评价内容";
    hint.style.color = "var(--text-muted)";
    return;
  }
  if (routeId === "all") {
    hint.textContent = "请先在上方选择一条线路";
    hint.style.color = "var(--text-muted)";
    return;
  }

  hint.textContent = "";
  btn.disabled = true;
  btn.textContent = "提交中...";

  fetch("/api/routes/" + routeId + "/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify({ username: username, content: content }),
  })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.ok) {
        document.getElementById("commentContent").value = "";
        hint.textContent = "评价成功！";
        hint.style.color = "#10A37F";
        loadAllComments(routeId);
      } else {
        hint.textContent = data.msg || "提交失败";
        hint.style.color = "#D4504C";
      }
    })
    .catch(function () {
      hint.textContent = "提交失败，请确认服务已启动";
      hint.style.color = "#D4504C";
    })
    .finally(function () {
      btn.disabled = false;
      btn.textContent = "提交评价";
    });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
