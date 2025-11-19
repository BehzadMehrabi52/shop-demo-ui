"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Lang = "fa" | "tr" | "en";
type Currency = "USD" | "TRY" | "IRR";

interface GlobalContextType {
  lang: Lang;
  currency: Currency;
  setLang: (lang: Lang) => void;
  setCurrency: (currency: Currency) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");
  const [currency, setCurrencyState] = useState<Currency>("USD");

  // فقط بعد از ماؤنٹ شدن کلاینت، localStorage چک می‌کنیم
  useEffect(() => {
    try {
      const storedLang = localStorage.getItem("lang") as Lang | null;
      const storedCurrency = localStorage.getItem("currency") as Currency | null;

      if (storedLang) {
        setLangState(storedLang);
      }
      if (storedCurrency) {
        setCurrencyState(storedCurrency);
      }
    } catch (e) {
      console.warn("localStorage not available or invalid:", e);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("lang", newLang);
    } catch {}
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem("currency", newCurrency);
    } catch {}
  };

  return (
    <GlobalContext.Provider value={{ lang, setLang, currency, setCurrency }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobal must be used within Provider");
  return context;
};
