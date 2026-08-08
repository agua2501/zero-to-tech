import { createContext, useContext, useState } from "react";
import { zh, en } from "../../js/i18n.js";

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("preferred_lang") === "en" ? "en" : "zh"
  );

  const t = (key) => {
    const table = lang === "en" ? en : zh;
    return table[key] || key;
  };

  const switchLang = (next) => {
    setLang(next);
    localStorage.setItem("preferred_lang", next);
  };

  return (
    <LangContext.Provider value={{ lang, t, switchLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}