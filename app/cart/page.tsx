"use client";

import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useGlobal } from "../../context/GlobalContext";
import { getCurrencyLabel } from "../../utils/currencyLabel";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, refreshData, isRefreshing, totalPrice } = useCart();
  const { lang, currency } = useGlobal();

  const isRTL = lang === "fa";
  const currencyLabel = getCurrencyLabel(currency, lang);

  const t = {
    title: lang === "fa" ? "سبد خرید" : lang === "tr" ? "Sepet" : "Cart",
    empty: lang === "fa" ? "سبد خرید خالی است" : lang === "tr" ? "Sepet boş" : "Your cart is empty",
    checkout: lang === "fa" ? "پرداخت" : lang === "tr" ? "Ödeme Yap" : "Pay Now",
    total: lang === "fa" ? "جمع کل" : lang === "tr" ? "Toplam" : "Total",
    updating: lang === "fa" ? "در حال بروزرسانی قیمت‌ها..." : lang === "tr" ? "Fiyatlar güncelleniyor..." : "Updating prices...",
  };

  useEffect(() => {
    refreshData(currency, lang);
  }, [currency, lang]);

  if (isRefreshing) {
    return <div style={{ padding: 32 }}>{t.updating}</div>;
  }

  if (cart.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center", mt: 5 }}>
        <Typography variant="h5">{t.empty}</Typography>
        <Link href="/">
          <Button variant="contained" sx={{ mt: 3 }}>
            {lang === "fa" ? "بازگشت به فروشگاه" : lang === "tr" ? "Mağazaya Dön" : "Back to Shop"}
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", fontWeight: 600 }}>
        {t.title}
      </Typography>

      <Grid container spacing={3}>
        {/* ستون چپ - لیست محصولات */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            {cart.map((item, index) => (
              <Box key={item.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                  }}
                >
                  {/* تصویر محصول */}
                  <img
                    src={`http://localhost:5001/images/products/${item.id}-1.jpg`}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    {/* عنوان */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>

                    {/* قیمت */}
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      {item.price} {currencyLabel}
                    </Typography>

                    {/* کنترل تعداد */}
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <IconButton size="small" onClick={() => decreaseQty(item.id)}>
                        <RemoveIcon />
                      </IconButton>

                      <Typography sx={{ mx: 2, fontWeight: 600 }}>{item.quantity}</Typography>

                      <IconButton size="small" onClick={() => increaseQty(item.id)}>
                        <AddIcon />
                      </IconButton>

                      {/* حذف */}
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ ml: isRTL ? 0 : 2, mr: isRTL ? 2 : 0 }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>

                {index < cart.length - 1 && <Divider />}
              </Box>
            ))}
          </Card>
        </Grid>

        {/* ستون راست - خلاصه سفارش */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {t.total}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* جمع کل */}
            <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
              {totalPrice} {currencyLabel}
            </Typography>

            {/* دکمه Checkout */}
            <Link href="/checkout">
              <Button variant="contained" fullWidth sx={{ mt: 3, py: 1.4, fontSize: 16 }}>
                {t.checkout}
              </Button>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
