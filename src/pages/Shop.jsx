import { useMemo, useState } from "react";
import CategoryMenu from "../components/shop/CategoryMenu";
import ProductFilter from "../components/shop/ProductFilter";
import ProductGrid from "../components/shop/ProductGrid";
import ProductSort from "../components/shop/ProductSort";
import SearchBox from "../components/shop/SearchBox";
import { products, SHOP_CATEGORIES } from "../data/products";
import "../styles/shop.css";

const sortProducts = (items, sortBy) => [...items].sort((a, b) => {
  if (sortBy === "popular") return b.popularity - a.popularity;
  if (sortBy === "price-low") return a.price - b.price;
  if (sortBy === "price-high") return b.price - a.price;
  return b.featured - a.featured;
});

export default function Shop() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(150000);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");
    const filtered = products.filter((product) => {
      const categoryMatches = category === "all" || product.category === category;
      const queryMatches = !normalizedQuery || product.name.toLocaleLowerCase("ko-KR").includes(normalizedQuery);
      return categoryMatches && queryMatches && product.price <= maxPrice;
    });
    return sortProducts(filtered, sortBy);
  }, [category, query, sortBy, maxPrice]);

  return (
    <main className="shop-page">
      <div className="shop-inner">
        <section className="shop-controls" aria-label="상품 탐색 도구">
          <CategoryMenu categories={SHOP_CATEGORIES} selected={category} onChange={setCategory} />
          <div className="shop-actions">
            <SearchBox value={query} onChange={setQuery} />
            <ProductSort value={sortBy} onChange={setSortBy} />
            <ProductFilter
              open={filterOpen}
              onToggle={() => setFilterOpen((current) => !current)}
              maxPrice={maxPrice}
              onPriceChange={setMaxPrice}
            />
          </div>
        </section>

        <p className="shop-result-count">{visibleProducts.length} items</p>
        <ProductGrid products={visibleProducts} />

        <nav className="shop-pagination" aria-label="상품 페이지">
          <button type="button">FIRST</button>
          <button type="button" aria-label="이전 페이지">‹</button>
          <button className="is-current" type="button" aria-current="page">1</button>
          <button type="button">2</button>
          <button type="button" aria-label="다음 페이지">›</button>
          <button type="button">LAST</button>
        </nav>
      </div>
    </main>
  );
}

