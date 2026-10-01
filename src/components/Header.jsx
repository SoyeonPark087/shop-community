import { useState } from "react";

import Search from "./drawers/Search";
import Login from "./drawers/Account";
import Cart from "./drawers/Cart";
import Menu from "./drawers/MenuDrawer";

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

          {/* Desktop GNB */}
          <nav className="site-header__nav site-header__nav--left">
            <a href="/shop">Shop</a>
            <a href="/editorial">Editorial</a>
            <a href="/community">Community</a>
          </nav>

          {/* Logo */}
          <a
            href="/"
            className="site-header__logo"
          >
            <img
              src="public/images/common/logo.svg"
              alt="로고"
            />
          </a>

          {/* Desktop right menu */}
          <nav className="site-header__nav site-header__nav--right">

            <button
              type="button"
              onClick={() =>
                setActiveDrawer("search")
              }
            >
              Search
            </button>

            <button
              type="button"
              onClick={() =>
                setCartOpen(true)
              }
            >
              Cart
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveDrawer("login")
              }
            >
              Account
            </button>

          </nav>


          {/* Mobile actions */}
          <div className="site-header__actions">

              {/* Cart icon */}
              <button
                type="button"
                className="site-header__icon-button site-header__cart"
                aria-label="Cart"
                onClick={() => setCartOpen(true)}
              >
                <img
                  src="/icons/cart.svg"
                  alt=""
                  className="site-header__icon-image"
                />
              </button>

              {/* Account */}
              <button
                type="button"
                className="site-header__icon-button"
                aria-label="Account"
                onClick={() => setActiveDrawer("login")}
              >
                <img
                  src="/icons/account.svg"
                  alt=""
                  className="site-header__icon-image"
                />
              </button>


            {/* Hamburger */}
            <button
              type="button"
              className="site-header__icon-button"
              aria-label="Open menu"
              aria-expanded={activeDrawer === "menu"}
              onClick={() => setActiveDrawer("menu")}
            >
              <img
                src="icons/menu.svg"
                alt=""
                className="site-header__icon-image"
              />
            </button>

          </div>

        </div>
      </header>


      {/* Search Drawer */}
      <Search
        open={activeDrawer === "search"}
        onClose={closeDrawer}
      />


      {/* Cart Drawer */}
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
      />


      {/* Account Drawer */}
      <Login
        open={activeDrawer === "login"}
        onClose={closeDrawer}
      />


      {/* Menu Drawer */}
      <Menu
        open={activeDrawer === "menu"}
        onClose={closeDrawer}
      />

    </>
  );
}

export default Header;