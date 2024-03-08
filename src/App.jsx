import { useState, useEffect } from "react";
import Products from "./components/Products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { IS_DEVELOPMENT } from "./config";
import useFilters from "./hooks/useFilters";
import Cart from "./components/Cart";
import { CartProvider } from "./context/cart";

function App() {
  const [products, setProducts] = useState([]);
  const { filters, filterProducts, setFilters } = useFilters();
  const filteredProducts = filterProducts(products);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products?limit=10`
        );
        if (!res.ok) throw new Error("No se pudo extraer los productos");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error: " + error.msesage);
      }
    };
    getProducts();
  }, []);
  return (
    <>
      <CartProvider>
        <Header />
        <Cart />
        <Products products={filteredProducts} />
        {IS_DEVELOPMENT && <Footer />}
      </CartProvider>
    </>
  );
}

export default App;
