import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import "../../css/index.css";

const sidebarKeys = ["sidebar_1", "sidebar_2", "sidebar_3", "sidebar_4", "sidebar_5", "sidebar_6"];

const slides = [
  { src: "/img/221.jpg", alt: "茂名滨海风光", caption: "茂名 · 滨海风光" },
  { src: "/img/343s.jpg", alt: "茂名山海美景", caption: "茂名 · 山海之城" },
  { src: "/img/R-C.jpg", alt: "茂名城景风貌", caption: "茂名 · 城市风貌" },
];

const newsKeys = ["news_1", "news_2", "news_3", "news_4", "news_5", "news_6", "news_7", "news_8"];

const routeTagKeys = ["route_tag1", "route_tag2", "route_tag3", "route_tag4", "route_tag5"];

const routeCards = [
  { no: "02", img: "/img/1122.jpg", alt: "茂名露天矿", key: "route_item2" },
  { no: "03", img: "/img/615.jpg", alt: "茂名三官顶", key: "route_item3" },
  { no: "04", img: "/img/4631.jpg", alt: "巴布几内湾", key: "route_item4" },
];

const guideAreas = [
  { key: "scene", img: "/img/travel_guider_p001.jpeg" },
  { key: "route", img: "/img/travel_guider_p002.jpeg" },
  { key: "food", img: "/img/travel_guider_p003.jpeg" },
  { key: "hotel", img: "/img/travel_guider_p004.jpeg" },
  { key: "shop", img: "/img/travel_guider_p005.jpeg" },
];

export default function Home() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const goTo = (n) => setCurrent(((n % slides.length) + slides.length) % slides.length);

  return (
    <>
      <section className="one">
        <aside className="left">
          <h2>{t("sidebar_title")}</h2>
          <ul>
            {sidebarKeys.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </aside>

        <div
          className="center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="carousel-track">
            {slides.map((slide, index) => (
              <div
                className={index === current ? "carousel-slide active" : "carousel-slide"}
                key={slide.alt}
              >
                <img src={slide.src} alt={slide.alt} />
                <div className="carousel-caption">{slide.caption}</div>
              </div>
            ))}
          </div>
          <button
            className="carousel-btn carousel-prev"
            aria-label="上一张"
            onClick={() => goTo(current - 1)}
          >
            &#10094;
          </button>
          <button
            className="carousel-btn carousel-next"
            aria-label="下一张"
            onClick={() => goTo(current + 1)}
          >
            &#10095;
          </button>
          <div className="carousel-dots">
            {slides.map((slide, index) => (
              <span
                key={slide.alt}
                className={index === current ? "dot active" : "dot"}
                onClick={() => goTo(index)}
              ></span>
            ))}
          </div>
        </div>

        <section className="right">
          <div className="news">
            <span className="news_left">{t("news_title")}</span>
            <span className="news_right"><Link to="/news">{t("news_more")}</Link></span>
          </div>
          <ul>
            {newsKeys.map((key) => (
              <li key={key}><Link to="/news">{t(key)}</Link></li>
            ))}
          </ul>
        </section>
      </section>

      <section className="two">
        <div className="twoleft">
          <div className="top">
            <span className="title">{t("route_title")}</span>
            {routeTagKeys.map((key) => (
              <Link to="/routes" className="item" key={key}>{t(key)}</Link>
            ))}
            <span className="more"><Link to="/routes">{t("route_more")}</Link></span>
          </div>

          <div className="bottom">
            <div className="bottomleft">
              <div className="world">
                <p className="title"><em>01</em> {t("route_item1_title")}</p>
                <p>{t("route_item1_desc")}</p>
              </div>
              <div className="pic"></div>
            </div>

            <div className="bottomright">
              <div className="top2Right">
                {routeCards.map((card) => (
                  <div className="item" key={card.key}>
                    <img loading="lazy" src={card.img} alt={card.alt} />
                    <div className="itemRight">
                      <h3><em>{card.no}</em> {t(card.key + "_title")}</h3>
                      <p>{t(card.key + "_desc")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="twoRight">
          <div className="item"><span className="twoRight-label">滨海度假</span></div>
          <div className="item"><span className="twoRight-label">山地探险</span></div>
          <div className="item"><span className="twoRight-label">人文之旅</span></div>
        </aside>
      </section>

      <section className="top3">
        <h2 className="guide">{t("guide_title")}</h2>
        <div className="area">
          {guideAreas.map((area) => (
            <div className="item" key={area.key}>
              <span>{t("guide_" + area.key)}</span>
              <Link to="/routes"><img loading="lazy" src={area.img} alt={t("guide_" + area.key)} /></Link>
              <ul>
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n}><Link to="/routes">{t("guide_" + area.key + "_" + n)}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}