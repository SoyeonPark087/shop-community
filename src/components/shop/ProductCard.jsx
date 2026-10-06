import { Link } from "react-router-dom";

const won = new Intl.NumberFormat("ko-KR");

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link
        className="product-card-link"
        to={`/shop/${product.id}`}
        aria-label={`${product.name} 상세 보기`}
      >
        <div className="product-card-image-wrap">
          <img className="product-card-image" src={product.image} alt={product.name} loading="lazy" />
        </div>
        <div className="product-card-info">
          <h2>{product.name}</h2>
          <p>₩ {won.format(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
