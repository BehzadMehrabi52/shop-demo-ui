# 🛒 Shop UI — E-Commerce Frontend (Next.js + TypeScript + CSS)

A responsive e-commerce frontend built with **Next.js**, **TypeScript**, and **custom CSS**, connected to a separate backend API.  
The project showcases a realistic online-shopping experience with backend-driven data including product catalog, filtering, sorting, cart functionality, checkout flow, and final order receipt.

---

## 🚀 Features

### 📦 Product Catalog (Backend-Driven)
- Fetches product and category data from a separate backend API  
- Category-based product listing  
- Sorting (price, newest, etc.)  
- Responsive layout using custom CSS  

### 🔎 Filtering & Sorting
- Filter products by category  
- Sort product list based on different criteria  
- Smooth and simple client-side state handling  

### 🛒 Shopping Cart
- Add/remove products  
- Update item quantities  
- Subtotal and price calculation  
- Cart state persists during the session  

### 💳 Checkout & Order Receipt
- Checkout form with validation  
- Sends order details to backend  
- Displays a final **Order Receipt** after completing the purchase  

---

## 🔗 Backend Integration

This frontend consumes data from a **standalone backend** built with **C# .NET Core API**.

Backend responsibilities include:
- Product data  
- Category data  
- Checkout / order creation  

Communication happens via REST API calls.

> The UI is fully decoupled and can integrate with any REST API.

---

## 🧰 Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **CSS (custom styles)**
- **REST API Integration (.NET Core backend)**

---

## ▶️ Running the Project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
App will run on:
http://localhost:3000

🎯 Purpose of This Project

This project was built to demonstrate:
	•	Clean and modern frontend architecture with Next.js
	•	Responsive UI without external UI libraries
	•	Decoupled frontend–backend communication
	•	A realistic e-commerce flow (catalog → cart → checkout → receipt)

Perfect for portfolio presentation and showcasing real-world frontend capabilities.

⸻

✨ Author

Behzad Mehrabi
Full-Stack Developer (Next.js • TypeScript • .NET Core)
