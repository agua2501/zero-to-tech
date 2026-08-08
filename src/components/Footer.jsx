import { Link } from "react-router-dom";
import { useLang } from "../i18n";

const footerLinks = [
  { key: "footer_link_home", to: "/" },
  { key: "footer_link_overview", to: "/overview" },
  { key: "footer_link_news", to: "/news" },
  { key: "footer_link_routes", to: "/routes" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>{t("footer_about_title")}</h4>
          <p>{t("footer_about")}</p>
        </div>
        <div className="footer-col">
          <h4>{t("footer_links_title")}</h4>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.key}>
                <Link to={link.to}>{t(link.key)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>{t("footer_contact_title")}</h4>
          <p dangerouslySetInnerHTML={{ __html: t("footer_contact") }} />
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>{t("footer_copyright")}</p>
          <div className="footer-social">
            <a href="#" title="微信">W</a>
            <a href="#" title="微博">S</a>
            <a href="#" title="抖音">T</a>
            <a href="#" title="邮箱">@</a>
          </div>
        </div>
      </div>
    </footer>
  );
}