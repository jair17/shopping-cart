import "../styles/Cart.css";
import React from "react";
import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from "./Icons";
import { useId } from "react";
import { useCart } from "../hooks/useCart";
export default function Cart() {
  const cartCheckBoxId = useId();
  const { cart, addToCart, clearCart } = useCart();

  function CartItem({ thumbnail, price, title, quantity, addToCart }) {
    return (
      <li>
        <img src={thumbnail} alt={title} />
        <div>
          <strong>{title}</strong> - ${price}
        </div>
        <footer>
          <small>Qty: {quantity}</small>
          <button onClick={addToCart}>+</button>
        </footer>
      </li>
    );
  }

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckBoxId}>
        <CartIcon />
      </label>
      <input id={cartCheckBoxId} type="checkbox" hidden />

      <aside className="cart">
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
