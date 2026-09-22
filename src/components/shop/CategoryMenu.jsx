export default function CategoryMenu({ categories, selected, onChange }) {
  return (
    <nav className="shop-categories" aria-label="상품 카테고리">
      {categories.map((category) => (
        <button
          className={`shop-category ${selected === category.value ? "is-active" : ""}`}
          key={category.value}
          type="button"
          onClick={() => onChange(category.value)}
          aria-pressed={selected === category.value}
        >
          {category.label}
        </button>
      ))}
    </nav>
  );
}

