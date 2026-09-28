import Home from './pages/Home'
import Shop from './pages/Shop/Shop.jsx'
import ProductDetail from './pages/Shop/ProductDetail.jsx'
import Editorial from './pages/Editorial/Editorial.jsx'
import EditorialDetail from './pages/Editorial/EditorialDetail.jsx'
import Community from './pages/Community'
import './App.css'

function App() {
  const pathname = window.location.pathname

  const isProductDetail = /^\/shop\/[^/]+\/?$/.test(pathname)
  const isEditorialDetail = /^\/editorial\/[^/]+\/?$/.test(pathname)

  if (isProductDetail) {
    return <ProductDetail />
  }

  if (pathname === '/shop' || pathname === '/shop/') {
    return <Shop />
  }

  if (isEditorialDetail) {
    return <EditorialDetail />
  }

  if (pathname === '/editorial' || pathname === '/editorial/') {
    return <Editorial />
  }

  if (pathname === '/community' || pathname === '/community/') {
    return <Community />
  }

  return <Home />
}

export default App
