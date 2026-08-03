/* ===========================================
   全站公共交互模块
   =========================================== */
import { langData } from "./i18n.js";

export function initCommon() {
  buildMobileMenu();
  buildBackToTop();
  initScrollReveal();
  initSmoothLinks();
  initLoginStatus();
  initLangSwitcher();
}

function buildMobileMenu() {
  const nav = document.querySelector(".nav");
  if (!nav || nav.querySelector(".menu-toggle")) return;
  const t = document.createElement("button");
  t.className = "menu-toggle";
  t.setAttribute("aria-label", "切换菜单");
  t.innerHTML = '<span class="menu-icon">☰</span><span class="menu-label">更多</span>';
  t.addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("menu-open");
    this.classList.toggle("active");
  });
  nav.insertBefore(t, nav.firstChild);
}

function buildBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "回到顶部");
  btn.innerHTML = "↑";
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(btn);
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        btn.classList.toggle("visible", window.scrollY > 400);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initScrollReveal() {
  const els = document.querySelectorAll(".one,.two,.top3,.content,.travel-container,.news-list");
  if (!els.length || !("IntersectionObserver" in window)) return;
  const o = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        o.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) {
    el.classList.add("reveal-hidden");
    o.observe(el);
  });
}

function initSmoothLinks() {
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href && href.indexOf("#") !== 0 && href.indexOf("javascript") !== 0) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = this.getAttribute("href");
        if (!target) return;
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.25s ease";
        setTimeout(function () {
          window.location.href = target;
        }, 250);
      });
    }
  });
}

function initLoginStatus() {
  const username = localStorage.getItem("username");
  const el = document.getElementById("navLogin");
  if (username && el) {
    el.textContent = username + " (退出)";
    el.href = "#";
    el.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("确定退出登录？")) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        location.reload();
      }
    });
  }
}

/* ===== 语言切换 ===== */
function initLangSwitcher() {
  const switcher = document.getElementById("langSwitcher");
  if (!switcher) return;
  const items = switcher.querySelectorAll("li");

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      items.forEach(function (i) {
        i.classList.remove("active");
      });
      this.classList.add("active");
      switchLang(this.getAttribute("data-lang"));
    });
  });

  const saved = localStorage.getItem("preferred_lang");
  if (saved && saved !== "zh") {
    items.forEach(function (item) {
      if (item.getAttribute("data-lang") === saved) {
        item.classList.add("active");
        switchLang(saved);
      }
    });
  }
}

function switchLang(lang) {
  if (!langData[lang]) return;
  const data = langData[lang];

  // 导航
  setNavText(data);
  // Banner
  const bp = document.querySelector(".banner>p");
  if (bp && data.banner_title) bp.textContent = data.banner_title;
  // 侧边栏
  setText(".one>.left>h2", data.sidebar_title);
  const sideItems = document.querySelectorAll(".one>.left>ul>li");
  if (sideItems.length >= 6) {
    if (data.sidebar_1) sideItems[0].textContent = data.sidebar_1;
    if (data.sidebar_2) sideItems[1].textContent = data.sidebar_2;
    if (data.sidebar_3) sideItems[2].textContent = data.sidebar_3;
    if (data.sidebar_4) sideItems[3].textContent = data.sidebar_4;
    if (data.sidebar_5) sideItems[4].textContent = data.sidebar_5;
    if (data.sidebar_6) sideItems[5].textContent = data.sidebar_6;
  }
  // 资讯
  setText(".news_left", data.news_title);
  const newsMore = document.querySelector(".news_right a");
  if (newsMore && data.news_more) newsMore.textContent = data.news_more;
  const newsItems = document.querySelectorAll(".one>.right>ul>li");
  if (newsItems.length >= 8) {
    for (let i = 0; i < 8; i++) {
      const key = "news_" + (i + 1);
      if (data[key]) newsItems[i].textContent = data[key];
    }
  }
  // 精品线路
  setText(".twoleft>.top>.title", data.route_title);
  const tags = document.querySelectorAll(".twoleft>.top>.item");
  if (tags.length >= 5) {
    if (data.route_tag1) tags[0].textContent = data.route_tag1;
    if (data.route_tag2) tags[1].textContent = data.route_tag2;
    if (data.route_tag3) tags[2].textContent = data.route_tag3;
    if (data.route_tag4) tags[3].textContent = data.route_tag4;
    if (data.route_tag5) tags[4].textContent = data.route_tag5;
  }
  setText(".twoleft>.top>.more>a", data.route_more);
  // 首页线路条目
  const routeTitles = document.querySelectorAll(".bottomright .itemRight h3");
  const routeDescs = document.querySelectorAll(".bottomright .itemRight p");
  if (routeTitles.length >= 3) {
    if (data.route_item1_title) routeTitles[0].textContent = data.route_item1_title;
    if (data.route_item2_title) routeTitles[1].textContent = data.route_item2_title;
    if (data.route_item3_title) routeTitles[2].textContent = data.route_item3_title;
  }
  if (routeDescs.length >= 3) {
    if (data.route_item1_desc) routeDescs[0].textContent = data.route_item1_desc;
    if (data.route_item2_desc) routeDescs[1].textContent = data.route_item2_desc;
    if (data.route_item3_desc) routeDescs[2].textContent = data.route_item3_desc;
  }
  // 首页大图标题
  const worldTitle = document.querySelector(".world>.title");
  if (worldTitle && data.route_item1_title) {
    worldTitle.innerHTML = worldTitle.innerHTML.replace(/[^>]*$/, data.route_item1_title);
  }
  // 旅游向导分类名
  setText(".guide", data.guide_title);
  const guideLabels = document.querySelectorAll(".top3>.area>.item>span");
  if (guideLabels.length >= 5) {
    if (data.guide_scene) guideLabels[0].textContent = data.guide_scene;
    if (data.guide_route) guideLabels[1].textContent = data.guide_route;
    if (data.guide_food) guideLabels[2].textContent = data.guide_food;
    if (data.guide_hotel) guideLabels[3].textContent = data.guide_hotel;
    if (data.guide_shop) guideLabels[4].textContent = data.guide_shop;
  }
  // 旅游向导子项（首页 / 其他含 .top3 的页面）
  const guideAreas = document.querySelectorAll(".top3>.area>.item");
  const cats = ["scene", "route", "food", "hotel", "shop"];
  for (let ci = 0; ci < cats.length; ci++) {
    if (!guideAreas[ci]) continue;
    const items = guideAreas[ci].querySelectorAll("ul li");
    for (let si = 0; si < items.length; si++) {
      const gk = "guide_" + cats[ci] + "_" + (si + 1);
      if (data[gk]) items[si].textContent = data[gk];
    }
  }
  // 页脚
  setText(".footer-col:nth-child(1) h4", data.footer_about_title);
  const aboutP = document.querySelector(".footer-col:nth-child(1) p");
  if (aboutP && data.footer_about) aboutP.textContent = data.footer_about;
  setText(".footer-col:nth-child(2) h4", data.footer_links_title);
  const fLinks = document.querySelectorAll(".footer-col:nth-child(2) a");
  if (fLinks.length >= 4) {
    if (data.footer_link_home) fLinks[0].textContent = data.footer_link_home;
    if (data.footer_link_overview) fLinks[1].textContent = data.footer_link_overview;
    if (data.footer_link_news) fLinks[2].textContent = data.footer_link_news;
    if (data.footer_link_routes) fLinks[3].textContent = data.footer_link_routes;
  }
  setText(".footer-col:nth-child(3) h4", data.footer_contact_title);
  const contactP = document.querySelector(".footer-col:nth-child(3) p");
  if (contactP && data.footer_contact) contactP.innerHTML = data.footer_contact;
  setText(".footer-bottom p", data.footer_copyright);
  // 旅游线路页标题
  if (document.querySelector(".travel-container")) {
    const rh = document.querySelector(".travel-container h2");
    if (rh && data.route_title) rh.textContent = data.route_title;
  }
  // 旅游咨询页标题
  if (document.querySelector(".page-title")) {
    const pt = document.querySelector(".page-title span") || document.querySelector(".page-title");
    if (pt && data.nav_news) pt.textContent = data.nav_news;
  }
  // 茂名概述页标题
  if (document.querySelector(".content")) {
    const oh = document.querySelector(".content h1");
    if (oh && data.overview_title) oh.textContent = data.overview_title;
    const of = document.querySelector(".content > .from");
    if (of && data.overview_from) of.textContent = data.overview_from;
  }
  localStorage.setItem("preferred_lang", lang);
}

function setNavText(data) {
  const links = document.querySelectorAll(".nav-links a");
  if (links.length >= 5) {
    if (data.nav_home) links[0].textContent = data.nav_home;
    if (data.nav_overview) links[1].textContent = data.nav_overview;
    if (data.nav_news) links[2].textContent = data.nav_news;
    if (data.nav_routes) links[3].textContent = data.nav_routes;
    if (data.nav_login && !localStorage.getItem("username")) links[4].textContent = data.nav_login;
  }
}

function setText(sel, val) {
  const el = document.querySelector(sel);
  if (el && val) el.textContent = val;
}
