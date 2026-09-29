import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";

/* =========================================
   COMMUNITY PAGE IMPORT

   Community Main / Detail / Write
   기존 페이지 파일을 그대로 사용합니다.
========================================= */
import Community from "./pages/Community";
import CommunityDetail from "./pages/CommunityDetail";
import CommunityWrite from "./pages/CommunityWrite";

/* =========================================
   MY PAGE IMPORT

   MyPage.jsx는 본문만 담당합니다.
   Header / Footer는 아래 공통 Layout에서
   바깥쪽에 적용합니다.
========================================= */
import MyPage from "./pages/MyPage";

/* =========================================
   COMMON HEADER / FOOTER

   팀 공통 컴포넌트를 그대로 사용합니다.
   Header.jsx / Footer.jsx 내부 코드는
   이번 작업에서 수정하지 않습니다.
========================================= */
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  /* =========================================
     CART STATE

     기존 팀장 코드 유지
  ========================================= */

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Soft Cotton Shirt_Pink",
      nameKo: "소프트 코튼 셔츠_핑크",
      option: "S",
      price: 93000,
      quantity: 1,
      image: "/images/shop/cart-shirt-pink.png",
    },
  ]);

  const [cartOpen, setCartOpen] = useState(false);


  /* =========================================
     CART FUNCTION

     기존 팀장 장바구니 기능 유지

     현재 Community / My Page에서는
     직접 사용하지 않지만,
     Header의 Cart Drawer 동작을 위해 유지합니다.
  ========================================= */

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.option === product.option
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.option === product.option
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    // 상품 추가 후 Cart Drawer 열기
    setCartOpen(true);
  };


  /* =========================================
     COMMON SITE LAYOUT

     기존 CommunityLayout을 범용 Layout으로
     정리한 구조입니다.

     적용 대상:
     - Community Main
     - Community Write
     - Community Detail
     - My Page

     중요:
     Header / Footer 컴포넌트 자체는
     수정하지 않고 그대로 재사용합니다.

     Header가 position: absolute이므로
     기존 Community 테스트 방식과 동일하게
     92px 공간을 확보합니다.
  ========================================= */

  const SiteLayout = ({ children }) => {
    return (
      <>
        <Header
          cartItems={cartItems}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />

        {/* =====================================
            HEADER OFFSET

            기존 Community에서 사용하던
            Header 높이 확보용 spacer를
            그대로 유지합니다.

            Header / Header.css는 수정하지 않습니다.
        ===================================== */}
        <div
          style={{
            height: "92px",
          }}
          aria-hidden="true"
        />

        {/* 각 페이지 본문 */}
        {children}

        {/* 기존 공통 Footer 그대로 사용 */}
        <Footer />
      </>
    );
  };


  return (
    <Routes>

      {/* =====================================
          HOME

          기존 팀장 코드 유지
      ===================================== */}

      <Route
        path="/"
        element={
          <Home
            cartItems={cartItems}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
          />
        }
      />


      {/* =====================================
          SIGN UP

          기존 팀장 코드 유지
      ===================================== */}

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* =====================================
          COMMUNITY MAIN

          URL:
          /community

          공통 Header / Footer 적용
      ===================================== */}

      <Route
        path="/community"
        element={
          <SiteLayout>
            <Community />
          </SiteLayout>
        }
      />


      {/* =====================================
          COMMUNITY WRITE

          URL:
          /community/write

          공통 Header / Footer 적용
      ===================================== */}

      <Route
        path="/community/write"
        element={
          <SiteLayout>
            <CommunityWrite />
          </SiteLayout>
        }
      />


      {/* =====================================
          COMMUNITY DETAIL

          URL 예:
          /community/post-01
          /community/post-02
          ...
          /community/post-09

          CommunityDetail 내부에서
          현재 postId를 읽는 기존 구조는
          그대로 유지합니다.
      ===================================== */}

      <Route
        path="/community/:postId"
        element={
          <SiteLayout>
            <CommunityDetail />
          </SiteLayout>
        }
      />


      {/* =====================================
          MY PAGE - PROFILE

          URL:
          /mypage

          중요:
          MyPage.jsx 내부에는
          Header / Footer를 직접 추가하지 않습니다.

          공통 SiteLayout이
          Header → MyPage → Footer 순서로
          감싸는 구조입니다.
      ===================================== */}

      <Route
        path="/mypage"
        element={
          <SiteLayout>
            <MyPage />
          </SiteLayout>
        }
      />


      {/* =====================================
          기존 팀장 작업 예정 영역

          현재는 수정하지 않습니다.
      ===================================== */}

      {/*
        나중에 상품 상세 페이지가 들어오면:

        <Route
          path="/product/:id"
          element={
            <ProductDetail
              onAddToCart={handleAddToCart}
            />
          }
        />
      */}

    </Routes>
  );
}

export default App;