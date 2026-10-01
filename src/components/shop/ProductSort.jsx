const options = [
  ["featured", "추천순"],
  ["popular", "인기순"],
  ["price-low", "낮은 가격순"],
  ["price-high", "높은 가격순"],
];

export default function ProductSort({ value, onChange }) {
  return (
    <label className="shop-sort">
      <span className="sr-only">상품 정렬</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(([optionValue, label]) => (
          <option key={optionValue} value={optionValue}>{label}</option>
        ))}
      </select>
    </label>
  );
}

