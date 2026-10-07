import { useEffect, useState } from "react";
import useSiteSearch from "../../hooks/useSiteSearch.js";
import { suggestedTags } from "../../utils/search.js";

import "./Drawer.css";
import "./MenuDrawer.css";

function MenuDrawer({ open, onClose }) {
  const [keyword, setKeyword] = useState("");
  const search = useSiteSearch(onClose);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const handleSearch = (event) => {
    event.preventDefault();
    search(keyword);
  };

  return (
    <div
      className={open ? "drawer-layer drawer-layer--open" : "drawer-layer"}
      aria-hidden={!open}
      inert={!open}
    >

      <button type="button" className="drawer-backdrop" aria-label="Close menu" onClick={onClose} />

      <aside className="drawer menu-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">

        <div className="menu-drawer__top">
          <button type="button" className="drawer__close" aria-label="Close menu" onClick={onClose}>
            <span className="drawer__close-icon" />
          </button>
        </div>

        <form className="menu-drawer__search" onSubmit={handleSearch}>
          <div className="menu-drawer__search-field">
            <input
              type="search"
              value={keyword}
              placeholder="검색어를 입력하세요."
              aria-label="검색어를 입력하세요."
              onChange={event => setKeyword(event.target.value)}
            />

            <button type="submit" className="menu-drawer__search-button" aria-label="Search">
              <span className="menu-drawer__search-icon" />
            </button>
          </div>
        </form>

        <div className="menu-drawer__tags">
            {suggestedTags.map((tag) => (
              <button type="button" key={tag} onClick={() => search(tag)}>
                #{tag}
              </button>
            ))}
        </div>

        <nav className="menu-drawer__gnb" aria-label="Global navigation">
          <a href="#/shop" onClick={onClose}>
            Shop
          </a>

          <a href="#/editorial" onClick={onClose}>
            Editorial
          </a>

          <a href="#/community" onClick={onClose}>
            Community
          </a>
        </nav>

        <div className="menu-drawer__divider" />

        <nav className="menu-drawer__utility" aria-label="Account navigation">
          <a href="#/mypage" onClick={onClose}>
            Account
          </a>

          <a href="#/mypage" onClick={onClose}>
            Orders
          </a>

          <a href="#/mypage" onClick={onClose}>
            Wishlist
          </a>
        </nav>

        <div className="menu-drawer__bottom">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </aside>
    </div>
  );
}

export default MenuDrawer;
