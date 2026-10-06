import { useMemo, useState } from "react";

import CategoryMenu from "../../components/shop/CategoryMenu";
import ProductGrid from "../../components/shop/ProductGrid";
import ProductSort from "../../components/shop/ProductSort";

import { products, SHOP_CATEGORIES } from "../../data/Products";

import Filter from "../../components/drawers/Filter";

import "./Shop.css";

const sortProducts = (items, sortBy) =>
  [...items].sort((a, b) => {
    if (sortBy === "popular") {
      return b.popularity - a.popularity;
    }

    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    return a.id - b.id;
  });

const AVAILABLE_COLORS = Array.from(
  new Map(
    products
      .flatMap((product) => product.colors || [])
      .map((color) => [
        color.name,
        color,
      ])
  ).values()
);

export default function Shop() {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] =
    useState({
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 150000,
    });

  const visibleProducts = useMemo(() => {
    const filteredProducts = products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;

      const colorMatch =
        filters.colors.length === 0 ||
        product.colors?.some((color) =>
          filters.colors.includes(color.name)
        );

      const sizeMatch =
        filters.sizes.length === 0 ||
        product.sizes?.some((size) =>
          filters.sizes.includes(size)
        );

      const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;

      return categoryMatch && colorMatch && sizeMatch && priceMatch;
    });

    return sortProducts(filteredProducts, sortBy);
  }, [
    category,
    sortBy,
    filters,
  ]);

  return (
    <>
      <main className="shop-page">

        <div className="shop-inner">

          <section className="shop-controls" aria-label="상품 탐색 도구">

            <CategoryMenu categories={SHOP_CATEGORIES} selected={category} onChange={setCategory} />

            <div className="shop-actions">

              <ProductSort value={sortBy} onChange={setSortBy} />

              <button type="button" className="shop-filter-button" onClick={() => setFilterOpen(true)}>
                Filter
              </button>

            </div>

          </section>

          <p className="shop-result-count">
            {visibleProducts.length} items
          </p>

          <ProductGrid products={visibleProducts} />

          <nav className="shop-pagination" aria-label="상품 페이지">
            <button type="button">
              FIRST
            </button>

            <button type="button" aria-label="이전 페이지">
              ‹
            </button>

            <button className="is-current" type="button" aria-current="page">
              1
            </button>

            <button type="button">
              2
            </button>

            <button type="button" aria-label="다음 페이지">
              ›
            </button>

            <button type="button">
              LAST
            </button>
          </nav>

        </div>

      </main>

      {filterOpen && (
        <Filter
          open
          onClose={() => setFilterOpen(false)}
          onApply={setFilters}
          colors={AVAILABLE_COLORS}
          appliedFilters={filters}
        />
      )}
    </>
  );
}
