import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/common/Header'
import Footer from './components/common/Footer'
import ScrollToTopButton from './components/common/ScrollToTopButton'
import ScrollToTop from './components/common/ScrollToTop'

import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Shop from './pages/Shop/Shop'
import ProductDetail from './pages/Shop/ProductDetail'
import Editorial from './pages/Editorial/Editorial'
import EditorialDetail from './pages/Editorial/EditorialDetail'

import Community from './pages/Community/Community'
import CommunityDetail from './pages/Community/CommunityDetail'
import CommunityWrite from './pages/Community/CommunityWrite'
import MyPage from './pages/MyPage/MyPage'
import SearchResults from './pages/Search/SearchResults'

import About from './pages/About/About'
import CustomerService from './pages/CustomerService/CustomerService'


function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)


  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.option === product.option &&
          item.color === product.color
      )

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })

    setCartOpen(true)
  }


  return (
    <>
      <ScrollToTop />
      <Header
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />


      <div
        className={
          isHomePage
            ? 'app-page app-page--home'
            : 'app-page app-page--sub'
        }
      >
        <Routes>

          <Route
            path="/search"
            element={<SearchResults />}
          />


          <Route
            path="/"
            element={<Home />}
          />


          <Route
            path="/signup"
            element={<Signup />}
          />


          <Route
            path="/shop"
            element={<Shop />}
          />


          <Route
            path="/shop/:id"
            element={
              <ProductDetail
                onAddToCart={handleAddToCart}
              />
            }
          />


          <Route
            path="/editorial"
            element={<Editorial />}
          />


          <Route
            path="/editorial/:id"
            element={<EditorialDetail />}
          />


          <Route
            path="/community"
            element={<Community />}
          />


          <Route
            path="/community/write"
            element={<CommunityWrite />}
          />


          <Route
            path="/community/:postId"
            element={<CommunityDetail />}
          />


          <Route
            path="/mypage"
            element={<MyPage />}
          />


          <Route path="/mypage" element={<MyPage />} />
          
          <Route path="/about" element={<About />} />
          
          <Route path="/customer-service" element={<CustomerService />} />

          <Route
            path="*"
            element={
              <main>
                <h1>페이지를 찾을 수 없습니다.</h1>
                <a href="#/">
                  홈으로 돌아가기
                </a>
              </main>
            }
          />

        </Routes>
      </div>


      {/* 모든 페이지 공통 Scroll To Top 버튼 */}
      <ScrollToTopButton />


      <Footer />
    </>
  )
}


export default App