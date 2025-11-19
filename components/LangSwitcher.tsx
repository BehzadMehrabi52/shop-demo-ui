"use client";
import { useGlobal } from "../context/GlobalContext";

export default function LangSwitcher() {
  const { lang, setLang } = useGlobal();

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
      {["fa", "tr", "en"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l as "fa" | "tr" | "en")}
          style={{
            padding: "4px 8px",
            backgroundColor: lang === l ? "#1976d2" : "#eee",
            color: lang === l ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
