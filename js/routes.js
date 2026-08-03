/* ===========================================
   旅游线路页模块：线路加载、筛选、渲染
   =========================================== */
import { t } from "./i18n.js";

let allRoutes = [];

export function initRoutes() {
  bindFilterEvents();
  loadRoutes();
}

function loadRoutes(filters) {
  const params = new URLSearchParams(filters || {});
  const url = "/api/routes" + (params.toString() ? "?" + params.toString() : "");

  fetch(url)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.ok) {
        allRoutes = data.data;
        renderRoutes(allRoutes);
        populateRouteFilter(allRoutes);
      }
    })
    .catch(function () {
      document.getElementById("routeList").innerHTML = '<p class="no-result">无法加载线路数据，请确认服务已启动</p>';
    });
}

function populateRouteFilter(routes) {
  const sel = document.getElementById("commentRouteFilter");
  if (!sel) return;
  sel.innerHTML = '<option value="all">全部线路</option>';
  routes.forEach(function (r) {
    const opt = document.createElement("option");
    opt.value = r.id;
    opt.textContent = r.title;
    sel.appendChild(opt);
  });
}

function getRouteTranslation(routeId, field) {
  const lang = localStorage.getItem("preferred_lang") || "zh";
  return t(lang, "route_card_" + routeId + "_" + field);
}

function renderRoutes(routes) {
  const list = document.getElementById("routeList");
  list.innerHTML = "";
  if (routes.length === 0) {
    list.innerHTML = '<p class="no-result">没有找到符合条件的线路</p>';
    return;
  }
  routes.forEach(function (r) {
    const typeMap = { coastal: "滨海风光", mountain: "山地景观", cultural: "文化古迹" };
    const translatedTitle = getRouteTranslation(r.id, "title") || r.title;
    const translatedDesc = getRouteTranslation(r.id, "desc") || r.description;
    const card = document.createElement("div");
    card.className = "route-card";
    card.innerHTML =
      '<img loading="lazy" src="' + r.img + '" alt="' + translatedTitle + '">' +
      '<div class="route-info">' +
      '<h3>' + translatedTitle + '</h3>' +
      '<p class="days">' + r.days + '天 ' + (typeMap[r.destination] || "综合旅游") + '</p>' +
      '<p class="description">' + translatedDesc + '</p>' +
      '<div class="price">¥' + r.price + '<span class="unit">/人起</span></div>' +
      '<button class="book-btn" data-id="' + r.id + '">立即预订</button>' +
      '</div>';
    list.appendChild(card);
  });
}

function bindFilterEvents() {
  ["destinationFilter", "priceFilter", "daysFilter"].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("change", function () {
      const filters = {};
      const d = document.getElementById("destinationFilter").value;
      const p = document.getElementById("priceFilter").value;
      const dy = document.getElementById("daysFilter").value;
      if (d !== "all") filters.destination = d;
      if (p !== "all") {
        const parts = p.split("-");
        if (parts.length === 2 && parts[1]) {
          filters.priceMin = parts[0];
          filters.priceMax = parts[1];
        } else {
          filters.priceMin = parts[0].replace("+", "");
        }
      }
      if (dy !== "all") filters.days = dy;
      loadRoutes(filters);
    });
  });
}
