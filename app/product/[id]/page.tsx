"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Typography, Card, CardContent, Grid } from "@mui/material";
import ZoomImage from "../../../components/ZoomImage";
import { Product } from "../../../types/product";
import { useGlobal } from "../../../context/GlobalContext";
import { getCurrencyLabel } from "../../../utils/currencyLabel";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { getProductById } from "../../_services/api";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { lang, currency } = useGlobal();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  const isRTL = lang === "fa";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id), lang, currency);
        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, lang, currency]);

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;
  if (!product) return <div style={{ padding: 32 }}>Product not found</div>;

  return (
    <Grid container spacing={1}>
      {/* تصویر اصلی */}
      <Grid item xs={12} sm={4}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // همه‌چیز وسط ستون
          }}
        >
        <ZoomImage
          src={selectedImage}
          mainWidth={400}
          mainHeight={400}
          zoomWidth={700}
          zoomHeight={700}
          zoomScale={4}
        />

        {/* Swiper Thumbnails */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          style={{
            marginTop: 16,
            width: "100%",
            maxWidth: 200, // پهن‌تر برای فاصله گرفتن از تصویر اصلی
            padding: "0 50px", // برای این‌که فلش‌ها بیرون باشند
            position: "relative",
          }}
          dir={isRTL ? "rtl" : "ltr"}
          onSlideChange={(swiper) => {
            const index = swiper.activeIndex;
            setSelectedImage(product.images[index]);
          }}
        >
          {product.images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                style={{
                  width: "100%",
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </Grid>

      {/* اطلاعات محصول */}
      <Grid item xs={12} sm={8}>
        <Card>
          <CardContent style={{ direction: isRTL ? "rtl" : "ltr" }}>
            <Typography variant="h5" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {product.price} {getCurrencyLabel(currency, lang)}
            </Typography>
            <Typography variant="body1">{product.description}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
