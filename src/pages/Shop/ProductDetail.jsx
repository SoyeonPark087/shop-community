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

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0)

  if (!product) {
    return (
      <main className="product-detail product-detail--empty">
        <h1>상품을 찾을 수 없습니다.</h1>
        <a href="/shop">Shop으로 돌아가기</a>
      </main>
    )
  }

  const selectedImage =
    galleryImages[selectedImageIndex] ||
    galleryImages[0] ||
    ''

  return (
    <main className="product-detail">
      <nav className="product-detail__breadcrumb">
        <a href="/shop">Shop</a>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <section className="product-detail__main">
        {/* 왼쪽 전체 사진 영역 */}
        <div className="product-detail__gallery">
          {/* 왼쪽 세로 썸네일 */}
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

          {/* 대표 이미지 */}
          {selectedImage && (
            <div className="product-detail__main-image">
              <img
                src={selectedImage}
                alt={`${product.name} 선택 이미지`}
              />
            </div>
          )}

          {/* 아래 상세 이미지 */}
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
        </div>

        {/* 오른쪽 상품 정보 */}
        <div className="product-detail__information">
          <h1>{product.name}</h1>

          <p className="product-detail__price">
            ₩ {Number(product.price).toLocaleString()}
          </p>

          <div className="product-detail__colors">
            <p>Color</p>
            <span>{product.color}</span>
          </div>

          <div className="product-detail__option">
            <p>Size</p>

            <div className="product-detail__sizes">
              {['S', 'M', 'L'].map((size) => (
                <button type="button" key={size}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="product-detail__cart"
          >
            Add to Cart
          </button>

          <div className="product-detail__description">
            {product.description && (
              <p>{product.description}</p>
            )}

            {product.material && (
              <ul>
                <li>{product.material}</li>
                <li>Relaxed Fit</li>
                <li>Prewashed</li>
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetail