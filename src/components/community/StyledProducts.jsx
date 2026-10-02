import { useState } from 'react'



/* =====================================
   01. PRODUCT IMAGE
===================================== */

function ProductImage({
  src,
  alt,
}) {

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


function formatPrice(price) {
  const numericPrice =
    typeof price === 'number'
      ? price
      : Number(String(price).replace(/[^\d]/g, ''))

  return `₩ ${numericPrice.toLocaleString('ko-KR')}`
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
          {formatPrice(product.price)}
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


  const productCount = products.length


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

          STYLED PRODUCTS

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