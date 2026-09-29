import { useMemo, useState } from 'react'
import CategoryMenu from '../../components/shop/CategoryMenu'
import ProductGrid from '../../components/shop/ProductGrid'
import ProductSort from '../../components/shop/ProductSort'
import { products, SHOP_CATEGORIES } from '../../data/products'
import './shop.css'

const sortProducts = (items, sortBy) =>
  [...items].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.popularity - a.popularity
    }

    if (sortBy === 'price-low') {
      return a.price - b.price
    }

    if (sortBy === 'price-high') {
      return b.price - a.price
    }

    return a.id - b.id
  })

export default function Shop() {
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  const visibleProducts = useMemo(() => {
    const filteredProducts = products.filter(
      (product) =>
        category === 'all' ||
        product.category === category
    )

    return sortProducts(filteredProducts, sortBy)
  }, [category, sortBy])

  return (
    <main className="shop-page">
      <div className="shop-inner">
        <section
          className="shop-controls"
          aria-label="상품 탐색 도구"
        >
          <CategoryMenu
            categories={SHOP_CATEGORIES}
            selected={category}
            onChange={setCategory}
          />

          <div className="shop-actions">
            <ProductSort
              value={sortBy}
              onChange={setSortBy}
            />

            {/* 디자인용 Filter 버튼: 클릭해도 아무것도 열리지 않음 */}
            <button
              className="shop-filter-button"
              type="button"
            >
              <span>Filter</span>
              <span aria-hidden="true">＋</span>
            </button>
          </div>
        </section>

        <p className="shop-result-count">
          {visibleProducts.length} items
        </p>

        <ProductGrid products={visibleProducts} />

        <nav
          className="shop-pagination"
          aria-label="상품 페이지"
        >
          <button type="button">FIRST</button>

          <button
            type="button"
            aria-label="이전 페이지"
          >
            ‹
          </button>

          <button
            className="is-current"
            type="button"
            aria-current="page"
          >
            1
          </button>

          <button type="button">2</button>

          <button
            type="button"
            aria-label="다음 페이지"
          >
            ›
          </button>

          <button type="button">LAST</button>
        </nav>
      </div>
    </main>
  )
}