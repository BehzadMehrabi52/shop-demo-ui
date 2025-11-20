"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGlobal } from "../../../context/GlobalContext";
import { Product } from "../../../types/product";
import { Category } from "../../../types/category";

import { Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Slider, Box, TextField } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { getCurrencyLabel } from "../../../utils/currencyLabel";
import { getCategoryById, getCategoryProducts } from "../../_services/api";
import { sortLabels } from "../../../constants/sortLabdel";

export default function CategoryPage() {
  const { lang, currency } = useGlobal();
  const params = useParams();
  const id = Number(params.id);

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [searchQuery, setSearchQuery] = useState("");

  const isRTL = lang === "fa";

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // دریافت عنوان دسته
        const catData = await getCategoryById(id, lang);
        setCategory(catData);
        // دریافت محصولات دسته
        const prodData = await getCategoryProducts(id, lang, currency);
        setProducts(prodData);
      } catch (err) {
        console.error("Error loading category products:", err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, [id, lang, currency]);

  useEffect(() => {
    if (products.length > 0) {
        const prices = products.map((p) => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setPriceRange([min, max]);
    }
  }, [products]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
        case "price-low":
            return a.price - b.price;
        case "price-high":
            return b.price - a.price;
        case "name-asc":
            return a.title.localeCompare(b.title);
        case "name-desc":
            return b.title.localeCompare(a.title);
        default:
            return 0;
    }
  });

  const finalProducts = sortedProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  const searchFilteredProducts = finalProducts.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (!isHydrated) return null;
  if (loading) return <div style={{ padding: 32 }}>Loading category...</div>;

  return (
    <div
        style={{
        padding: 0,
        direction: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left",
        }}
    >
        {/* ردیف عنوان + سورت */}
        <Box
            sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // عنوان وسط می‌ماند
                mt: 2,
                mb: 2,
            }}
        >
            {/* عنوان دسته – همیشه وسط */}
            <Typography
                variant="h5"
                sx={{ fontWeight: 600, pointerEvents: "none" }}
            >
                {category?.title}
            </Typography>

            {/* سورت – همیشه سمت مخالف جهت */}
            <Box
                sx={{
                position: "absolute",
                top: 0,
                // اگر RTL → سورت سمت چپ
                // اگر LTR → سورت سمت راست
                ...(isRTL ? { left: 16 } : { right: 16 }),
                }}
            >
                <FormControl size="small">

                    <InputLabel>Sort</InputLabel>

                    <Select
                        value={sortBy}
                        label="Sort"
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <MenuItem value="default">
                            {sortLabels[lang]["default"]}
                        </MenuItem>

                        <MenuItem value="price-low">
                            {sortLabels[lang]["price-low"]}
                        </MenuItem>

                        <MenuItem value="price-high">
                            {sortLabels[lang]["price-high"]}
                        </MenuItem>

                        <MenuItem value="name-asc">
                            {sortLabels[lang]["name-asc"]}
                        </MenuItem>

                        <MenuItem value="name-desc">
                            {sortLabels[lang]["name-desc"]}
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>

            {/* فیلترهای افقی: مخالف جهت صفحه */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                    px: 3,
                    mb: 4,
                    width: "100%",
                    justifyContent: isRTL ? "flex-start" : "flex-end",   // برعکس!
                    direction: "ltr",
                }}
            >
                {/* جستجو */}
                <TextField
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                    lang === "fa"
                        ? "جستجو..."
                        : lang === "tr"
                        ? "Ara..."
                        : "Search..."
                    }
                    size="small"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                        width: { xs: "100%", md: "250px" },
                        height: '100%'
                    }}
                />

                {/* اسلایدر قیمت */}
                <Box sx={{ width: { xs: "100%", md: "300px" } }}>
                    <Slider
                        value={priceRange}
                        onChange={(e, newValue) => setPriceRange(newValue as [number, number])}
                        min={Math.min(...products.map((p) => p.price))}
                        max={Math.max(...products.map((p) => p.price))}
                        valueLabelDisplay="auto"
                        sx={{ color: "#1976d2" }}
                    />

                    <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                    {priceRange[0]} — {priceRange[1]}
                    </Typography>
                </Box>
            </Box>

      {/* لیست محصولات */}
      <Grid container spacing={0}>
        {searchFilteredProducts.map((product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            sm={6}
            md={3}
            sx={{ pl: 2, pr: 2, pb: 4 }}
          >
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
                  padding: "0 50px",
                  position: "relative",
                  direction: isRTL ? "rtl" : "ltr",
                }}
              >
                {product.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <Link
                      href={`/product/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={img}
                        style={{
                          width: "100%",
                          height: 250,
                          objectFit: "cover",
                          borderRadius: 6,
                          direction: isRTL ? "rtl" : "ltr",
                        }}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Link
                href={`/product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
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
