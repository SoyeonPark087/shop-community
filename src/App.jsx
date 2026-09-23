import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  const [cartItems, setCartItems] = useState([{
    id: 1,
    name: "Soft Cotton Shirt_Pink",
    nameKo: "소프트 코튼 셔츠_핑크",
    option: "S",
    price: 93000,
    quantity: 1,
    image: "/images/shop/cart-shirt-pink.png",
  },]);
  const [cartOpen, setCartOpen] = useState(false);
  

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.option === product.option
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.option === product.option
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    // 상품 추가와 동시에 Cart Drawer 열기
    setCartOpen(true);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            cartItems={cartItems}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
          />
        }
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/*
        나중에 상품 상세 페이지가 들어오면:

        <Route
          path="/product/:id"
          element={
            <ProductDetail
              onAddToCart={handleAddToCart}
            />
          }
        />
      */}
    </Routes>
  );
}

export default App;