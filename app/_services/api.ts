const BASE_URL = "http://localhost:5001";

// --------------------------
// Products
// --------------------------
export async function getProducts(lang: string, currency: string) {
  const res = await fetch(`${BASE_URL}/products?lang=${lang}&currency=${currency}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: number, lang: string, currency: string) {
  const res = await fetch(`${BASE_URL}/products/${id}?lang=${lang}&currency=${currency}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// --------------------------
// Categories
// --------------------------
export async function getCategories(lang: string) {
  const res = await fetch(`${BASE_URL}/categories?lang=${lang}`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoryById(id: number, lang: string) {
  const res = await fetch(`${BASE_URL}/categories/${id}?lang=${lang}`);
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

export async function getCategoryProducts(id: number, lang: string, currency: string) {
  const res = await fetch(
    `${BASE_URL}/categories/${id}/products?lang=${lang}&currency=${currency}`
  );
  if (!res.ok) throw new Error("Failed to fetch category products");
  return res.json();
}
