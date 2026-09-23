import { useState } from "react";
import Drawer from "./Drawer";
import "./Filter.css";

const COLORS = [
  { id: "white", color: "#F7F7F4", label: "White" },
  { id: "beige", color: "#D8CFC1", label: "Beige" },
  { id: "pink", color: "#D7A7A7", label: "Pink" },
  { id: "purple", color: "#BBA8C9", label: "Purple" },
  { id: "green", color: "#8E9A84", label: "Green" },
  { id: "brown", color: "#7E5944", label: "Brown" },
  { id: "gray", color: "#8C8C8A", label: "Gray" },
  { id: "charcoal", color: "#565656", label: "Charcoal" },
  { id: "navy", color: "#414968", label: "Navy" },
  { id: "black", color: "#242424", label: "Black" },
];

const SIZES = ["S", "M", "L", "FREE"];

const MAX_PRICE = 300000;

export default function Filter({
  open,
  onClose,
  onApply,
}) {
  const [selectedColors, setSelectedColors] =
    useState([]);

  const [selectedSizes, setSelectedSizes] =
    useState([]);

  const [minPrice, setMinPrice] =
    useState(0);

  const [maxPrice, setMaxPrice] =
    useState(MAX_PRICE);

  const toggleColor = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id)
        ? prev.filter(
            (colorId) => colorId !== id
          )
        : [...prev, id]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter(
            (item) => item !== size
          )
        : [...prev, size]
    );
  };

  const handleMinPrice = (event) => {
    const value = Number(
      event.target.value
    );

    setMinPrice(
      Math.min(value, maxPrice - 10000)
    );
  };

  const handleMaxPrice = (event) => {
    const value = Number(
      event.target.value
    );

    setMaxPrice(
      Math.max(value, minPrice + 10000)
    );
  };

  const handleReset = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
  };

  const handleApply = () => {
    const filterValues = {
      colors: selectedColors,
      sizes: selectedSizes,
      minPrice,
      maxPrice,
    };

    if (onApply) {
      onApply(filterValues);
    }

    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Filter"
      width={320}
      className="filter-drawer"
    >
      <div className="filter-content">
        <div className="filter-content__main">

          {/* Color */}
          <section className="filter-section">
            <h3>Color</h3>

            <div className="filter-colors">
              {COLORS.map((item) => {
                const selected =
                  selectedColors.includes(
                    item.id
                  );

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`filter-color ${
                      selected
                        ? "filter-color--selected"
                        : ""
                    }`}
                    onClick={() =>
                      toggleColor(item.id)
                    }
                    aria-label={item.label}
                    aria-pressed={selected}
                  >
                    <span
                      style={{
                        backgroundColor:
                          item.color,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Size */}
          <section className="filter-section">
            <h3>Size</h3>

            <div className="filter-sizes">
              {SIZES.map((size) => (
                <label
                  key={size}
                  className="filter-size"
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(
                      size
                    )}
                    onChange={() =>
                      toggleSize(size)
                    }
                  />

                  <span className="filter-size__checkbox" />

                  <span>
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Price */}
          <section className="filter-section filter-section--price">
            <h3>Price</h3>

            <div className="filter-price">
              <div className="filter-price__slider">
                <div className="filter-price__track" />

                <div
                  className="filter-price__active"
                  style={{
                    left: `${
                      (minPrice /
                        MAX_PRICE) *
                      100
                    }%`,

                    right: `${
                      100 -
                      (maxPrice /
                        MAX_PRICE) *
                        100
                    }%`,
                  }}
                />

                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  step="10000"
                  value={minPrice}
                  onChange={
                    handleMinPrice
                  }
                  aria-label="최소 가격"
                />

                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  step="10000"
                  value={maxPrice}
                  onChange={
                    handleMaxPrice
                  }
                  aria-label="최대 가격"
                />
              </div>

              <div className="filter-price__labels">
                <span>
                  ₩{" "}
                  {minPrice.toLocaleString()}
                </span>

                <span>
                  ₩{" "}
                  {maxPrice.toLocaleString()}
                  {maxPrice === MAX_PRICE
                    ? "+"
                    : ""}
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className="filter-actions">
          <button
            type="button"
            className="filter-actions__reset"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            type="button"
            className="filter-actions__apply"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </Drawer>
  );
}