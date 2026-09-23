
import { useState } from 'react'


/*
  =========================================
  MOODAY STYLED PRODUCTS
  Version 1.1
  =========================================

  변경 사항:

  1. 상품 이미지 경로 연결

  2. 이미지 로딩 실패 시 대체 슬롯 표시

  3. 상품 개수에 따라 item / items 구분

  4. 상품 URL이 없는 경우 링크 비활성 유지

  상품 카드 수는 이 컴포넌트가 아닌
  communityDetail.js의 products 배열에서
  결정됩니다.
*/


/* =====================================
   01. PRODUCT IMAGE
===================================== */

/*
  상품 이미지 출력 컴포넌트.

  이미지 파일이 없거나 로딩에 실패하면
  PRODUCT 대체 슬롯을 표시합니다.
*/

function ProductImage({
  src,
  alt,
}) {

  /*
    현재 이미지 경로에서
    로딩 오류가 발생했는지 저장합니다.

    이미지 경로가 변경되면
    새로운 이미지의 로딩을 다시 시도합니다.
  */

  const [failedSrc, setFailedSrc] = useState(null)


  const hasImage =
    typeof src === 'string'
    && src.trim() !== ''
    && failedSrc !== src


  if (!hasImage) {

    return (

      <span
        className="mooday-detail-product__placeholder"
        role="img"
        aria-label={`${alt} 이미지 준비 중`}
      >

        PRODUCT

      </span>

    )

  }


  return (

    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(src)}
    />

  )

}


/* =====================================
   02. PRODUCT CARD
===================================== */

function ProductCard({ product }) {

  /*
    실제 상품 상세 URL이 있는지 확인합니다.

    현재 Shop URL은 미확정이므로
    null이 전달되며 링크가 생성되지 않습니다.
  */

  const hasUrl =
    typeof product.url === 'string'
    && product.url.trim() !== ''


  /* =================================
     CARD CONTENT
  ================================= */

  const content = (

    <>

      {/* 상품 이미지 */}

      <div className="mooday-detail-product__image">

        <ProductImage
          src={product.image}
          alt={product.name}
        />

      </div>


      {/* 상품 정보 */}

      <div className="mooday-detail-product__info">

        <span className="mooday-detail-product__brand">

          {product.brand}

        </span>


        <span className="mooday-detail-product__name">

          {product.name}

        </span>


        <strong className="mooday-detail-product__price">

          {product.price}

        </strong>

      </div>


      {/* 화살표 UI */}

      <span
        className="mooday-detail-product__arrow"
        aria-hidden="true"
      >

        ›

      </span>

    </>

  )


  /* =================================
     URL이 있는 경우
  ================================= */

  if (hasUrl) {

    return (

      <a
        href={product.url}
        className="
          mooday-detail-product
          mooday-detail-product--linked
        "
      >

        {content}

      </a>

    )

  }


  /* =================================
     URL이 없는 경우
  ================================= */

  /*
    현재 단계에서는 상품 카드의
    디자인만 표시합니다.

    존재하지 않는 상품 상세페이지로
    이동시키지 않습니다.
  */

  return (

    <div className="mooday-detail-product">

      {content}

    </div>

  )

}


/* =====================================
   03. PRODUCT LIST
===================================== */

export default function StyledProducts({
  products = [],
}) {

  /*
    현재 게시글의 상품 개수.

    post-01:
      2개

    post-02 ~ post-09:
      1개
  */

  const productCount = products.length


  /*
    상품 개수에 따라
    item / items를 구분합니다.
  */

  const countLabel =
    `${productCount} ${
      productCount === 1 ? 'item' : 'items'
    }`


  return (

    <aside
      className="mooday-detail-products"
      aria-labelledby="detail-products-title"
    >


      {/* =================================
          TITLE
      ================================= */}

      <div className="mooday-detail-products__heading">

        <h2 id="detail-products-title">

          Styled Products

        </h2>


        <span>

          {countLabel}

        </span>

      </div>


      {/* =================================
          PRODUCT CARDS
      ================================= */}

      <div className="mooday-detail-products__list">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>


    </aside>

  )

}