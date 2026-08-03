/* ===========================================
   旅游咨询页模块：资讯时间线
   =========================================== */

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
  for (let i = 0; i < TAG_RULES.length; i++) {
    if (TAG_RULES[i].pattern.test(title)) return TAG_RULES[i];
  }
  return { label: "旅游资讯", cls: "news-tag-blue" };
}

function parseDate(dateStr) {
  const parts = dateStr.split("-");
  if (parts.length < 3) return { day: dateStr, month: "", year: "" };
  const MONTH_ZH = ["", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  const m = parseInt(parts[1], 10);
  return {
    day: parts[2],
    month: MONTH_ZH[m] || m,
    year: parts[0],
  };
}

function renderNewsItem(item, idx) {
  const d = parseDate(item.date);
  const tag = getTag(item.title);
  const pinned = idx === 0 ? " pinned" : "";
  return '<li class="news-item' + pinned + '">'
    + '<div class="news-date-col">'
    + '<div class="news-date-box">'
    + '<span class="news-date-day">' + d.day + '</span>'
    + '<span class="news-date-month">' + d.month + '</span>'
    + '</div>'
    + (d.year ? '<span class="news-date-year">' + d.year + '</span>' : '')
    + '</div>'
    + '<div class="news-content-col">'
    + '<div class="news-tag-row">'
    + '<span class="news-tag ' + tag.cls + '">' + tag.label + '</span>'
    + '</div>'
    + '<h3 class="news-title">' + item.title + '</h3>'
    + '<div class="news-meta">'
    + '<span>' + item.date + '</span>'
    + '<span class="dot"></span>'
    + '<span>茂名旅游</span>'
    + '<span class="read-more">阅读全文 →</span>'
    + '</div>'
    + '</div>'
    + '</li>';
}

export function initNews() {
  const list = document.getElementById("newsList");
  const count = document.getElementById("newsCount");
  if (!list) return;

  fetch("/api/news")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data.ok || !data.data || !data.data.length) {
        list.innerHTML = '<li class="news-empty">'
          + '<span class="news-empty-icon">⌘</span>'
          + '暂无资讯<br><span style="font-size:12px;opacity:0.6">资讯将在发布后自动显示</span>'
          + '</li>';
        if (count) count.textContent = "";
        return;
      }
      const items = data.data;
      if (count) count.textContent = "共 " + items.length + " 条";
      list.innerHTML = items.map(function (item, idx) {
        return renderNewsItem(item, idx);
      }).join("");
    })
    .catch(function () {
      list.innerHTML = '<li class="news-empty">'
        + '<span class="news-empty-icon">⚠</span>'
        + '加载失败<br><span style="font-size:12px;opacity:0.6">请确认后端服务已启动</span>'
        + '</li>';
      if (count) count.textContent = "";
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNews);
} else {
  initNews();
}
