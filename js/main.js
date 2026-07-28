/* ===========================================
   国际化数据
   =========================================== */
window.__lang = window.__lang || {};
const L = window.__lang;

const ZH = {
  nav_home: "首页",
  nav_overview: "茂名概述",
  nav_news: "旅游咨询",
  nav_routes: "旅游线路",
  nav_login: "登录",
  nav_logout: "退出",
  banner_title: "山海并茂，好客茂名欢迎您",
  sidebar_title: "茂名旅游",
  sidebar_1: "跨年活动",
  sidebar_2: "美丽风景",
  sidebar_3: "旅游攻略",
  sidebar_4: "酒店住宿",
  sidebar_5: "图片",
  sidebar_6: "视频",
  news_title: "最新资讯",
  news_more: "更多资讯>",
  news_1: "被茂名的海上烟花浪漫到了",
  news_2: "茂名2镇5村入选省文化和旅游特色镇村",
  news_3: "茂名荔枝文化节盛大开幕",
  news_4: "中国第一滩夏季旅游旺季开启",
  news_5: "广湛高铁茂名段建设提速",
  news_6: '茂名"好心文化"亮相文博会',
  news_7: "茂名推进绿美生态建设",
  news_8: "茂名新增两条高速公路",
  news_9: "茂名端午龙舟赛火热开赛",
  news_10: "茂名滨海旅游公路全线贯通",
  route_title: "精品线路",
  route_tag1: "山海城三日游",
  route_tag2: "自驾游",
  route_tag3: "美食特色游",
  route_tag4: "古城之旅",
  route_tag5: "水果之旅",
  route_more: "全部线路>",
  route_item1_title: "大炮茂版迪士尼",
  route_item1_desc: "不是上海迪士尼去不起，而是茂名迪士尼更有性价比",
  route_item2_title: "茂名露天矿",
  route_item2_desc: '露天矿变身"城市绿肺"碧波荡漾的湖水映着蓝天。',
  route_item3_title: "茂名三官顶",
  route_item3_desc: "青春无售价，夜爬三官顶看最美的日出吹清晨的山风。",
  route_item4_title: "巴布几内湾",
  route_item4_desc: "傍晚与海见个面，感受海的氛围感，滤镜加加加到厌倦。",
  guide_title: "旅游向导",
  guide_scene: "景区",
  guide_route: "线路",
  guide_food: "美食",
  guide_hotel: "酒店",
  guide_shop: "购物",
  footer_about_title: "关于茂名",
  footer_about: '茂名位于广东省西南部，是一座拥有滨海风光、山地景观和丰富文化的美丽城市，被誉为"南方油城"和"中国荔枝之乡"。',
  footer_links_title: "快速链接",
  footer_link_home: "首页",
  footer_link_overview: "茂名概述",
  footer_link_news: "旅游咨询",
  footer_link_routes: "旅游线路",
  footer_contact_title: "联系方式",
  footer_contact: "地址：广东省茂名市<br>邮箱：info@maoming-travel.com<br>电话：0668-XXXXXXX",
  footer_copyright: "© 2025 茂名旅游网站 — 本站为学习作品，部分素材来自网络",
  guide_scene_1: "中国第一滩",
  guide_scene_2: "放鸡岛",
  guide_scene_3: "浪漫海岸",
  guide_scene_4: "御水古温泉",
  guide_scene_5: "天马山",
  guide_route_1: "滨海风情线",
  guide_route_2: "山地探幽线",
  guide_route_3: "美食寻味线",
  guide_route_4: "文化古迹线",
  guide_route_5: "田园采摘线",
  guide_food_1: "茂名荔枝",
  guide_food_2: "电白海鲜",
  guide_food_3: "化州糖水",
  guide_food_4: "篃箕簺",
  guide_food_5: "水东鸭粥",
  guide_hotel_1: "海景度假酒店",
  guide_hotel_2: "温泉民宿",
  guide_hotel_3: "市区商务酒店",
  guide_hotel_4: "森林公园营地",
  guide_hotel_5: "特色渔家乐",
  guide_shop_1: "茂名月饼",
  guide_shop_2: "化橘红",
  guide_shop_3: "荔枝干果",
  guide_shop_4: "南玉工艺品",
  guide_shop_5: "电白沉香",
  overview_title: "茂名市情",
  overview_from: "来源：广东省情网",
  route_card_1_title: "露天矿生态公园一日游",
  route_card_1_desc: "游览茂名露天矿生态公园，欣赏碧波范溪的湖水与城市绿肺，包含导游讲解和骑行体验",
  route_card_2_title: "三官顶日出露营2日游",
  route_card_2_desc: "夜爬三官顶，观赏绝美日出，包含露营装备、早餐和专业向导服务",
  route_card_3_title: "放鸡岛海岛度假3日游",
  route_card_3_desc: "畅游放鸡岛，体验浮潜、海钓等水上项目，含住宿和三餐",
  route_card_4_title: "茂名古城文化一日游",
  route_card_4_desc: "探访茂名古城遗址，了解当地历史文化，含特色午餐",
  route_card_5_title: "浪漫海岸·中国第一滩滨海度假2日游",
  route_card_5_desc: "畅游浪漫海岸国际旅游度假区，漫步中国第一滩银色沙滩，体验海上娱乐项目，入住海景度假酒店观日落",
  route_card_6_title: "御水古温泉·天马山生态休闲2日游",
  route_card_6_desc: "泡御水古温泉放松身心，登天马山赏原始森林风光，含温泉票、山景民宿和特色农家宴",
  route_card_7_title: "岭南凤凰园·古典园林文化一日游",
  route_card_7_desc: "游览岭南凤凰园，欣赏精致的岭南园林艺术，感受古典建筑与自然山水的融合，含专业导游讲解和特色茶点",
  route_card_8_title: "仙人洞自然探险一日游",
  route_card_8_desc: "探秘茂名仙人洞，观赏天然溶洞奇观，体验山林徒步与瀑布清溪，含景区门票和当地农家午餐",
  route_card_9_title: "广东天马山生态旅游景区一日游",
  route_card_9_desc: "登天马山观云海日出，漫步原始森林栈道，探访天马瀑布群，呼吸天然氧吧清新空气，含景区门票和特色午餐",
};
const EN = {
  nav_home: "Home",
  nav_overview: "About",
  nav_news: "News",
  nav_routes: "Routes",
  nav_login: "Login",
  nav_logout: "Logout",
  banner_title: "Welcome to Maoming — Where Mountains Meet the Sea",
  sidebar_title: "Maoming Travel",
  sidebar_1: "New Year Events",
  sidebar_2: "Scenic Spots",
  sidebar_3: "Travel Guides",
  sidebar_4: "Hotels",
  sidebar_5: "Gallery",
  sidebar_6: "Videos",
  news_title: "Latest News",
  news_more: "More >",
  news_1: "Maoming's Sea Fireworks Are Absolutely Stunning",
  news_2: "Two Towns in Maoming Listed as Provincial Cultural Tourism Destinations",
  news_3: "Maoming Lychee Festival Grand Opening",
  news_4: "Summer Tourism Season Begins at China First Beach",
  news_5: "Guangzhou-Zhanjiang High-Speed Rail Construction Accelerates",
  news_6: "Maoming Culture Shines at Shenzhen Cultural Expo",
  news_7: "Maoming Advances Green Ecological Construction",
  news_8: "Two New Expressways Added in Maoming",
  news_9: "Maoming Dragon Boat Festival Kicks Off",
  news_10: "Maoming Coastal Tourism Highway Fully Opens",
  route_title: "Featured Routes",
  route_tag1: "3-Day Coastal Tour",
  route_tag2: "Self-Drive Tour",
  route_tag3: "Food Tour",
  route_tag4: "Heritage Tour",
  route_tag5: "Fruit Tour",
  route_more: "All Routes >",
  route_item1_title: "Maoming Disneyland",
  route_item1_desc: "Why go to Shanghai? Maoming's own Disneyland has its own charm!",
  route_item2_title: "Open-pit Mine Park",
  route_item2_desc: "A former mine transformed into a beautiful urban oasis with crystal-clear lake waters.",
  route_item3_title: "Sanguanding Peak",
  route_item3_desc: "Youth is priceless — hike up Sanguanding at night to watch the most beautiful sunrise.",
  route_item4_title: "Babu Jinei Bay",
  route_item4_desc: "Meet the sea at dusk and feel the ocean breeze — the perfect evening escape.",
  guide_title: "Travel Guide",
  guide_scene: "Attractions",
  guide_route: "Routes",
  guide_food: "Food",
  guide_hotel: "Hotels",
  guide_shop: "Shopping",
  footer_about_title: "About Maoming",
  footer_about: "Maoming is a beautiful city in southwestern Guangdong, known for its coastal scenery, mountain landscapes, rich culture, and renowned as the Lychee Capital of China.",
  footer_links_title: "Quick Links",
  footer_link_home: "Home",
  footer_link_overview: "About",
  footer_link_news: "News",
  footer_link_routes: "Routes",
  footer_contact_title: "Contact",
  footer_contact: "Address: Maoming, Guangdong<br>Email: info@maoming-travel.com<br>Tel: 0668-XXXXXXX",
  footer_copyright: "© 2025 Maoming Travel Site — Educational Project",
  guide_scene_1: "China First Beach",
  guide_scene_2: "Fangji Island",
  guide_scene_3: "Romantic Coast",
  guide_scene_4: "Yushui Ancient Hot Spring",
  guide_scene_5: "Tianma Mountain",
  guide_route_1: "Coastal Scenic Route",
  guide_route_2: "Mountain Discovery Route",
  guide_route_3: "Food Discovery Route",
  guide_route_4: "Cultural Heritage Route",
  guide_route_5: "Orchard Picking Route",
  guide_food_1: "Maoming Lychee",
  guide_food_2: "Dianbai Seafood",
  guide_food_3: "Huazhou Sweet Soup",
  guide_food_4: "Boji Rice Cake",
  guide_food_5: "Shuidong Duck Congee",
  guide_hotel_1: "Seaview Resort Hotel",
  guide_hotel_2: "Hot Spring B&B",
  guide_hotel_3: "City Business Hotel",
  guide_hotel_4: "Forest Park Camp",
  guide_hotel_5: "Fisherman Inn",
  guide_shop_1: "Maoming Mooncake",
  guide_shop_2: "Huazhou Tangerine Peel",
  guide_shop_3: "Dried Lychee",
  guide_shop_4: "Nanyu Jade Crafts",
  guide_shop_5: "Dianbai Agarwood",
  overview_title: "About Maoming City",
  overview_from: "Source: Guangdong Provincial Information Network",
  route_card_1_title: "Open-pit Mine Eco-Park Day Tour",
  route_card_1_desc: "Visit Maoming Open-pit Mine Eco-Park, enjoy the crystal-clear lake and urban oasis. Includes guided tour and cycling experience.",
  route_card_2_title: "Sanguanding Sunrise Camping 2-Day Tour",
  route_card_2_desc: "Night hike to Sanguanding Peak for a spectacular sunrise. Includes camping gear, breakfast, and professional guide.",
  route_card_3_title: "Fangji Island Beach Resort 3-Day Tour",
  route_card_3_desc: "Explore Fangji Island with snorkeling, fishing, and water sports. Includes accommodation and meals.",
  route_card_4_title: "Maoming Ancient City Culture Day Tour",
  route_card_4_desc: "Visit Maoming ancient city ruins and learn about local history and culture. Includes lunch.",
  route_card_5_title: "Romantic Coast & China First Beach 2-Day Tour",
  route_card_5_desc: "Explore the Romantic Coast Resort, stroll along China First Beach's silver sands, enjoy water sports, and stay at a seaview hotel with sunset views.",
  route_card_6_title: "Yushui Hot Spring & Tianma Mountain 2-Day Tour",
  route_card_6_desc: "Soak in Yushui Ancient Hot Spring, hike Tianma Mountain's pristine forests, with hot spring tickets, mountain-view B&B, and farmhouse meals included.",
  route_card_7_title: "Lingnan Phoenix Garden Culture Day Tour",
  route_card_7_desc: "Explore the exquisite Lingnan Phoenix Garden, admire classical Lingnan garden art blending architecture with natural landscapes. Includes guided tour and specialty tea.",
  route_card_8_title: "Xianren Cave Nature Adventure Day Tour",
  route_card_8_desc: "Discover the stunning Xianren Cave with its natural karst formations, enjoy forest hiking and waterfall streams. Includes entrance ticket and farmhouse lunch.",
  route_card_9_title: "Tianma Mountain Eco-Tourism Day Tour",
  route_card_9_desc: "Hike Tianma Mountain for sea-of-clouds and sunrise views, walk ancient forest boardwalks, discover Tianma Waterfall clusters, and breathe fresh forest air. Includes entrance ticket and lunch.",
};

// Assign language data
window.__lang.zh = ZH;
window.__lang.en = EN;
window.__lang.ja = {};
window.__lang.ko = {};
for (let k in ZH) { window.__lang.ja[k] = ZH[k]; window.__lang.ko[k] = ZH[k]; }
window.__lang.ja.nav_home = "ホーム";
window.__lang.ja.nav_overview = "概要";
window.__lang.ja.nav_news = "お知らせ";
window.__lang.ja.nav_routes = "ルート";
window.__lang.ja.nav_login = "ログイン";
window.__lang.ja.banner_title = "山海相映、茂名へようこそ";
window.__lang.ja.sidebar_title = "茂名観光";
window.__lang.ko.nav_home = "홈";
window.__lang.ko.nav_overview = "개요";
window.__lang.ko.nav_news = "소식";
window.__lang.ko.nav_routes = "코스";
window.__lang.ko.nav_login = "로그인";
window.__lang.ko.banner_title = "산과 바다가 어우러진 무명에 오신 것을 환영합니다";
window.__lang.ko.sidebar_title = "무명 여행";

(function(){"use strict";
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",init)}else{init()}
  function init(){buildMobileMenu();buildBackToTop();initScrollReveal();initSmoothLinks();initLoginStatus();initLangSwitcher()}

  function buildMobileMenu(){
    const nav=document.querySelector(".nav");if(!nav||nav.querySelector(".menu-toggle"))return;
    const t=document.createElement("button");t.className="menu-toggle";t.setAttribute("aria-label","切换菜单");
     t.innerHTML="<span class=\"menu-icon\">☰</span><span class=\"menu-label\">更多</span>";
    t.addEventListener("click",function(){document.querySelector(".nav-links").classList.toggle("menu-open");this.classList.toggle("active")});
    nav.insertBefore(t,nav.firstChild)
  }

  function buildBackToTop(){
    const btn=document.createElement("button");btn.className="back-to-top";btn.setAttribute("aria-label","回到顶部");btn.innerHTML="↑";
    btn.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});document.body.appendChild(btn);
    let ticking=false;window.addEventListener("scroll",function(){if(!ticking){requestAnimationFrame(function(){btn.classList.toggle("visible",window.scrollY>400);ticking=false});ticking=true}})
  }

  function initScrollReveal(){
    const els=document.querySelectorAll(".one,.two,.top3,.content,.travel-container,.news-list");
    if(!els.length||!("IntersectionObserver"in window))return;
    const o=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){e.target.classList.add("reveal-visible");o.unobserve(e.target)}})},{threshold:0.1});
    els.forEach(function(e){e.classList.add("reveal-hidden");o.observe(e)})
  }

  function initSmoothLinks(){
    document.querySelectorAll(".nav-links a").forEach(function(l){
      const h=l.getAttribute("href");
      if(h&&h.indexOf("#")!==0&&h.indexOf("javascript")!==0){
        l.addEventListener("click",function(e){e.preventDefault();const t=this.getAttribute("href");if(!t)return;document.body.style.opacity="0";document.body.style.transition="opacity 0.25s ease";setTimeout(function(){window.location.href=t},250)})
      }
    })
  }

  function initLoginStatus(){
    const u=localStorage.getItem("username"),el=document.getElementById("navLogin");
    if(u&&el){el.textContent=u+" (退出)";el.href="#";el.addEventListener("click",function(e){e.preventDefault();if(confirm("确定退出登录？")){localStorage.removeItem("token");localStorage.removeItem("username");location.reload()}})}
  }

  /* ===== 语言切换 ===== */
  let currentLang = "zh";

  function initLangSwitcher(){
    const switcher=document.getElementById("langSwitcher");
    if(!switcher)return;
    const items=switcher.querySelectorAll("li");

    items.forEach(function(item){
      item.addEventListener("click",function(){
        items.forEach(function(i){i.classList.remove("active")});
        this.classList.add("active");
        switchLang(this.getAttribute("data-lang"))
      })
    });

        const saved=localStorage.getItem("preferred_lang");
    if(saved&&saved!=="zh"){
      items.forEach(function(i){
        if(i.getAttribute("data-lang")===saved){i.classList.add("active");switchLang(saved)}
      })
    }
  }

  function switchLang(lang){
    if(!window.__lang||!window.__lang[lang])return;
    currentLang=lang;
    const t=window.__lang[lang];

    // Navigation
    setNavText(t);
    // Banner
    const bp=document.querySelector(".banner>p");
    if(bp&&t.banner_title)bp.textContent=t.banner_title;
    // Sidebar
    setText(".one>.left>h2",t.sidebar_title);
    const sideItems=document.querySelectorAll(".one>.left>ul>li");
    if(sideItems.length>=6){
      if(t.sidebar_1)sideItems[0].textContent=t.sidebar_1;
      if(t.sidebar_2)sideItems[1].textContent=t.sidebar_2;
      if(t.sidebar_3)sideItems[2].textContent=t.sidebar_3;
      if(t.sidebar_4)sideItems[3].textContent=t.sidebar_4;
      if(t.sidebar_5)sideItems[4].textContent=t.sidebar_5;
      if(t.sidebar_6)sideItems[5].textContent=t.sidebar_6;
    }
    // News
    setText(".news_left",t.news_title);
    const newsMore=document.querySelector(".news_right a");
    if(newsMore&&t.news_more)newsMore.textContent=t.news_more;
    const newsItems=document.querySelectorAll(".one>.right>ul>li");
    if(newsItems.length>=8){
      for(let i=0;i<8;i++){const key="news_"+(i+1);if(t[key])newsItems[i].textContent=t[key]}
    }
    // Routes section
    setText(".twoleft>.top>.title",t.route_title);
    const tags=document.querySelectorAll(".twoleft>.top>.item");
    if(tags.length>=5){
      if(t.route_tag1)tags[0].textContent=t.route_tag1;
      if(t.route_tag2)tags[1].textContent=t.route_tag2;
      if(t.route_tag3)tags[2].textContent=t.route_tag3;
      if(t.route_tag4)tags[3].textContent=t.route_tag4;
      if(t.route_tag5)tags[4].textContent=t.route_tag5;
    }
    setText(".twoleft>.top>.more>a",t.route_more);
    // Route items
    const routeTitles=document.querySelectorAll(".bottomright .itemRight h3");
    const routeDescs=document.querySelectorAll(".bottomright .itemRight p");
    if(routeTitles.length>=3){
      if(t.route_item1_title)routeTitles[0].textContent=t.route_item1_title;
      if(t.route_item2_title)routeTitles[1].textContent=t.route_item2_title;
      if(t.route_item3_title)routeTitles[2].textContent=t.route_item3_title;
    }
    if(routeDescs.length>=3){
      if(t.route_item1_desc)routeDescs[0].textContent=t.route_item1_desc;
      if(t.route_item2_desc)routeDescs[1].textContent=t.route_item2_desc;
      if(t.route_item3_desc)routeDescs[2].textContent=t.route_item3_desc;
    }
    // World item
    const worldTitle=document.querySelector(".world>.title");
    if(worldTitle&&t.route_item1_title){
      worldTitle.innerHTML=worldTitle.innerHTML.replace(/[^>]*$/,t.route_item1_title)
    }
    // Guide
    setText(".guide",t.guide_title);
    const guideLabels=document.querySelectorAll(".top3>.area>.item>span");
    if(guideLabels.length>=5){
      if(t.guide_scene)guideLabels[0].textContent=t.guide_scene;
      if(t.guide_route)guideLabels[1].textContent=t.guide_route;
      if(t.guide_food)guideLabels[2].textContent=t.guide_food;
      if(t.guide_hotel)guideLabels[3].textContent=t.guide_hotel;
      if(t.guide_shop)guideLabels[4].textContent=t.guide_shop;
    }
    // Footer
    setText(".footer-col:nth-child(1) h4",t.footer_about_title);
    const aboutP=document.querySelector(".footer-col:nth-child(1) p");
    if(aboutP&&t.footer_about)aboutP.textContent=t.footer_about;
    setText(".footer-col:nth-child(2) h4",t.footer_links_title);
    const fLinks=document.querySelectorAll(".footer-col:nth-child(2) a");
    if(fLinks.length>=4){
      if(t.footer_link_home)fLinks[0].textContent=t.footer_link_home;
      if(t.footer_link_overview)fLinks[1].textContent=t.footer_link_overview;
      if(t.footer_link_news)fLinks[2].textContent=t.footer_link_news;
      if(t.footer_link_routes)fLinks[3].textContent=t.footer_link_routes;
    }
    setText(".footer-col:nth-child(3) h4",t.footer_contact_title);
    const contactP=document.querySelector(".footer-col:nth-child(3) p");
    if(contactP&&t.footer_contact)contactP.innerHTML=t.footer_contact;
    setText(".footer-bottom p",t.footer_copyright);

        // 旅游线路 page
    if(document.querySelector(".travel-container")){
      const rh=document.querySelector(".travel-container h2");
      if(rh&&t.route_title)rh.textContent=t.route_title;
    }
    // 旅游咨询 page
    if(document.querySelector(".page-title")){
      const pt=document.querySelector(".page-title span")||document.querySelector(".page-title");
      if(pt&&t.nav_news)pt.textContent=t.nav_news;
    // Guide sub-items
    if(document.querySelector(".top3")){
      const cats=["scene","route","food","hotel","shop"];
      for(let ci=0;ci<5;ci++){
        const items=document.querySelectorAll(".top3>.area>.item:nth-child("+(ci+1)+") ul li");
        for(let si=0;si<items.length;si++){const gk="guide_"+cats[ci]+"_"+(si+1);if(t[gk])items[si].textContent=t[gk]}
      }
    }
    // Overview page
    if(document.querySelector(".content")){
      const oh=document.querySelector(".content h1");
      if(oh&&t.overview_title)oh.textContent=t.overview_title;
      const of=document.querySelector(".content > .from");
      if(of&&t.overview_from)of.textContent=t.overview_from;
    }
    }    localStorage.setItem("preferred_lang",lang);
  }

  function setNavText(t){
    const links=document.querySelectorAll(".nav-links a");
    if(links.length>=5){
      if(t.nav_home)links[0].textContent=t.nav_home;
      if(t.nav_overview)links[1].textContent=t.nav_overview;
      if(t.nav_news)links[2].textContent=t.nav_news;
      if(t.nav_routes)links[3].textContent=t.nav_routes;
      // 4th is login - only change if not logged in
      if(t.nav_login&&!localStorage.getItem("username"))links[4].textContent=t.nav_login
    }
  }

  function setText(sel,val){
    const el=document.querySelector(sel);
    if(el&&val)el.textContent=val
  }
})();






