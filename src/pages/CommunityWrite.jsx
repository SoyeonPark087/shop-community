
import { useState } from 'react'

import '../styles/communityWrite.css'


/*
  =========================================
  MOODAY COMMUNITY WRITE
  Frame + Product Image Integration v1.1
  =========================================

  이번 구현:

  - 기존 Write 프레임 유지
  - Desktop / Tablet / Mobile 반응형 유지
  - 본문 / 해시태그 / 상품 검색어 입력 가능
  - 본문 최대 2000자
  - Post / Cancel → /community
  - 오른쪽 상품 이미지 연결
  - 이미지 누락 시 플레이스홀더 표시

  후속 구현:

  - 실제 이미지 업로드
  - 썸네일 선택 및 삭제
  - 태그 등록
  - 상품 검색 필터링 및 선택
  - 실제 게시글 저장
  - 작성 중 이탈 경고

  Main / Detail / App / Router 수정 없음.
*/


/* =====================================
   01. SAMPLE PRODUCTS
===================================== */

/*
  이미지는 public 폴더 기준 절대 경로입니다.

  검색 결과와 선택된 상품은
  동일한 상품 객체 및 이미지 경로를 사용합니다.

  실제 상품 이미지 파일이 없어도
  화면이 깨지지 않도록 별도 처리를 적용합니다.
*/

const sampleProducts = [
  {
    id: 'write-product-01',
    name: 'Bouclé Knit Cardigan',
    price: '₩89,000',
    image:
      '/images/community/write/products/boucle-knit-cardigan.jpg',
  },
  {
    id: 'write-product-02',
    name: 'Soft Hood Zip-up',
    price: '₩79,000',
    image:
      '/images/community/write/products/soft-hood-zipup.jpg',
  },
  {
    id: 'write-product-03',
    name: 'Wide Nylon Pants',
    price: '₩89,000',
    image:
      '/images/community/write/products/wide-nylon-pants.jpg',
  },
  {
    id: 'write-product-04',
    name: 'Cotton Sleeveless Top',
    price: '₩49,000',
    image:
      '/images/community/write/products/cotton-sleeveless-top.jpg',
  },
]


/*
  시안의 선택된 상품 예시입니다.

  검색 결과와 같은 상품 객체를 참조하므로
  같은 이미지가 표시됩니다.

  실제 상품 선택 기능은 아직 구현하지 않습니다.
*/

const sampleSelectedProducts = [
  sampleProducts[0],
  sampleProducts[2],
]


/* =====================================
   02. RECOMMENDED TAGS
===================================== */

const recommendedTags = [
  'daily',
  'minimal',
  'knit',
  'outer',
  'bag',
  'shoes',
  'acc',
  'layered',
  'homewear',
  'weekend',
  'neutral',
]


/* =====================================
   03. IMAGE PLACEHOLDER
===================================== */

function WriteImagePlaceholder({
  className = '',
  children,
}) {
  return (
    <div
      className={`mooday-write-image-placeholder ${className}`}
    >
      {children}
    </div>
  )
}


/* =====================================
   04. LEFT GALLERY
===================================== */

/*
  이번 이미지 작업에서 왼쪽 갤러리는
  기존과 동일하게 플레이스홀더로 유지합니다.

  후속 개발 규칙:

  - 이미지 최소 1장 / 최대 10장
  - 첫 번째 이미지 = 대표 이미지
  - 다른 썸네일 클릭 = 상단 미리보기 변경
  - 첫 번째 이미지 삭제 시 자동 재정렬
  - 썸네일 4칸 스크롤
  - 추가 버튼 오른쪽 고정
  - 10장 도달 시 추가 버튼 숨김

  실제 업로드 / 삭제 / 선택 기능은 미구현.
*/

function WriteGallery() {
  const placeholderSlots = [1, 2, 3, 4]

  return (
    <section
      className="mooday-write-gallery"
      aria-label="게시글 이미지"
    >

      {/* MAIN IMAGE */}

      <div className="mooday-write-gallery__main">

        <WriteImagePlaceholder
          className="mooday-write-gallery__main-placeholder"
        >

          <span
            className="mooday-write-gallery__representative"
          >
            대표 이미지
          </span>

          <div className="mooday-write-gallery__empty-content">

            <span
              className="mooday-write-gallery__empty-icon"
              aria-hidden="true"
            >
              +
            </span>

            <p>
              스타일 사진을 추가해 주세요.
            </p>

            <span>
              이미지 비율 4:5
            </span>

          </div>

        </WriteImagePlaceholder>

      </div>


      {/* THUMBNAILS + FIXED ADD BUTTON */}

      <div className="mooday-write-gallery__bottom">

        <div
          className="mooday-write-gallery__thumbnail-track"
          aria-label="이미지 썸네일 슬롯"
        >

          {placeholderSlots.map((slot) => (
            <div
              key={slot}
              className={
                'mooday-write-gallery__thumbnail' +
                (slot === 1
                  ? ' mooday-write-gallery__thumbnail--first'
                  : '')
              }
            >

              <WriteImagePlaceholder
                className="mooday-write-gallery__thumbnail-placeholder"
              >
                <span>{slot}</span>
              </WriteImagePlaceholder>

            </div>
          ))}

        </div>


        {/* UPLOAD FEATURE: NOT IMPLEMENTED */}

        <button
          type="button"
          className="mooday-write-gallery__add"
          disabled
          aria-label="이미지 추가 기능 준비 중"
          title="이미지 추가 기능은 추후 구현됩니다."
        >

          <span
            className="mooday-write-gallery__add-icon"
            aria-hidden="true"
          >
            +
          </span>

          <span>사진 추가</span>

          <span className="mooday-write-gallery__add-limit">
            최대 10장
          </span>

        </button>

      </div>


      <p className="mooday-write-gallery__guide">
        이미지는 최대 10장까지 등록할 수 있습니다.
      </p>

    </section>
  )
}


/* =====================================
   05. PRODUCT IMAGE
===================================== */

/*
  이번에 수정된 공통 상품 이미지 컴포넌트.

  product.image를 받아 실제 이미지를 표시합니다.

  다음 경우에는 플레이스홀더를 표시합니다.

  1. 이미지 경로가 없음
  2. 이미지 경로가 빈 문자열
  3. 이미지 파일이 존재하지 않음
  4. 이미지 로딩에 실패함

  새로운 외부 이미지를 불러오지 않습니다.
*/

function WriteProductImage({ image, name }) {
  const [imageError, setImageError] = useState(false)

  const hasImage =
    typeof image === 'string' &&
    image.trim() !== '' &&
    !imageError

  return (
    <div className="mooday-write-product-image">

      {hasImage ? (
        <img
          src={image}
          alt={`${name} 상품 이미지`}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
        />
      ) : (
        <span
          className="mooday-write-product-image__placeholder"
          role="img"
          aria-label={`${name} 이미지 준비 중`}
        >
          IMAGE
        </span>
      )}

    </div>
  )
}


/* =====================================
   06. PRODUCT SEARCH RESULT
===================================== */

/*
  검색 결과 상품 카드입니다.

  상품명 / 가격 / 상품 이미지 경로를
  sampleProducts에서 받아 출력합니다.

  실제 검색 필터링 및 선택은 미구현.
*/

function WriteProductResult({ product }) {
  return (
    <div className="mooday-write-product-result">

      <WriteProductImage
        image={product.image}
        name={product.name}
      />

      <div className="mooday-write-product-result__info">

        <strong>
          {product.name}
        </strong>

        <span>
          {product.price}
        </span>

      </div>

      {/* STATIC ADD ICON */}

      <span
        className="mooday-write-product-result__add"
        aria-hidden="true"
      >
        +
      </span>

    </div>
  )
}


/* =====================================
   07. SELECTED PRODUCT
===================================== */

/*
  선택된 상품 예시 카드입니다.

  검색 결과와 동일한 product.image를 사용하므로
  이미지를 별도로 복제할 필요가 없습니다.

  실제 상품 삭제 기능은 미구현.
*/

function WriteSelectedProduct({ product }) {
  return (
    <div className="mooday-write-selected-product">

      <WriteProductImage
        image={product.image}
        name={product.name}
      />

      <div className="mooday-write-selected-product__info">

        <strong>
          {product.name}
        </strong>

        <span>
          {product.price}
        </span>

      </div>

      {/* STATIC REMOVE ICON */}

      <span
        className="mooday-write-selected-product__remove"
        aria-hidden="true"
      >
        ×
      </span>

    </div>
  )
}


/* =====================================
   08. COMMUNITY WRITE PAGE
===================================== */

export default function CommunityWrite() {

  /*
    A안 확정:

    입력창에는 실제로 타이핑할 수 있습니다.

    다만 태그 등록, 상품 검색 필터링,
    게시글 저장은 아직 하지 않습니다.
  */

  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [productQuery, setProductQuery] = useState('')


  return (
    <main
      className="mooday-write"
      id="community-write"
    >

      <div className="mooday-write__inner">


        {/* =================================
            01. MAIN LAYOUT
        ================================= */}

        <div className="mooday-write__layout">


          {/* LEFT: GALLERY */}

          <WriteGallery />


          {/* RIGHT: FORM */}

          <div className="mooday-write-form">


            {/* =================================
                CONTENT
            ================================= */}

            <section className="mooday-write-form__section">

              <div className="mooday-write-form__heading">

                <label htmlFor="mooday-write-content">

                  내용

                  <span
                    className="mooday-write-form__required"
                    aria-label="필수"
                  >
                    *
                  </span>

                </label>

                <span className="mooday-write-form__counter">
                  {content.length}/2000
                </span>

              </div>

              <textarea
                id="mooday-write-content"
                className="mooday-write-form__textarea"
                placeholder="오늘 입은 옷이나 좋아하는 스타일을 자유롭게 남겨주세요."
                value={content}
                maxLength={2000}
                onChange={(event) => {
                  setContent(event.target.value)
                }}
              />

            </section>


            {/* =================================
                HASHTAGS
            ================================= */}

            <section className="mooday-write-form__section">

              <div className="mooday-write-form__heading">

                <label htmlFor="mooday-write-tag">
                  해시태그
                </label>

                <span className="mooday-write-form__counter">
                  {tagInput.length}/30
                </span>

              </div>

              <input
                id="mooday-write-tag"
                className="mooday-write-form__input"
                type="text"
                placeholder="#을 입력하고 엔터를 눌러 추가해주세요."
                value={tagInput}
                maxLength={30}
                onChange={(event) => {
                  setTagInput(event.target.value)
                }}
                onKeyDown={(event) => {
                  /*
                    태그 등록 기능은 아직 없으므로
                    Enter의 기본 동작만 방지합니다.
                  */

                  if (event.key === 'Enter') {
                    event.preventDefault()
                  }
                }}
              />


              {/* SELECTED TAGS */}

              <div className="mooday-write-form__subheading">

                <h3>
                  선택된 태그
                  <span>(0)</span>
                </h3>

                <span>
                  최대 10개까지 추가할 수 있습니다.
                </span>

              </div>

              <div className="mooday-write-tags__empty">
                선택된 해시태그가 여기에 표시됩니다.
              </div>


              {/* RECOMMENDED TAGS */}

              <div
                className="
                  mooday-write-form__subheading
                  mooday-write-form__subheading--recommended
                "
              >
                <h3>추천 태그</h3>
              </div>

              <div className="mooday-write-tags__recommended">

                {recommendedTags.map((tag) => (
                  <span
                    key={tag}
                    className="mooday-write-tags__chip"
                  >
                    #{tag}
                  </span>
                ))}

              </div>

            </section>


            {/* =================================
                RELATED PRODUCTS
            ================================= */}

            <section
              className="
                mooday-write-form__section
                mooday-write-form__section--products
              "
            >

              <div className="mooday-write-form__heading">

                <label htmlFor="mooday-write-product-search">

                  관련 상품

                  <span className="mooday-write-form__optional">
                    (선택)
                  </span>

                </label>

                <span className="mooday-write-form__counter">
                  최대 5개까지 추가할 수 있습니다.
                </span>

              </div>


              {/* PRODUCT SEARCH INPUT */}

              <div className="mooday-write-product-search">

                <span
                  className="mooday-write-product-search__icon"
                  aria-hidden="true"
                >
                  ⌕
                </span>

                <input
                  id="mooday-write-product-search"
                  type="search"
                  placeholder="상품명을 검색하여 추가할 수 있습니다."
                  value={productQuery}
                  onChange={(event) => {
                    setProductQuery(event.target.value)
                  }}
                />

              </div>


              {/* =================================
                  SAMPLE SEARCH RESULTS

                  현재 검색어와 관계없이
                  샘플 상품 4개를 표시합니다.

                  실제 필터링은 후속 구현.
              ================================= */}

              <div className="mooday-write-products__results">

                {sampleProducts.map((product) => (
                  <WriteProductResult
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>


              {/* =================================
                  SAMPLE SELECTED PRODUCTS
              ================================= */}

              <div
                className="
                  mooday-write-form__subheading
                  mooday-write-form__subheading--selected-products
                "
              >

                <h3>

                  선택된 상품

                  <span>(2/5)</span>

                </h3>

              </div>

              <div className="mooday-write-products__selected">

                {sampleSelectedProducts.map((product) => (
                  <WriteSelectedProduct
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>

            </section>

          </div>

        </div>


        {/* =================================
            02. ACTION BUTTONS
        ================================= */}

        <div className="mooday-write__actions">

          {/* CANCEL → COMMUNITY MAIN */}

          <a
            className="
              mooday-write__button
              mooday-write__button--cancel
            "
            href="/community"
          >
            취소
          </a>


          {/*
            POST → COMMUNITY MAIN

            실제 게시글 저장 기능은 없습니다.
            새 Main 카드 및 Detail은 생성되지 않습니다.
          */}

          <a
            className="
              mooday-write__button
              mooday-write__button--submit
            "
            href="/community"
            aria-label="게시하기 화면 흐름 시연: Community Main으로 이동"
          >
            게시하기
          </a>

        </div>

      </div>

    </main>
  )
}