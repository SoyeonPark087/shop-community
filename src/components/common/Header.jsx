
import { Link } from "react-router-dom";

import Search from "../drawers/Search";
import Login from "../drawers/Account";
import Cart from "../drawers/Cart";
import Menu from "../drawers/MenuDrawer";

import "./Header.css";


// =========================================================
// MOODAY HEADER
// 장바구니 수량 합계 배지 추가
// =========================================================

function Header({
  cartItems,
  setCartItems,
  cartOpen,
  setCartOpen,
  activeDrawer,
  setActiveDrawer
}) {

  // =======================================================
  // DRAWER CONTROL
  // =======================================================

  const closeDrawer = () => {
    setActiveDrawer(null);
  };

  const baseUrl = import.meta.env.BASE_URL;


  // =======================================================
  // CART COUNT
  // 각 상품의 quantity를 합산하여 실제 총수량 계산
  // =======================================================

  const cartCount = (Array.isArray(cartItems) ? cartItems : [])
    .reduce((total, item) => {
      const quantity = Number(item?.quantity);

      return total + (
        Number.isFinite(quantity) && quantity > 0
          ? Math.floor(quantity)
          : 0
      );
    }, 0);

  // 0개일 때는 배지 숨김
  const hasCartItems = cartCount > 0;

  // 최대 99까지 표시, 100 이상은 99+
  const cartCountLabel =
    cartCount > 99 ? "99+" : String(cartCount);

  // 접근성: 실제 장바구니 총수량 전달
  const cartAriaLabel = `Cart, 장바구니 상품 ${cartCount}개`;


  // =======================================================
  // HEADER RENDER
  // =======================================================

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">

          {/* ==========================================
              DESKTOP LEFT NAVIGATION
          ========================================== */}

          <nav className="site-header__nav site-header__nav--left">
            <Link to="/shop">Shop</Link>
            <Link to="/editorial">Editorials</Link>
            <Link to="/community">Community</Link>
          </nav>


          {/* ==========================================
              HEADER LOGO
              기존 로고와 홈 이동 유지
          ========================================== */}

          <Link to="/" className="site-header__logo">
            <img
              src={`${baseUrl}icons/Logo.svg`}
              alt="로고"
            />
          </Link>


          {/* ==========================================
              DESKTOP RIGHT NAVIGATION
          ========================================== */}

          <nav className="site-header__nav site-header__nav--right">

            {/* SEARCH */}
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={activeDrawer === "search"}
              onClick={() => setActiveDrawer("search")}
            >
              Search
            </button>


            {/* DESKTOP CART + COUNT BADGE */}
            <button
              type="button"
              className="site-header__cart-desktop"
              aria-label={cartAriaLabel}
              onClick={() => setCartOpen(true)}
            >
              <span>Cart</span>

              {hasCartItems && (
                <span
                  className="site-header__cart-count"
                  aria-hidden="true"
                >
                  {cartCountLabel}
                </span>
              )}
            </button>


            {/* ACCOUNT */}
            <button
              type="button"
              onClick={() => setActiveDrawer("login")}
            >
              Account
            </button>

          </nav>


          {/* ==========================================
              TABLET / MOBILE ACTIONS
          ========================================== */}

          <div className="site-header__actions">

            {/* MOBILE CART + COUNT BADGE */}
            <button
              type="button"
              className="site-header__icon-button site-header__cart"
              aria-label={cartAriaLabel}
              onClick={() => setCartOpen(true)}
            >
              <img
                src={`${baseUrl}icons/cart.svg`}
                alt=""
                className="site-header__icon-image"
              />

              {hasCartItems && (
                <span
                  className="site-header__cart-count"
                  aria-hidden="true"
                >
                  {cartCountLabel}
                </span>
              )}
            </button>


            {/* MOBILE ACCOUNT */}
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


            {/* MOBILE MENU */}
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


      {/* ==========================================
          SEARCH DRAWER
      ========================================== */}

      {activeDrawer === "search" && (
        <Search
          open
          onClose={closeDrawer}
        />
      )}


      {/* ==========================================
          CART DRAWER
          기존 cartItems 상태 및 변경 함수 유지
      ========================================== */}

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onItemsChange={setCartItems}
      />


      {/* ==========================================
          ACCOUNT DRAWER
      ========================================== */}

      <Login
        open={activeDrawer === "login"}
        onClose={closeDrawer}
      />


      {/* ==========================================
          MENU DRAWER
      ========================================== */}

      <Menu
        open={activeDrawer === "menu"}
        onClose={closeDrawer}
      />

    </>
  );
}

export default Header;
