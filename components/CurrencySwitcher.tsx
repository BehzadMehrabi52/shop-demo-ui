"use client";
import { getCurrencyLabel } from "@/utils/currencyLabel";
import { useGlobal } from "../context/GlobalContext";

export default function LangSwitcher() {
  const { lang, currency, setCurrency } = useGlobal();

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
      {["USD", "TRY", "IRR"].map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c as "USD" | "TRY" | "IRR")}
          style={{
            padding: "4px 8px",
            backgroundColor: currency === c ? "#1976d2" : "#eee",
            color: currency === c ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {getCurrencyLabel(c, lang)}
        </button>
      ))}
    </div>
  );
}
