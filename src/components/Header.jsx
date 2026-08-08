import { NavLink } from "react-router-dom";
import { useLang } from "../i18n";
import { useAuth } from "../auth/AuthContext";

const navItems = [
  { key: "nav_home", to: "/", end: true },
  { key: "nav_overview", to: "/overview" },
  { key: "nav_news", to: "/news" },
  { key: "nav_routes", to: "/routes" },
  { key: "nav_login", to: "/login" },
];

export default function Header() {
  const { lang, t, switchLang } = useLang();
  const { username, logout } = useAuth();

  const handleNavClick = (e, item) => {
    if (item.key !== "nav_login" || !username) return;
    e.preventDefault();
    if (confirm("确定退出登录？")) logout();
  };

  return (
    <header className="header">
      <img loading="lazy" src="/img/logo.jpg" alt="茂名旅游" />
      <nav className="nav">
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.key === "nav_login" && username ? username + " (退出)" : t(item.key)}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="nav-lang">
          <li className={lang === "zh" ? "active" : ""} onClick={() => switchLang("zh")}>中</li>
          <li className={lang === "en" ? "active" : ""} onClick={() => switchLang("en")}>EN</li>
        </ul>
      </nav>
      <div className="banner">
        <p>{t("banner_title")}</p>
      </div>
    </header>
  );
}