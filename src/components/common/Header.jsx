import { useState } from "react";
import { Link } from "react-router-dom";

import Search from "../drawers/Search";
import Login from "../drawers/Account";
import Cart from "../drawers/Cart";
import Menu from "../drawers/MenuDrawer";

import "./Header.css";

function Header({ cartItems, setCartItems, cartOpen, setCartOpen }) {
  const [activeDrawer, setActiveDrawer] = useState(null);

  const closeDrawer = () => {
    setActiveDrawer(null);
  };

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">

          <nav className="site-header__nav site-header__nav--left">
            <Link to="/shop">Shop</Link>
            <Link to="/editorial">Editorial</Link>
            <Link to="/community">Community</Link>
          </nav>

          <Link to="/" className="site-header__logo">
            <img
              src={`${baseUrl}icons/Logo.svg`}
              alt="로고"
            />
          </Link>

          <nav className="site-header__nav site-header__nav--right">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={activeDrawer === "search"}
              onClick={() => setActiveDrawer("search")}
            >
              Search
            </button>

            <button type="button" onClick={() => setCartOpen(true)}>
              Cart
            </button>

            <button type="button" onClick={() => setActiveDrawer("login")}>
              Account
            </button>
          </nav>

          <div className="site-header__actions">

            <button
              type="button"
              className="site-header__icon-button site-header__cart"
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
            >
              <img
                src={`${baseUrl}icons/cart.svg`}
                alt="장바구니"
                className="site-header__icon-image"
              />
            </button>

            <button
              type="button"
              className="site-header__icon-button"
              aria-label="Account"
              onClick={() => setActiveDrawer("login")}
            >
              <img
                src={`${baseUrl}icons/account.svg`}
                alt="계정"
                className="site-header__icon-image"
              />
            </button>

            <button
              type="button"
              className="site-header__icon-button"
              aria-label="Open menu"
              aria-expanded={activeDrawer === "menu"}
              onClick={() => setActiveDrawer("menu")}
            >
              <img
                src={`${baseUrl}icons/menu.svg`}
                alt="메뉴"
                className="site-header__icon-image"
              />
            </button>
          </div>

        </div>
      </header>

      {activeDrawer === "search" && (
        <Search open onClose={closeDrawer} />
      )}

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onItemsChange={setCartItems}
      />

      <Login open={activeDrawer === "login"} onClose={closeDrawer} />

      <Menu open={activeDrawer === "menu"} onClose={closeDrawer} />
    </>
  );
}

export default Header;
