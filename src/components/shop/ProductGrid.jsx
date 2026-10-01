import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return <p className="shop-empty">조건에 맞는 상품이 없습니다.</p>;
  }

  return (
    <section className="product-grid" aria-live="polite">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </section>
  );
}

