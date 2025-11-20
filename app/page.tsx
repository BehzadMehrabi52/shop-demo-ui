"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobal } from "../context/GlobalContext";
import { Category } from "../types/category";
import { getCategories } from "./_services/api";

import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

export default function HomePage() {
  const { lang } = useGlobal();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const isRTL = lang === "fa";

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCategories(lang);
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [lang]);

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        direction: isRTL ? "rtl" : "ltr",
        textAlign: "center",
      }}
    >
      {/* عنوان صفحه */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        {lang === "fa"
          ? "دسته‌بندی‌ها"
          : lang === "tr"
          ? "Kategoriler"
          : "Categories"}
      </Typography>

      {/* لیست دسته‌ها */}
      <Grid container spacing={2}>
        {categories.map((cat) => (
          <Grid item key={cat.id} xs={12} sm={6} md={3}>
            <Link href={`/category/${cat.id}`} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  height: 230,
                  cursor: "pointer",
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "0.3s",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* تصویر */}
                <Box
                  sx={{
                    height: 140,
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#fafafa",
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* عنوان */}
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontWeight: 600,
                      color: "#333",
                    }}
                  >
                    {cat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
