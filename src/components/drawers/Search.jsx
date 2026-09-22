import { useEffect } from "react";
import "./Search.css";

const mostSearched = [
  "#homewear",
  "#layered",
  "#neutral",
  "#outside",
  "#simple",
];

const recentSearches = [
  "soft knit set",
  "weekend calm",
  "white shirt",
];

const suggested = [
  "Editorials",
  "Community Looks",
  "New Arrivals",
];

function SearchIcon() {
  return (
    <span
      className="search-drawer__search-icon"
      aria-hidden="true"
    />
  );
}

function CloseIcon() {
  return (
    <span
      className="search-drawer__close-icon"
      aria-hidden="true"
    />
  );
}

export default function SearchDrawer({
  open,
  onClose,
}) {
useEffect(() => {
  if (!open) return;

  const previousOverflow = document.body.style.overflow;
  const previousPaddingRight = document.body.style.paddingRight;

  const scrollbarWidth =
    window.innerWidth -
    document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight =
      `${scrollbarWidth}px`;
  }

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    document.body.style.overflow =
      previousOverflow;

    document.body.style.paddingRight =
      previousPaddingRight;

    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, [open, onClose]);

  return (
    <div
      className={`search-drawer-layer ${
        open
          ? "search-drawer-layer--open"
          : ""
      }`}
      aria-hidden={!open}
    >
      <button
        className="search-drawer-backdrop"
        type="button"
        aria-label="검색 메뉴 닫기"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />

      <aside
        className="search-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className="search-drawer__header">
          <h2>Search</h2>

          <button
            type="button"
            className="search-drawer__close"
            onClick={onClose}
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="search-drawer__body">
          <div className="search-drawer__input-wrap">
            <input
              type="search"
              className="search-drawer__input"
              placeholder="검색어를 입력하세요."
              aria-label="검색어"
            />

            <button
              type="button"
              className="search-drawer__submit"
              aria-label="검색"
            >
              <SearchIcon />
            </button>
          </div>

          <section className="search-drawer__section">
            <h3>Most Searched</h3>

            <div className="search-drawer__tags">
              {mostSearched.map((tag) => (
                <button
                  type="button"
                  className="search-drawer__tag"
                  key={tag}
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section className="search-drawer__section">
            <h3>Recent Search</h3>

            <ul className="search-drawer__list">
              {recentSearches.map((item) => (
                <li key={item}>
                  <button type="button">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="search-drawer__section">
            <h3>Suggested</h3>

            <ul className="search-drawer__list">
              {suggested.map((item) => (
                <li key={item}>
                  <button type="button">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </aside>
    </div>
  );
}