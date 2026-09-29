import { useState } from "react";

import Search from "./drawers/Search";
import Login from "./drawers/Login";
import Cart from "./drawers/Cart";

import "./Header.css";

function Header({
  cartItems,
  cartOpen,
  setCartOpen,
}) {
  const [activeDrawer, setActiveDrawer] =
    useState(null);

  const closeDrawer = () => {
    setActiveDrawer(null);
  };

    return (
      <>
      <header className="site-header">
        <div className="site-header__inner">
          <nav
            className="site-header__nav site-header__nav--left"
            aria-label="Primary"
          >
            <a href="/shop">Shop</a>
            <a href="/editorial">Editorial</a>
            <a href="/community">Community</a>
          </nav>

          <a
            className="site-header__logo"
            href="/"
            aria-label="Mooday home"
          >
            <img src="/images/common/Logo.svg" alt="Mooday" />
          </a>

          <nav
            className="site-header__nav site-header__nav--right"
            aria-label="Utilities"
          >
            <button
              type="button"
              onClick={() => setActiveDrawer("search")}
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
            >
              Cart
            </button>
            <button
              type="button"
              onClick={() => setActiveDrawer("login")}
            >
              Account
            </button>
            
          </nav>
        </div>
      </header>

       <Search
        open={activeDrawer === "search"}
        onClose={closeDrawer}
      />

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
      />

      <Login
        open={activeDrawer === "login"}
        onClose={closeDrawer}
      />
      </>

  );
}

export default Header;