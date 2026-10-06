import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Search from "../drawers/Search";
import Login from "../drawers/Account";
import Cart from "../drawers/Cart";
import Menu from "../drawers/MenuDrawer";

import "./Header.css";


function Header({ cartItems, setCartItems, cartOpen, setCartOpen }) {

  /* ==================================================
     DRAWER STATE
     --------------------------------------------------
     기존 Search / Account / Menu Drawer 상태를
     그대로 유지합니다.
  ================================================== */

  const [activeDrawer, setActiveDrawer] = useState(null);


  /* ==================================================
     HEADER SCROLL STATE
     --------------------------------------------------
     페이지가 최상단인지,
     실제로 스크롤된 상태인지 구분합니다.

     false
     → 페이지 최상단
     → Header Background 투명

     true
     → 페이지가 스크롤된 상태
     → Header Background #fafaf8
  ================================================== */

  const [isScrolled, setIsScrolled] = useState(false);


  const closeDrawer = () => {
    setActiveDrawer(null);
  };


  const baseUrl = import.meta.env.BASE_URL;


  /* ==================================================
     SCROLL EVENT
     --------------------------------------------------
     공통 Header는 모든 페이지에서 사용되므로
     Header 내부에서 한 번만 Scroll 상태를 감지합니다.

     중요:
     useEffect 실행 직후 handleScroll()을 한 번 호출해서
     새로고침 시 기존 Scroll 위치가 유지되는 경우에도
     Header 상태가 즉시 맞도록 처리합니다.

     passive: true
     → Scroll Event가 실제 스크롤 성능을
       불필요하게 막지 않도록 합니다.
  ================================================== */

  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };


    /*
      새로고침 / 뒤로가기 등으로
      Scroll 위치가 이미 내려가 있는 경우를 위해
      최초 1회 즉시 상태를 확인합니다.
    */
    handleScroll();


    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );


    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);


  return (
    <>

      {/* ==================================================
          GLOBAL HEADER
          --------------------------------------------------
          기본:
          site-header

          Scroll 이후:
          site-header
          site-header--scrolled

          Header 내부 Layout / Navigation 구조는
          기존 통합본을 그대로 유지합니다.
      ================================================== */}

      <header
        className={`
          site-header
          ${isScrolled ? "site-header--scrolled" : ""}
        `}
      >

        <div className="site-header__inner">


          {/* -----------------------------------------------
              Desktop Left Navigation
          ----------------------------------------------- */}

          <nav className="site-header__nav site-header__nav--left">

            <Link to="/shop">
              Shop
            </Link>

            <Link to="/editorial">
              Editorial
            </Link>

            <Link to="/community">
              Community
            </Link>

          </nav>


          {/* -----------------------------------------------
              Global Logo
          ----------------------------------------------- */}

          <Link
            to="/"
            className="site-header__logo"
          >

            <img
              src={`${baseUrl}icons/Logo.svg`}
              alt="로고"
            />

          </Link>


          {/* -----------------------------------------------
              Desktop Right Navigation
          ----------------------------------------------- */}

          <nav className="site-header__nav site-header__nav--right">

            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={activeDrawer === "search"}
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


          {/* -----------------------------------------------
              Tablet / Mobile Actions
              기존 ≤1024px 구조 그대로 유지
          ----------------------------------------------- */}

          <div className="site-header__actions">


            {/* Cart */}

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


            {/* Account */}

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


            {/* Menu */}

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


      {/* ==================================================
          DRAWERS
          --------------------------------------------------
          기존 Drawer 구조 및 동작은 변경하지 않습니다.
      ================================================== */}

      {activeDrawer === "search" && (
        <Search
          open
          onClose={closeDrawer}
        />
      )}


      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onItemsChange={setCartItems}
      />


      <Login
        open={activeDrawer === "login"}
        onClose={closeDrawer}
      />


      <Menu
        open={activeDrawer === "menu"}
        onClose={closeDrawer}
      />

    </>
  );
}


export default Header;