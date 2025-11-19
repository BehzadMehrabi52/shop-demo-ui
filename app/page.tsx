"use client";

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { useGlobal } from "../context/GlobalContext";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { getCurrencyLabel } from "../utils/currencyLabel";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function HomePage() {
  const { lang, currency } = useGlobal();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  const isRTL = lang === "fa";

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/products?lang=${lang}&currency=${currency}`
        );
        const data = (await res.json()) as Product[];
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [lang, currency]);

  if (!isHydrated) return null;
  if (loading) return <div style={{ padding: 32 }}>Loading products...</div>;

  return (
    <div style={{ padding: 0 }}>
      <Grid container spacing={0}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3} sx={{pl:2, pr:2, pb:4}}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                style={{
                  marginTop: 0,
                  width: "100%",
                  height: "100%",
                  padding: "0 50px", // برای این‌که فلش‌ها بیرون باشند
                  position: "relative",
                  direction: isRTL ? "rtl" : "ltr",
                }}
              >
                {product.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                    <img
                      src={img}
                      style={{
                        width: "100%",
                        height: 250,
                        objectFit: "cover",
                        borderRadius: 6,
                        direction: isRTL ? "rtl" : "ltr"
                      }}
                    />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {product.price} {getCurrencyLabel(currency, lang)}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
