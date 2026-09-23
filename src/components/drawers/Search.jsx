import Drawer from "./Drawer";
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

export default function Search({
  open,
  onClose,
}) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Search"
    >
      <div className="search-content">
        <div className="search-content__input-wrap">
          <input
            type="search"
            placeholder="검색어를 입력하세요."
            aria-label="검색어"
          />

          <button
            type="button"
            className="search-content__submit"
            aria-label="검색"
          >
            <span
              className="search-content__icon"
              aria-hidden="true"
            />
          </button>
        </div>

        <section className="search-content__section">
          <h3>Most Searched</h3>

          <div className="search-content__tags">
            {mostSearched.map((tag) => (
              <button
                type="button"
                key={tag}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        <section className="search-content__section">
          <h3>Recent Search</h3>

          <ul className="search-content__list">
            {recentSearches.map((item) => (
              <li key={item}>
                <button type="button">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="search-content__section">
          <h3>Suggested</h3>

          <ul className="search-content__list">
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
    </Drawer>
  );
}