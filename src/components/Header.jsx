import { useState } from "react";
import "./Header.css";
import Search from "./drawers/Search";

function Header() {
    const [searchOpen, setSearchOpen] =
    useState(false);

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
            <img src="/images/Logo.svg" alt="Mooday" />
          </a>

          <nav
            className="site-header__nav site-header__nav--right"
            aria-label="Utilities"
          >
            <button
                type="button"
                onClick={() =>
                  setSearchOpen(true)
                }
              >
                Search
              </button>
            <button type="button">Cart</button>
            <button type="button">Account</button>
            
          </nav>
        </div>
      </header>

      <Search
          open={searchOpen}
          onClose={() =>
            setSearchOpen(false)
          }
        />
      </>

  );
}

export default Header;