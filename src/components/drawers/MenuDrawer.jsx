import React, { useEffect, useState } from "react";

import "./Drawer.css";
import "./MenuDrawer.css";

function MenuDrawer({
  open,
  onClose,
  onOpenAccount,
}) {
  const [keyword, setKeyword] = useState("");

  /*
   * Drawer가 열려 있을 때
   * body scroll 방지
   */

  /*
   * ESC로 Drawer 닫기
   */
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


  /*
   * 검색
   */
  const handleSearch = (event) => {
    event.preventDefault();

    const value = keyword.trim();

    if (!value) {
      return;
    }

    /*
     * 현재 프로젝트 검색 페이지 경로에 맞게 수정
     *
     * 예:
     * /search?q=shirt
     */
    window.location.href =
      `/search?q=${encodeURIComponent(value)}`;
  };


  return (
    <div
      className={
        open
          ? "drawer-layer drawer-layer--open"
          : "drawer-layer"
      }
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close menu"
        onClick={onClose}
      />


      {/* Drawer */}
      <aside
        className="drawer menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Close */}
        <div className="menu-drawer__top">
          <button
            type="button"
            className="drawer__close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <span className="drawer__close-icon" />
          </button>
        </div>


        {/* Search */}
        <form
          className="menu-drawer__search"
          onSubmit={handleSearch}
        >
          <div className="menu-drawer__search-field">
            <input
              type="search"
              value={keyword}
              placeholder="검색어를 입력하세요."
              aria-label="검색어를 입력하세요."
              onChange={(event) =>
                setKeyword(event.target.value)
              }
            />

            <button
              type="submit"
              className="menu-drawer__search-button"
              aria-label="Search"
            >
              <span className="menu-drawer__search-icon" />
            </button>
          </div>
        </form>

        <div className="menu-drawer__tags">
            <button type="button">#homewear</button>
            <button type="button">#layered</button>
            <button type="button">#neutral</button>
            <button type="button">#outside</button>
            <button type="button">#simple</button>
        </div>

        {/* Global Navigation */}
        <nav
          className="menu-drawer__gnb"
          aria-label="Global navigation"
        >
          <a href="/shop" onClick={onClose}>
            Shop
          </a>

          <a href="/editorial" onClick={onClose}>
            Editorial
          </a>

          <a href="/community" onClick={onClose}>
            Community
          </a>
        </nav>


        <div className="menu-drawer__divider" />


        {/* Utility Navigation */}
        <nav
          className="menu-drawer__utility"
          aria-label="Account navigation"
        >
          <button
            type="button"
            onClick={() => {
              onClose();

              if (onOpenAccount) {
                onOpenAccount();
              }
            }}
          >
            Account
          </button>

          <a href="/mypage/orders" onClick={onClose}>
            Orders
          </a>

          <a href="/mypage/wishlist" onClick={onClose}>
            Wishlist
          </a>
        </nav>


        {/* Bottom */}
        <div className="menu-drawer__bottom">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </aside>
    </div>
  );
}

export default MenuDrawer;