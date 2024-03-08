import React from "react";
import "../styles/Footer.css";
import useFilters from "../hooks/useFilters";
import { useCart } from "../hooks/useCart";

export default function Footer() {
  const { filters } = useFilters();
  const {cart} = useCart()
  return (
    <footer className="footer">
      {/* {JSON.stringify(filters, null, 2)} */}
      {/* {JSON.stringify(cart, null, 2)} */}
      <h4>Prueba técnica de React *</h4>
        <span>@jairvsosa</span>
        <h5>Shopping Cart con UseContext & useReducer</h5>
    </footer>
  );
}
