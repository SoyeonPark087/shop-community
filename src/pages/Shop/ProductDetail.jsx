import { useState } from 'react'
import { products } from '../../data/products'
import './product-detail.css'

function ProductDetail() {
  const productId = window.location.pathname
    .split('/')
    .filter(Boolean)
    .pop()

  const product = products.find(
    (item) => String(item.id) === String(productId)
  )

  const galleryImages =
    product?.galleryImages?.length > 0
      ? product.galleryImages
      : product?.image
        ? [product.image]
        : []

  /*
    products.js에 colors 배열이 있으면 해당 데이터를 사용하고,
    아직 colors가 없는 상품은 기존 color와 colorHex를 사용합니다.
  */
  const productColors =
    product?.colors?.length > 0
      ? product.colors
      : [
          {
            name: product?.color || 'Default',
            hex: product?.colorHex || '#dddddd',
          },
        ]

  const productSizes =
    product?.sizes?.length > 0
      ? product.sizes
      : ['S', 'M', 'L']

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0)

  const [selectedColorIndex, setSelectedColorIndex] =
    useState(0)

  const [selectedSize, setSelectedSize] =
    useState('')

  if (!product) {
    return (
      <main className="product-detail product-detail--empty">
        <h1>상품을 찾을 수 없습니다.</h1>

        <a href="/shop">
          Shop으로 돌아가기
        </a>
      </main>
    )
  }

  const selectedImage =
    galleryImages[selectedImageIndex] ||
    galleryImages[0] ||
    ''

  const selectedColor =
    productColors[selectedColorIndex] ||
    productColors[0]

  return (
    <main className="product-detail">
      {/* 경로 */}
      <nav className="product-detail__breadcrumb">
        <a href="/shop">Shop</a>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <section className="product-detail__main">
        {/* 메인사진과 서브사진 */}
        <div className="product-detail__gallery">
          {/* 메인사진 */}
          {selectedImage && (
            <div className="product-detail__main-image">
              <img
                src={selectedImage}
                alt={`${product.name} 선택 이미지`}
              />
            </div>
          )}

          {/* 서브사진 */}
          {galleryImages.length > 1 && (
            <div className="product-detail__thumbnails">
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className={
                    selectedImageIndex === index
                      ? 'product-detail__thumbnail product-detail__thumbnail--active'
                      : 'product-detail__thumbnail'
                  }
                  onClick={() =>
                    setSelectedImageIndex(index)
                  }
                  aria-label={`${product.name} 이미지 ${
                    index + 1
                  } 보기`}
                  aria-pressed={
                    selectedImageIndex === index
                  }
                >
                  <img
                    src={image}
                    alt={`${product.name} 썸네일 ${
                      index + 1
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 상품정보 */}
        <div className="product-detail__information">
          <h1>{product.name}</h1>

          <p className="product-detail__price">
            ₩ {Number(product.price).toLocaleString()}
          </p>

          {/* 컬러 정보 */}
          <div className="product-detail__colors">
            <div className="product-detail__color-heading">
              <p>Color</p>

              <span>{selectedColor?.name}</span>
            </div>

            <div
              className="product-detail__color-options"
              aria-label="상품 컬러"
            >
              {productColors.map((color, index) => (
                <button
                  type="button"
                  key={`${color.name}-${index}`}
                  className={
                    selectedColorIndex === index
                      ? 'product-detail__color-button product-detail__color-button--active'
                      : 'product-detail__color-button'
                  }
                  onClick={() =>
                    setSelectedColorIndex(index)
                  }
                  aria-label={`${color.name} 컬러 선택`}
                  aria-pressed={
                    selectedColorIndex === index
                  }
                >
                  <span
                    className="product-detail__color-swatch"
                    style={{
                      backgroundColor: color.hex,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 사이즈 정보 */}
          <div className="product-detail__option">
            <div className="product-detail__size-heading">
              <p>Size</p>

              <button
                type="button"
                className="product-detail__size-guide"
              >
                Size Guide
              </button>
            </div>

            <div className="product-detail__sizes">
              {productSizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  className={
                    selectedSize === size
                      ? 'is-selected'
                      : ''
                  }
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  aria-pressed={
                    selectedSize === size
                  }
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 장바구니 버튼 */}
          <button
            type="button"
            className="product-detail__cart"
          >
            Add to Cart
          </button>

          {/* 아코디언 메뉴 */}
          <div className="product-detail__accordions">
            <button
              type="button"
              className="product-detail__accordion"
            >
              <span>Product Details</span>
              <span aria-hidden="true">＋</span>
            </button>

            <button
              type="button"
              className="product-detail__accordion"
            >
              <span>Size &amp; Fit</span>
              <span aria-hidden="true">＋</span>
            </button>

            <button
              type="button"
              className="product-detail__accordion"
            >
              <span>Shipping &amp; Returns</span>
              <span aria-hidden="true">＋</span>
            </button>
          </div>

          {/* 상품 설명 */}
          <div className="product-detail__description">
            {product.description && (
              <p>{product.description}</p>
            )}

            <ul>
              <li>
                {product.material || '100% Cotton'}
              </li>
              <li>Relaxed Fit</li>
              <li>Prewashed</li>
            </ul>
          </div>
        </div>

        {/* 상세사진 */}
        {product.detailImages?.length > 0 && (
          <div className="product-detail__contents">
            {product.detailImages.map(
              (image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${product.name} 상세 이미지 ${
                    index + 1
                  }`}
                />
              )
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default ProductDetail