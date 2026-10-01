export default function SearchBox({ value, onChange }) {
  return (
    <label className="shop-search">
      <span className="sr-only">상품 검색</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="상품 검색"
      />
    </label>
  );
}

