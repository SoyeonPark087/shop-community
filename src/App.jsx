import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Shop from './pages/Shop/Shop'
import ProductDetail from './pages/Shop/ProductDetail'
import Editorial from './pages/Editorial/Editorial'
import EditorialDetail from './pages/Editorial/EditorialDetail'
import Community from './pages/Community'

import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Soft Cotton Shirt_Pink',
      nameKo: '소프트 코튼 셔츠_핑크',
      option: 'S',
      price: 93000,
      quantity: 1,
      image: '/images/shop/cart-shirt-pink.png',
    },
  ])

  const [cartOpen, setCartOpen] = useState(false)

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.option === product.option
      )

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.option === product.option
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ]
    })

    setCartOpen(true)
  }

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

      <Route path="/signup" element={<Signup />} />

      <Route
        path="/shop"
        element={
          <Shop
            cartItems={cartItems}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
          />
        }
      />

      <Route
        path="/shop/:id"
        element={
          <ProductDetail
            cartItems={cartItems}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            onAddToCart={handleAddToCart}
          />
        }
      />

      <Route path="/editorial" element={<Editorial />} />

      <Route
        path="/editorial/:id"
        element={<EditorialDetail />}
      />

      <Route path="/community" element={<Community />} />
    </Routes>
  )
}

export default App