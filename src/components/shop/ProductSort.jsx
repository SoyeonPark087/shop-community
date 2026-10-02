import { useEffect, useRef, useState } from "react";

const options = [
  ["featured", "추천순"],
  ["popular", "인기순"],
  ["price-low", "낮은 가격순"],
  ["price-high", "높은 가격순"],
];

export default function ProductSort({
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <div
      ref={sortRef}
      className={`shop-sort ${
        open ? "shop-sort--open" : ""
      }`}
    >
      <button
        type="button"
        className="shop-sort__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        Sort
      </button>

      {open && (
        <div
          className="shop-sort__menu"
          role="listbox"
          aria-label="상품 정렬"
        >
          {options.map(
            ([optionValue, label]) => {
              const selected =
                value === optionValue;

              return (
                <button
                  key={optionValue}
                  type="button"
                  className={`shop-sort__option ${
                    selected
                      ? "shop-sort__option--selected"
                      : ""
                  }`}
                  onClick={() =>
                    handleSelect(optionValue)
                  }
                  role="option"
                  aria-selected={selected}
                >
                  <span>{label}</span>

                  {selected && (
                    <span
                      className="shop-sort__check"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}