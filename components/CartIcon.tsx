"use client";

import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useCart } from "../context/CartContext";
import { useGlobal } from "../context/GlobalContext";

export default function CartIcon() {
  const { cart } = useCart();
  const { lang } = useGlobal();

  const label =
    lang === "fa"
      ? "سبد خرید"
      : lang === "tr"
      ? "Sepet"
      : "Cart";

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart">
      <Tooltip title={label}>
        <IconButton color="primary">
          <Badge badgeContent={totalQty} color="error">
            <ShoppingCartIcon sx={{ fontSize: 28 }} />
          </Badge>
        </IconButton>
      </Tooltip>
    </Link>
  );
}
