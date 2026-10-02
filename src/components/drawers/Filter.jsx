import {
  useEffect,
  useState,
} from "react";

import Drawer from "./Drawer";

import "./Filter.css";


const SIZES = [
  "S",
  "M",
  "L",
  "FREE",
];

const MAX_PRICE = 150000;


export default function Filter({
  open,
  onClose,
  onApply,
  colors = [],
  appliedFilters,
}) {

  const [
    selectedColors,
    setSelectedColors,
  ] = useState([]);

  const [
    selectedSizes,
    setSelectedSizes,
  ] = useState([]);

  const [
    minPrice,
    setMinPrice,
  ] = useState(0);

  const [
    maxPrice,
    setMaxPrice,
  ] = useState(MAX_PRICE);


  /* ========================================
     현재 적용된 필터와 Drawer 상태 동기화
  ======================================== */

  useEffect(() => {
    if (!open) return;

    setSelectedColors(
      appliedFilters?.colors || []
    );

    setSelectedSizes(
      appliedFilters?.sizes || []
    );

    setMinPrice(
      appliedFilters?.minPrice ?? 0
    );

    setMaxPrice(
      appliedFilters?.maxPrice ??
        MAX_PRICE
    );

  }, [
    open,
    appliedFilters,
  ]);


  /* ========================================
     Color
  ======================================== */

  const toggleColor = (name) => {
    setSelectedColors((prev) =>
      prev.includes(name)
        ? prev.filter(
            (colorName) =>
              colorName !== name
          )
        : [
            ...prev,
            name,
          ]
    );
  };


  /* ========================================
     Size
  ======================================== */

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter(
            (item) =>
              item !== size
          )
        : [
            ...prev,
            size,
          ]
    );
  };


  /* ========================================
     Price
  ======================================== */

  const handleMinPrice =
    (event) => {
      const value = Number(
        event.target.value
      );

      setMinPrice(
        Math.min(
          value,
          maxPrice - 10000
        )
      );
    };


  const handleMaxPrice =
    (event) => {
      const value = Number(
        event.target.value
      );

      setMaxPrice(
        Math.max(
          value,
          minPrice + 10000
        )
      );
    };


  /* ========================================
     Reset
  ======================================== */

  const handleReset = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setMinPrice(0);
    setMaxPrice(MAX_PRICE);
  };


  /* ========================================
     Apply
  ======================================== */

  const handleApply = () => {

    const filterValues = {
      colors: selectedColors,
      sizes: selectedSizes,
      minPrice,
      maxPrice,
    };


    onApply?.(
      filterValues
    );

    onClose();
  };

console.log("Filter colors:", colors);

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


          {/* =========================
              Color
          ========================= */}

          <section className="filter-section">

            <h3>Color</h3>


            <div className="filter-colors">

              {colors.map(
                (color) => {

                  const selected =
                    selectedColors.includes(
                      color.name
                    );


                  return (
                    <button
                      key={
                        color.name
                      }
                      type="button"
                      className={`filter-color ${
                        selected
                          ? "filter-color--selected"
                          : ""
                      }`}
                      onClick={() =>
                        toggleColor(
                          color.name
                        )
                      }
                      aria-label={
                        color.name
                      }
                      aria-pressed={
                        selected
                      }
                      title={
                        color.name
                      }
                    >

                      <span
                        style={{
                          backgroundColor:
                            color.hex,
                        }}
                      />

                    </button>
                  );
                }
              )}

            </div>

          </section>


          {/* =========================
              Size
          ========================= */}

          <section className="filter-section">

            <h3>Size</h3>


            <div className="filter-sizes">

              {SIZES.map(
                (size) => (

                  <label
                    key={size}
                    className="filter-size"
                  >

                    <input
                      type="checkbox"
                      checked={
                        selectedSizes.includes(
                          size
                        )
                      }
                      onChange={() =>
                        toggleSize(
                          size
                        )
                      }
                    />

                    <span className="filter-size__checkbox" />

                    <span>
                      {size}
                    </span>

                  </label>

                )
              )}

            </div>

          </section>


          {/* =========================
              Price
          ========================= */}

          <section
            className="
              filter-section
              filter-section--price
            "
          >

            <h3>Price</h3>


            <div className="filter-price">

              <div className="filter-price__slider">

                <div className="filter-price__track" />


                <div
                  className="filter-price__active"
                  style={{
                    left: `${
                      (
                        minPrice /
                        MAX_PRICE
                      ) * 100
                    }%`,

                    right: `${
                      100 -
                      (
                        maxPrice /
                        MAX_PRICE
                      ) * 100
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

                  {maxPrice ===
                  MAX_PRICE
                    ? "+"
                    : ""}
                </span>

              </div>

            </div>

          </section>

        </div>


        {/* =========================
            Actions
        ========================= */}

        <div className="filter-actions">

          <button
            type="button"
            className="filter-actions__reset"
            onClick={
              handleReset
            }
          >
            Reset
          </button>


          <button
            type="button"
            className="filter-actions__apply"
            onClick={
              handleApply
            }
          >
            Apply
          </button>

        </div>

      </div>

    </Drawer>
  );
}