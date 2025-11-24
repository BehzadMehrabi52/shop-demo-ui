"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useGlobal } from "../../context/GlobalContext";
import { getCurrencyLabel } from "../../utils/currencyLabel";
import { useAuth } from "../../context/AuthContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function CheckoutPage() {
  const { cart, clearCart, refreshData, isRefreshing, totalPrice } = useCart();
  const { lang, currency } = useGlobal();
  const { user } = useAuth();
  const router = useRouter();

  const isRTL = lang === "fa";
  const currencyLabel = getCurrencyLabel(currency, lang);

  // ترجمه‌ها
  const t = {
    title: lang === "fa" ? "تکمیل خرید" : lang === "tr" ? "Satın Alma" : "Checkout",
    customerInfo: lang === "fa" ? "اطلاعات مشتری" : lang === "tr" ? "Müşteri Bilgileri" : "Customer Information",
    name: lang === "fa" ? "نام" : lang === "tr" ? "Ad" : "Name",
    email: lang === "fa" ? "ایمیل" : lang === "tr" ? "E-posta" : "Email",
    address: lang === "fa" ? "آدرس" : lang === "tr" ? "Adres" : "Address",
    pay: lang === "fa" ? "پرداخت" : lang === "tr" ? "Ödeme Yap" : "Pay Now",
    summary: lang === "fa" ? "خلاصه سفارش" : lang === "tr" ? "Sipariş Özeti" : "Order Summary",
    empty: lang === "fa" ? "سبد خرید خالی است" : lang === "tr" ? "Sepet boş" : "Your cart is empty",
    updating: lang === "fa" ? "در حال بروزرسانی قیمت‌ها..." : lang === "tr" ? "Fiyatlar güncelleniyor..." : "Updating prices...",
  };

  // فرم
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // اگر کاربر لاگین است → فرم را پر کن
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
    }
  }, [user]);

  // آپدیت قیمت‌ها و عنوان‌ها
  useEffect(() => {
    refreshData(currency, lang);
  }, [currency, lang]);

  if (isRefreshing) {
    return <div style={{ padding: 32 }}>{t.updating}</div>;
  }

    const handlePayment = async () => {
    const order = {
        items: cart,
        total: totalPrice,
        currency,
        customer: { name, email, address },
        date: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:5001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    });

    const data = await res.json();

    if (data.success) {
        clearCart();
        router.push(`/order-success?orderId=${data.orderId}`);
    }
    };

  if (cart.length === 0) {
    return (
      <Box sx={{ p: 3, mt: 5, textAlign: "center" }}>
        <Typography variant="h5">{t.empty}</Typography>
        <Link href="/">
          <Button variant="contained" sx={{ mt: 3 }}>
            {lang === "fa" ? "بازگشت به فروشگاه" : "Back to Shop"}
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
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 600, textAlign: "center" }}
      >
        {t.title}
      </Typography>

      <Grid container spacing={3}>
        {/* ستون چپ - فرم اطلاعات مشتری */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {t.customerInfo}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label={t.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />

              <TextField
                label={t.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />

              <TextField
                label={t.address}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                multiline
                rows={3}
              />
            </Box>

            {/* دکمه پرداخت در موبایل پایین می‌آید */}
            <Button
                variant="contained"
                fullWidth
                sx={{ py: 1.5 }}
                onClick={handlePayment}
                >
                {t.pay}
            </Button>
          </Card>
        </Grid>

        {/* ستون راست - خلاصه سفارش */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {t.summary}
            </Typography>

            {/* لیست محصولات */}
            {cart.map((item) => (
              <Box key={item.id}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {/* تصویر کوچک */}
                  <img
                    src={`http://localhost:5001/images/products/${item.id}-1.jpg`}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 6,
                      objectFit: "cover",
                    }}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {item.quantity} × {item.price} {currencyLabel}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />
              </Box>
            ))}

            {/* جمع کل */}
            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontWeight: 700 }}
            >
              {totalPrice} {currencyLabel}
            </Typography>

            {/* دکمه پرداخت در دسکتاپ */}
            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3, py: 1.5 }}
                onClick={handlePayment}
                >
                {t.pay}
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
