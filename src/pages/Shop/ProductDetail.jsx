import { useState } from 'react'
import { products } from '../../data/Products'
import './ProductDetail.css'

const recommendedProducts = [
  {
    id: 1,
    name: 'Ribbed Tank Top',
    price: 49000,
    image: '/images/shop/Like01.png',
    colors: ['#2f3130', '#ded8cd', '#8e8f88'],
  },
  {
    id: 2,
    name: 'Wide Nylon Pants',
    price: 89000,
    image: '/images/shop/Like02.png',
    colors: ['#111111', '#ddd9cf', '#73746e'],
  },
  {
    id: 3,
    name: 'Back Tie Long Sleeve',
    price: 56000,
    image: '/images/shop/Like03.png',
    colors: ['#50514d', '#dedbd2', '#2b2b2b'],
  },
  {
    id: 4,
    name: 'Relaxed Knit Tee',
    price: 62000,
    image: '/images/shop/Like04.png',
    colors: ['#e4e0d8', '#a3a19b', '#2e302e'],
  },
]

const communityLooks = [
  {
    id: 1,
    user: '@mood__i',
    description: 'A slow morning, a better day.',
    image: '/images/shop/Community_Looks01.png',
  },
  {
    id: 2,
    user: '@mood__i',
    description: 'Comfortable pieces for everyday.',
    image: '/images/shop/Community_Looks02.png',
  },
  {
    id: 3,
    user: '@mood__i',
    description: 'A softer mood for the day.',
    image: '/images/shop/Community_Looks03.png',
  },
  {
    id: 4,
    user: '@mood__i',
    description: 'Simple moments, better mood.',
    image: '/images/shop/Community_Looks04.png',
  },
]

function ProductDetail({ onAddToCart }) {
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

  const [reviewsOpen, setReviewsOpen] =
    useState(false)

  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (name) => {
    setOpenAccordion((prev) =>
      prev === name ? null : name
    );
  };

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

    const handleAddToCart = () => {
  if (!selectedSize) {
    alert('사이즈를 선택해주세요.');
    return;
  }

  onAddToCart?.({
    id: product.id,
    name: product.name,
    nameKo: product.nameKo || product.name,
    price: product.price,

    option: selectedSize,

    color: selectedColor?.name || '',
    colorHex: selectedColor?.hex || '',

    image:
      selectedImage ||
      product.image ||
      '',
  });
};

  return (
    <main className="product-detail">
      {/* 현재 페이지 경로 */}
      <nav className="product-detail__breadcrumb">
        <a href="/shop">Shop</a>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* 상품 상단 및 상세 이미지 */}
      <section className="product-detail__main">
        {/* 메인 이미지와 서브 이미지 */}
        <div className="product-detail__gallery">
          {selectedImage && (
            <div className="product-detail__main-image">
              <img
                src={selectedImage}
                alt={`${product.name} 선택 이미지`}
              />
            </div>
          )}

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

        {/* 상품 정보 */}
        <div className="product-detail__information">
          <h1>{product.name}</h1>

          <p className="product-detail__price">
            ₩ {Number(product.price).toLocaleString()}
          </p>

          {/* 컬러 선택 */}
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

          {/* 사이즈 선택 */}
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

          {/* 장바구니 */}
          <button
            type="button"
            className="product-detail__cart"
            onClick={handleAddToCart}

          >
            Add to Cart
          </button>

          {/* 상품 정보 메뉴 */}
          <div className="product-detail__accordions">
            {/* Size & Fit */}
            <div className="product-detail__accordion-item">
              <button
                type="button"
                className="product-detail__accordion"
                onClick={() => toggleAccordion("size")}
                aria-expanded={openAccordion === "size"}
              >
                <span>Size & Fit</span>
                <span>
                  {openAccordion === "size" ? "−" : "+"}
                </span>
              </button>

              {openAccordion === "size" && (
                <div className="product-detail__accordion-content">
                  <p>정사이즈로 제작되었습니다.</p>
                  <p>여유로운 실루엣입니다.</p>
                  <p>상품별 사이즈 옵션을 확인해주세요.</p>
                  <p>모델 170cm / 상의 S, 하의 26</p>
                </div>
              )}
            </div>


            {/* Materials & Care */}
            <div className="product-detail__accordion-item">
              <button
                type="button"
                className="product-detail__accordion"
                onClick={() => toggleAccordion("materials")}
                aria-expanded={openAccordion === "materials"}
              >
                <span>Materials & Care</span>
                <span>
                  {openAccordion === "materials" ? "−" : "+"}
                </span>
              </button>

              {openAccordion === "materials" && (
                <div className="product-detail__accordion-content">
                  <p>{product.material}</p>
                  <p>찬물 단독 세탁을 권장합니다.</p>
                  <p>표백제 및 건조기 사용을 피해주세요.</p>
                  <p>낮은 온도에서 다림질해주세요.</p>
                </div>
              )}
            </div>


            {/* Shipping & Returns */}
            <div className="product-detail__accordion-item">
              <button
                type="button"
                className="product-detail__accordion"
                onClick={() => toggleAccordion("shipping")}
                aria-expanded={openAccordion === "shipping"}
              >
                <span>Shipping & Returns</span>
                <span>
                  {openAccordion === "shipping" ? "−" : "+"}
                </span>
              </button>

              {openAccordion === "shipping" && (
                <div className="product-detail__accordion-content">
                  <p>주문 후 2–5 영업일 이내 출고됩니다.</p>
                  <p>상품 수령 후 7일 이내 교환 및 반품이 가능합니다.</p>
                </div>
              )}
            </div>

          </div>

          {/* 상품 설명 */}
          <div className="product-detail__description">
            {product.description && (
              <p>{product.description}</p>
            )}

            <ul>
              <li>Relaxed Fit</li>
              <li>Prewashed</li>
            </ul>
          </div>
        </div>

        {/* 상세 이미지 */}
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

      {/* 상세페이지 하단 콘텐츠 */}
      <div className="product-detail__bottom">
        {/* 추천 상품 */}
        <section className="product-detail__recommend">
          <div className="product-detail__section-heading">
            <h2>You May Also Like</h2>

            {/* 링크가 아닌 일반 텍스트 */}
            <span className="product-detail__view-all">
              View All
              <span aria-hidden="true">→</span>
            </span>
          </div>

          <div className="product-detail__recommend-grid">
            {recommendedProducts.map((item) => (
              <article
                className="product-detail__recommend-card"
                key={item.id}
              >
                {/* 링크가 아닌 일반 콘텐츠 */}
                <div className="product-detail__recommend-content">
                  <div className="product-detail__recommend-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="product-detail__recommend-info">
                    <h3>{item.name}</h3>

                    <p>
                      ₩ {Number(item.price).toLocaleString()}
                    </p>

                    <div
                      className="product-detail__recommend-colors"
                      aria-label={`${item.name} 컬러`}
                    >
                      {item.colors.map((color, index) => (
                        <span
                          key={`${color}-${index}`}
                          style={{
                            backgroundColor: color,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 커뮤니티 스타일 */}
        <section className="product-detail__community">
          <div className="product-detail__section-heading">
            <h2>Community Looks</h2>

            {/* 링크가 아닌 일반 텍스트 */}
            <span className="product-detail__view-all">
              View All
              <span aria-hidden="true">→</span>
            </span>
          </div>

          <div className="product-detail__community-grid">
            {communityLooks.map((look) => (
              <article
                className="product-detail__community-card"
                key={look.id}
              >
                <div className="product-detail__community-image">
                  <img
                    src={look.image}
                    alt={`${look.user} 커뮤니티 스타일`}
                  />
                </div>

                <strong>{look.user}</strong>
                <p>{look.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 리뷰 */}
        <section className="product-detail__reviews">
          <button
            type="button"
            className="product-detail__reviews-button"
            onClick={() =>
              setReviewsOpen((current) => !current)
            }
            aria-expanded={reviewsOpen}
          >
            <span>Reviews (0)</span>

            <span aria-hidden="true">
              {reviewsOpen ? '−' : '＋'}
            </span>
          </button>

          {reviewsOpen && (
            <div className="product-detail__reviews-content">
              <p>아직 작성된 리뷰가 없습니다.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProductDetail