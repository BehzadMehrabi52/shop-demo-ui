"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobal } from "../../context/GlobalContext";
import { Category } from "../../types/category";
import { getCategories } from "../_services/api";

import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

export default function CategoriesPage() {
  const { lang } = useGlobal();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const isRTL = lang === "fa";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories(lang);
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lang]);

  if (loading) return <div style={{ padding: 32 }}>Loading categories...</div>;

  return (
    <div
      style={{
        padding: 0,
        direction: isRTL ? "rtl" : "ltr",
        textAlign: isRTL ? "right" : "left",
      }}
    >
      <Typography variant="h4" sx={{ p: 3, textAlign: "center" }}>
        {lang === "fa"
          ? "دسته‌بندی‌ها"
          : lang === "tr"
          ? "Kategoriler"
          : "Categories"}
      </Typography>

      <Grid container spacing={2} sx={{ px: 3 }}>
        {categories.map((cat) => (
          <Grid item key={cat.id} xs={12} sm={6} md={3}>
            <Link href={`/category/${cat.id}`} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  height: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", fontWeight: 600 }}
                  >
                    {cat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
