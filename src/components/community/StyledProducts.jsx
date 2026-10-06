import { useState } from 'react'

function ProductImage({ src, alt }) {

  const [failedSrc, setFailedSrc] = useState(null)

  const hasImage = typeof src === 'string' && src.trim() !== '' && failedSrc !== src

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

    <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailedSrc(src)} />

  )

}

function formatPrice(price) {
  const numericPrice =
    typeof price === 'number'
      ? price
      : Number(String(price).replace(/[^\d]/g, ''))

  return `₩ ${numericPrice.toLocaleString('ko-KR')}`
}

function ProductCard({ product }) {

  const hasUrl = typeof product.url === 'string' && product.url.trim() !== ''

  const content = (

    <>

      <div className="mooday-detail-product__image">

        <ProductImage src={product.image} alt={product.name} />

      </div>

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

      <span className="mooday-detail-product__arrow" aria-hidden="true">

        ›

      </span>

    </>

  )

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

  return (

    <div className="mooday-detail-product">

      {content}

    </div>

  )

}

export default function StyledProducts({ products = [] }) {

  const productCount = products.length

  const countLabel =
    `${productCount} ${
      productCount === 1 ? 'item' : 'items'
    }`

  return (

    <aside className="mooday-detail-products" aria-labelledby="detail-products-title">

      <div className="mooday-detail-products__heading">

        <h2 id="detail-products-title">

          STYLED PRODUCTS

        </h2>

        <span>

          {countLabel}

        </span>

      </div>

      <div className="mooday-detail-products__list">

        {products.map((product) => (

          <ProductCard key={product.id} product={product} />

        ))}

      </div>

    </aside>

  )

}
