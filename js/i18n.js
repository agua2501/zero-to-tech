/* ===========================================
   国际化数据
   =========================================== */
window.__lang = window.__lang || {};
var L = window.__lang;

L.zh = {
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
  footer_copyright: "© 2025 茂名旅游网站 — 本站为学习作品，部分素材来自网络"
};

L.en = {
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
  footer_copyright: "© 2025 Maoming Travel Site — Educational Project"
};

// Japan and Korea get simplified fallback
L.ja = { };
L.ko = { };
// Copy Chinese as base for JA/KO
for (var k in L.zh) { L.ja[k] = L.zh[k]; L.ko[k] = L.zh[k]; }
// Override just nav to show language indicator
L.ja.nav_home = "ホーム";
L.ja.nav_overview = "概要";
L.ja.nav_news = "お知らせ";
L.ja.nav_routes = "ルート";
L.ja.nav_login = "ログイン";
L.ja.banner_title = "山海相映、茂名へようこそ";
L.ja.sidebar_title = "茂名観光";

L.ko.nav_home = "홈";
L.ko.nav_overview = "개요";
L.ko.nav_news = "소식";
L.ko.nav_routes = "코스";
L.ko.nav_login = "로그인";
L.ko.banner_title = "산과 바다가 어우러진 무명에 오신 것을 환영합니다";
L.ko.sidebar_title = "무명 여행";
