import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import './App.css'

function App() {
  const pathname = window.location.pathname

  // /shop/1, /shop/2처럼 상품 번호가 있는 경우
  const isProductDetail = /^\/shop\/[^/]+\/?$/.test(pathname)

  if (isProductDetail) {
    return <ProductDetail />
  }

  // 기본 화면과 /shop은 상품 목록 표시
  return <Shop />
}

export default App