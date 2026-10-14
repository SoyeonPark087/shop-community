import { useMemo, useState } from "react";

import CategoryMenu from "../../components/shop/CategoryMenu";
import ProductGrid from "../../components/shop/ProductGrid";
import ProductSort from "../../components/shop/ProductSort";
import Filter from "../../components/drawers/Filter";

import {
  products,
  SHOP_CATEGORIES,
} from "../../data/products";

import "./Shop.css";


/* ========================================
   상품 정렬
======================================== */

const sortProducts = (items, sortBy) => {
  return [...items].sort((a, b) => {
    if (sortBy === "popular") {
      return (
        (b.popularity || 0) -
        (a.popularity || 0)
      );
    }

    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    return a.id - b.id;
  });
};


/* ========================================
   상품 데이터에서 실제 컬러 목록 생성
======================================== */

const AVAILABLE_COLORS = Array.from(
  new Map(
    products
      .flatMap((product) => product.colors || [])
      .filter((color) => color?.name)
      .map((color) => [
        color.name,
        color,
      ])
  ).values()
);


export default function Shop() {
  const [category, setCategory] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("featured");

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [filters, setFilters] =
    useState({
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 150000,
    });


  /* ========================================
     카테고리·컬러·사이즈·가격 필터 및 정렬
  ======================================== */

  const visibleProducts = useMemo(() => {
    const filteredProducts = products.filter(
      (product) => {
        const categoryMatch =
          category === "all" ||
          product.category === category;

        const colorMatch =
          filters.colors.length === 0 ||
          (product.colors || []).some(
            (color) =>
              filters.colors.includes(
                color.name
              )
          );

        const sizeMatch =
          filters.sizes.length === 0 ||
          (product.sizes || []).some(
            (size) =>
              filters.sizes.includes(size)
          );

        const priceMatch =
          Number(product.price) >=
            Number(filters.minPrice) &&
          Number(product.price) <=
            Number(filters.maxPrice);

        return (
          categoryMatch &&
          colorMatch &&
          sizeMatch &&
          priceMatch
        );
      }
    );

    return sortProducts(
      filteredProducts,
      sortBy
    );
  }, [
    category,
    sortBy,
    filters,
  ]);


  /* ========================================
     필터 적용
  ======================================== */

  const handleApplyFilter = (
    filterValues
  ) => {
    setFilters(filterValues);
    setFilterOpen(false);
  };


  return (
    <>
      <main className="shop-page">
        <div className="shop-inner">
          {/* 카테고리 */}
          <section
            className="shop-controls"
            aria-label="상품 카테고리"
          >
            <CategoryMenu
              categories={
                SHOP_CATEGORIES
              }
              selected={category}
              onChange={setCategory}
            />
          </section>


          {/* 상품 개수, 정렬, 필터 */}
          <div className="shop-toolbar">
            <p className="shop-result-count">
              {visibleProducts.length} items
            </p>

            <div className="shop-actions">
              <ProductSort
                value={sortBy}
                onChange={setSortBy}
              />

              <button
                className="shop-filter-button"
                type="button"
                onClick={() =>
                  setFilterOpen(true)
                }
                aria-label="상품 필터 열기"
                aria-expanded={
                  filterOpen
                }
              >
                <svg
                  className="shop-action-icon"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 3h11L9.3 7.8v3.9L6.7 13V7.8L2.5 3Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>Filter</span>
              </button>
            </div>
          </div>


          {/* 상품 목록 */}
          <ProductGrid
            products={visibleProducts}
          />


          {/* 페이지네이션 */}
          {visibleProducts.length > 0 && (
            <nav
              className="shop-pagination"
              aria-label="상품 페이지"
            >
              <button type="button">
                FIRST
              </button>

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

              <button type="button">
                2
              </button>

              <button
                type="button"
                aria-label="다음 페이지"
              >
                ›
              </button>

              <button type="button">
                LAST
              </button>
            </nav>
          )}
        </div>
      </main>


      {/* 기존 필터 드로어 */}
      <Filter
        open={filterOpen}
        onClose={() =>
          setFilterOpen(false)
        }
        onApply={
          handleApplyFilter
        }
        colors={
          AVAILABLE_COLORS
        }
        appliedFilters={
          filters
        }
      />
    </>
  );
}
