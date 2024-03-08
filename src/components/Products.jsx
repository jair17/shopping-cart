import { useCart } from "../hooks/useCart";
import "../styles/Products.css";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import React from "react";

export default function Products({ products }) {
  const { addToCart, cart, removeFromCart } = useCart();

  const checkProductsInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };
  return (
    <main className="products">
      <ul>
        {products.map((product) => {
          const isProductInCart = checkProductsInCart(product);
          return (
            <li key={product.id}>
              <img src={product.thumbnail} atl={product.title} />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? "red" : "#09f" }}
                  onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product);
                  }}
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
