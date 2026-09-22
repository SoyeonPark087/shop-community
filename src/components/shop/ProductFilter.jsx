export default function ProductFilter({ open, onToggle, maxPrice, onPriceChange }) {
  return (
    <div className="shop-filter-wrap">
      <button className="shop-filter-button" type="button" onClick={onToggle} aria-expanded={open}>
        Filter <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <section className="shop-filter-panel" aria-label="상품 필터">
          <div className="shop-filter-heading">
            <strong>가격</strong>
            <button type="button" onClick={onToggle} aria-label="필터 닫기">×</button>
          </div>
          <label htmlFor="shop-price-range">최대 {maxPrice.toLocaleString("ko-KR")}원</label>
          <input
            id="shop-price-range"
            type="range"
            min="40000"
            max="150000"
            step="5000"
            value={maxPrice}
            onChange={(event) => onPriceChange(Number(event.target.value))}
          />
        </section>
      )}
    </div>
  );
}

