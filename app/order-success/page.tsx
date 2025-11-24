"use client";

import { useSearchParams } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        سفارش با موفقیت ثبت شد 🎉
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        شماره سفارش: {orderId}
      </Typography>

      <Link href="/">
        <Button variant="contained">بازگشت به صفحه اصلی</Button>
      </Link>
    </Box>
  );
}
