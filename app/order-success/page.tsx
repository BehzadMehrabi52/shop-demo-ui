"use client";

import { useSearchParams } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useGlobal } from "../../context/GlobalContext";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const { lang } = useGlobal();

  const isRTL = lang === "fa";

  const t = {
    title:
      lang === "fa"
        ? "سفارش شما با موفقیت ثبت شد 🎉"
        : lang === "tr"
        ? "Siparişiniz Başarıyla Oluşturuldu 🎉"
        : "Your order has been successfully placed 🎉",

    orderIdLabel:
      lang === "fa"
        ? "شماره سفارش:"
        : lang === "tr"
        ? "Sipariş Numarası:"
        : "Order ID:",

    back:
      lang === "fa"
        ? "بازگشت به صفحه اصلی"
        : lang === "tr"
        ? "Ana Sayfaya Dön"
        : "Return to Home",
  };

  return (
    <Box
      sx={{
        p: 3,
        textAlign: "center",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        {t.title}
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        {t.orderIdLabel} {orderId}
      </Typography>

      <Link href="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" size="large">
          {t.back}
        </Button>
      </Link>
    </Box>
  );
}
