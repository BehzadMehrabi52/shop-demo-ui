"use client";

import { useEffect } from "react";
import LangSwitcher from "../components/LangSwitcher";
import CurrencySwitcher from "../components/CurrencySwitcher";
import { Box } from "@mui/material";
import { useGlobal } from "../context/GlobalContext";
import { usePathname, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useGlobal();

  const isDetailPage =
    /^\/product\/\d+$/.test(pathname) ||
    /^\/category\/\d+$/.test(pathname);

  const backLabel =
    lang === "fa"
      ? "بازگشت"
      : lang === "tr"
      ? "Geri Dön"
      : "Back";

  useEffect(() => {
    // تغییر جهت صفحه بر اساس زبان
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1 }}>
        <LangSwitcher />
        {isDetailPage && (
          <Button
            onClick={() => router.back()}
            variant="contained"
            startIcon={<ArrowBackIcon />}
            style={{ display: "flex", gap: 8, marginBottom: 2 }}
          >
            {backLabel}
          </Button>
        )}
        <CurrencySwitcher />
      </Box>
      {children}
    </>
  );
}
