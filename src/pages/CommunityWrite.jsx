import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import {
  communityPosts,
} from '../data/community.js'

import './CommunityWrite.css'


/*
  =========================================
  MOODAY COMMUNITY WRITE
  v0.2
  GROUP 1 ~ GROUP 6
  =========================================

  GROUP 1
  - 로컬 이미지 파일 선택
  - 다중 이미지 선택
  - 선택 이미지 즉시 Preview
  - 첫 번째 이미지 = 대표 이미지
  - 썸네일 클릭 → 메인 Preview 변경
  - 대표 이미지 / 현재 Preview 상태 분리

  GROUP 2
  - 이미지 최대 10장
  - 이미지 삭제
  - 대표 이미지 자동 승계
  - Preview 삭제 fallback
  - 5장 이상 가로 탐색
  - Desktop / Tablet Wide scrollbar
  - 10장 도달 시 Add 숨김
  - blob URL 정리

  GROUP 3
  - Enter 태그 등록
  - 추천 태그 등록
  - 선택 chip
  - 태그 삭제
  - 최대 10개
  - 중복 방지
  - 직접 입력 / 추천 태그 notice 분리

  GROUP 4
  - 상품 검색
  - 부분 일치 / 대소문자 무시
  - 검색 결과 없음
  - 상품 선택 / 제거
  - 중복 선택 방지
  - 최대 5개 제한 로직

  GROUP 5
  - 이미지 최소 1장 Validation
  - 본문 필수 Validation
  - 공백 본문 차단
  - 첫 오류 위치 자동 이동
  - 이미지 → 본문 순서

  GROUP 6
  - 작성 중 여부(isDirty) 계산
  - 취소 시 이탈 경고
  - 새로고침 / 탭 닫기 경고
  - Validation 성공 시 submission 객체 생성
  - 게시글 ID 생성
  - createdAt 생성
  - images / content / tags / products 통합
  - console에서 submission 객체 확인

  아직 미구현 / 후속
  - Drag & Drop
  - 실제 서버 업로드
  - DB 저장
  - sessionStorage Main / Detail 연동
  - 게시 성공 Toast
  - Router 버전 확인 후 SPA 내부 뒤로가기 blocker 검토

  Main / Detail / App / Router 수정 없음.
*/


/* =====================================
   00. CONSTANTS
===================================== */

const MAX_IMAGE_COUNT = 10

const VISIBLE_THUMBNAIL_COUNT = 4

const MAX_TAG_COUNT = 10

const MAX_PRODUCT_COUNT = 5


/* =====================================
   01. SAMPLE PRODUCTS
===================================== */

const sampleProducts = [
  {
    id: 'write-product-01',
    name: 'Cotton Sleeveless Top',
    price: '₩49,000',
    image:
      '/images/community/products/community01_product01.jpg',
  },
  {
    id: 'write-product-02',
    name: 'Wide Nylon Pants',
    price: '₩89,000',
    image:
      '/images/community/products/community01_product02.jpg',
  },
  {
    id: 'write-product-03',
    name: 'Cable Knit Pullover',
    price: '₩85,000',
    image:
      '/images/community/products/community02_product01.jpg',
  },
  {
    id: 'write-product-04',
    name: 'Loose-fit Cotton Blouson Jacket',
    price: '₩149,000',
    image:
      '/images/community/products/community03_product01.jpg',
  },
  {
    id: 'write-product-05',
    name: 'Back-Open Hoodie',
    price: '₩95,000',
    image:
      '/images/community/products/community04_product01.jpg',
  },
  {
    id: 'write-product-06',
    name: 'Bouclé Knit Cardigan',
    price: '₩89,000',
    image:
      '/images/community/products/community05_product01.jpg',
  },
  {
    id: 'write-product-07',
    name: 'Soft Zip-up Hoodie',
    price: '₩79,000',
    image:
      '/images/community/products/community06_product01.jpg',
  },
  {
    id: 'write-product-08',
    name: 'Soft Bouclé Cardigan',
    price: '₩125,000',
    image:
      '/images/community/products/community08_product01.jpg',
  },
  {
    id: 'write-product-09',
    name: 'Back Tie Long Sleeve',
    price: '₩56,000',
    image:
      '/images/community/products/community09_product01.jpg',
  },
]


/* =====================================
   02. RECOMMENDED TAGS
===================================== */

const recommendedTags = [
  ...new Set(
    communityPosts.flatMap(
      (post) => post.tags
    )
  ),
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

function WriteGallery({
  images,
  activePreviewId,
  imageNotice,
  validationError,
  galleryRef,
  onPreviewChange,
  onFilesSelected,
  onRemoveImage,
}) {
  const fileInputRef =
    useRef(null)


  /*
    현재 메인 Preview.

    activePreviewId를 찾을 수 없다면
    첫 번째 이미지를 fallback으로 사용.
  */

  const activeImage =
    images.find(
      (image) =>
        image.id === activePreviewId
    ) ||
    images[0] ||
    null


  /*
    첫 번째 이미지가 항상 대표 이미지.
  */

  const representativeImage =
    images[0] || null


  const isRepresentativePreview =
    activeImage &&
    representativeImage &&
    activeImage.id ===
      representativeImage.id


  const isImageLimitReached =
    images.length >=
    MAX_IMAGE_COUNT


  const hasScrollableThumbnails =
    images.length >
    VISIBLE_THUMBNAIL_COUNT


  /* =====================================
     FILE SELECT
  ===================================== */

  const handleAddButtonClick = () => {
    fileInputRef.current?.click()
  }


  const handleFileChange = (
    event
  ) => {
    const selectedFiles =
      Array.from(
        event.target.files || []
      )


    if (
      selectedFiles.length === 0
    ) {
      return
    }


    onFilesSelected(
      selectedFiles
    )


    /*
      동일 파일 재선택 허용.
    */

    event.target.value = ''
  }


  return (
    <section
      ref={galleryRef}
      className="mooday-write-gallery"
      aria-label="게시글 이미지"
    >

      {/* =================================
          MAIN IMAGE
      ================================= */}

      <div
        className={
          'mooday-write-gallery__main' +
          (
            validationError
              ? ' mooday-write-gallery__main--error'
              : ''
          )
        }
      >

        {activeImage ? (
          <>
            <img
              className="mooday-write-gallery__main-image"
              src={
                activeImage.previewUrl
              }
              alt={`${activeImage.name} 미리보기`}
            />


            {isRepresentativePreview && (
              <span className="mooday-write-gallery__representative">
                대표 이미지
              </span>
            )}
          </>
        ) : (
          <WriteImagePlaceholder
            className="mooday-write-gallery__main-placeholder"
          >

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
        )}

      </div>


      {/* =================================
          THUMBNAILS + ADD
      ================================= */}

      <div className="mooday-write-gallery__bottom">

        <div
          className={
            'mooday-write-gallery__thumbnail-track' +
            (
              hasScrollableThumbnails
                ? ' mooday-write-gallery__thumbnail-track--scrollable'
                : ''
            )
          }
          aria-label="이미지 썸네일 목록"
        >

          {images.map(
            (image, index) => {
              const isActive =
                image.id ===
                activeImage?.id


              return (
                <div
                  key={image.id}
                  className="mooday-write-gallery__thumbnail-item"
                >

                  {/* PREVIEW */}

                  <button
                    type="button"
                    className={
                      'mooday-write-gallery__thumbnail' +
                      (
                        index === 0
                          ? ' mooday-write-gallery__thumbnail--first'
                          : ''
                      ) +
                      (
                        isActive
                          ? ' mooday-write-gallery__thumbnail--active'
                          : ''
                      )
                    }
                    onClick={() => {
                      onPreviewChange(
                        image.id
                      )
                    }}
                    aria-label={
                      index === 0
                        ? `대표 이미지 ${index + 1} 미리보기`
                        : `이미지 ${index + 1} 미리보기`
                    }
                    aria-pressed={
                      isActive
                    }
                  >
                    <img
                      src={
                        image.previewUrl
                      }
                      alt=""
                    />
                  </button>


                  {/* DELETE */}

                  <button
                    type="button"
                    className="mooday-write-gallery__thumbnail-delete"
                    onClick={() => {
                      onRemoveImage(
                        image.id
                      )
                    }}
                    aria-label={`${index + 1}번째 이미지 삭제`}
                    title="이미지 삭제"
                  >
                    ×
                  </button>

                </div>
              )
            }
          )}

        </div>


        {/* HIDDEN FILE INPUT */}

        <input
          ref={
            fileInputRef
          }
          className="mooday-write-gallery__file-input"
          type="file"
          accept="image/*"
          multiple
          onChange={
            handleFileChange
          }
          tabIndex={-1}
          aria-hidden="true"
        />


        {/* ADD BUTTON */}

        {!isImageLimitReached && (
          <button
            type="button"
            className="mooday-write-gallery__add"
            onClick={
              handleAddButtonClick
            }
            aria-label="이미지 파일 추가"
          >

            <span
              className="mooday-write-gallery__add-icon"
              aria-hidden="true"
            >
              +
            </span>

            <span>
              사진 추가
            </span>

            <span className="mooday-write-gallery__add-limit">
              최대 {MAX_IMAGE_COUNT}장
            </span>

          </button>
        )}

      </div>


      {/* =================================
          GUIDE
      ================================= */}

      <div className="mooday-write-gallery__guide-row">

        <p className="mooday-write-gallery__guide">
          이미지는 최소 1장, 최대 {MAX_IMAGE_COUNT}장까지 등록할 수 있습니다.
        </p>


        {images.length > 0 && (
          <span className="mooday-write-gallery__count">
            {images.length}/{MAX_IMAGE_COUNT}
          </span>
        )}

      </div>


      {/* =================================
          IMAGE OPERATION NOTICE
      ================================= */}

      {imageNotice ? (
        <p
          className="
            mooday-write-gallery__notice
            mooday-write-gallery__notice--warning
          "
          role="status"
          aria-live="polite"
        >
          {imageNotice}
        </p>
      ) : (
        isImageLimitReached && (
          <p
            className="
              mooday-write-gallery__notice
              mooday-write-gallery__notice--limit
            "
            role="status"
            aria-live="polite"
          >
            이미지를 최대 {MAX_IMAGE_COUNT}장까지 추가했습니다.
          </p>
        )
      )}


      {/* =================================
          VALIDATION ERROR
      ================================= */}

      {validationError && (
        <p
          className="mooday-write-validation__message mooday-write-validation__message--gallery"
          role="alert"
        >
          {validationError}
        </p>
      )}

    </section>
  )
}


/* =====================================
   05. PRODUCT IMAGE
===================================== */

function WriteProductImage({
  image,
  name,
}) {
  const [
    imageError,
    setImageError,
  ] = useState(false)


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
          onError={() => {
            setImageError(true)
          }}
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

function WriteProductResult({
  product,
  isSelected,
  onAdd,
}) {
  return (
    <div
      className={
        'mooday-write-product-result' +
        (
          isSelected
            ? ' mooday-write-product-result--selected'
            : ''
        )
      }
    >

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


      <button
        type="button"
        className={
          'mooday-write-product-result__add' +
          (
            isSelected
              ? ' mooday-write-product-result__add--selected'
              : ''
          )
        }
        onClick={() => {
          onAdd(product)
        }}
        disabled={
          isSelected
        }
        aria-label={
          isSelected
            ? `${product.name} 선택됨`
            : `${product.name} 선택`
        }
        title={
          isSelected
            ? '선택된 상품'
            : '상품 추가'
        }
      >
        {isSelected
          ? '✓'
          : '+'}
      </button>

    </div>
  )
}


/* =====================================
   07. SELECTED PRODUCT
===================================== */

function WriteSelectedProduct({
  product,
  onRemove,
}) {
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


      <button
        type="button"
        className="mooday-write-selected-product__remove"
        onClick={() => {
          onRemove(
            product.id
          )
        }}
        aria-label={`${product.name} 선택 해제`}
        title="선택 상품 제거"
      >
        ×
      </button>

    </div>
  )
}


/* =====================================
   08. COMMUNITY WRITE PAGE
===================================== */

export default function CommunityWrite() {

  /*
    React Router의 기존 프로젝트 구조를
    그대로 사용합니다.

    App / Router 파일 자체는 수정하지 않습니다.
  */

  const navigate =
    useNavigate()


  /* =====================================
     BASIC INPUT STATE
  ===================================== */

  const [
    content,
    setContent,
  ] = useState('')

  const [
    tagInput,
    setTagInput,
  ] = useState('')

  const [
    productQuery,
    setProductQuery,
  ] = useState('')


  /* =====================================
     ERROR TARGET REFS
  ===================================== */

  const gallerySectionRef =
    useRef(null)

  const contentTextareaRef =
    useRef(null)


  /* =====================================
     IMAGE STATE
  ===================================== */

  const [
    images,
    setImages,
  ] = useState([])

  const [
    activePreviewId,
    setActivePreviewId,
  ] = useState(null)

  const [
    imageNotice,
    setImageNotice,
  ] = useState('')


  /* =====================================
     TAG STATE
  ===================================== */

  const [
    tags,
    setTags,
  ] = useState([])

  const [
    inputTagNotice,
    setInputTagNotice,
  ] = useState('')

  const [
    recommendedTagNotice,
    setRecommendedTagNotice,
  ] = useState('')


  /* =====================================
     PRODUCT STATE
  ===================================== */

  const [
    selectedProducts,
    setSelectedProducts,
  ] = useState([])

  const [
    productNotice,
    setProductNotice,
  ] = useState('')


  /* =====================================
     VALIDATION STATE
  ===================================== */

  const [
    validationErrors,
    setValidationErrors,
  ] = useState({
    images: '',
    content: '',
  })


  /* =====================================
     GROUP 6 — LAST SUBMISSION
  ===================================== */

  /*
    실제 DB 저장 state가 아닙니다.

    현재 세션에서 가장 최근에 생성한
    submission 객체를 개발 / QA 목적으로
    확인할 수 있도록 보관합니다.

    Main / Detail과 공유하지 않습니다.
  */

  const [
    lastSubmission,
    setLastSubmission,
  ] = useState(null)


  /* =====================================
     GROUP 6 — DIRTY STATE
  ===================================== */

  /*
    실제 게시 데이터에 포함되는 값 중
    하나라도 존재하면 작성 중 상태로 판단.

    의도적으로 제외:
    - tagInput
    - productQuery

    이유:
    단순 검색어나 아직 등록하지 않은
    임시 입력만으로 이탈 경고를 띄우는 것은
    과도하기 때문입니다.
  */

  const isDirty =
    images.length > 0 ||
    content.trim().length > 0 ||
    tags.length > 0 ||
    selectedProducts.length > 0


  /* =====================================
     PRODUCT FILTER
  ===================================== */

  const normalizedProductQuery =
    productQuery
      .trim()
      .toLowerCase()


  const filteredProducts =
    normalizedProductQuery
      ? sampleProducts.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(
                normalizedProductQuery
              )
        )
      : sampleProducts


  /* =====================================
     STEP 4 — CLEAR PRODUCT SEARCH
  ===================================== */

  const clearProductSearch = () => {
    setProductQuery('')
    setProductNotice('')
  }


  /* =====================================
     PREVIEW URL REGISTRY
  ===================================== */

  const previewUrlsRef =
    useRef(new Set())


  useEffect(() => {
    const previewUrls =
      previewUrlsRef.current


    return () => {
      previewUrls.forEach(
        (previewUrl) => {
          URL.revokeObjectURL(
            previewUrl
          )
        }
      )

      previewUrls.clear()
    }
  }, [])


  /* =====================================
     GROUP 6 — BEFORE UNLOAD GUARD
  ===================================== */

  /*
    작성 중인 데이터가 있을 경우:

    - 브라우저 새로고침
    - 탭 닫기
    - 창 닫기

    같은 "문서 이탈" 상황에서
    브라우저 기본 경고를 표시합니다.

    중요:
    최신 브라우저는 보안 / UX 정책 때문에
    개발자가 임의의 경고 문구를 지정할 수 없습니다.
  */

  useEffect(() => {
    if (!isDirty) {
      return undefined
    }


    const handleBeforeUnload = (
      event
    ) => {
      event.preventDefault()

      /*
        일부 브라우저 호환을 위해
        빈 문자열을 설정합니다.
      */

      event.returnValue = ''
    }


    window.addEventListener(
      'beforeunload',
      handleBeforeUnload
    )


    return () => {
      window.removeEventListener(
        'beforeunload',
        handleBeforeUnload
      )
    }
  }, [isDirty])


  /* =====================================
     IMAGE FILE SELECTION
  ===================================== */

  const handleFilesSelected = (
    selectedFiles
  ) => {
    const remainingSlots =
      MAX_IMAGE_COUNT -
      images.length


    if (
      remainingSlots <= 0
    ) {
      setImageNotice(
        `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 추가할 수 있습니다.`
      )

      return
    }


    const acceptedFiles =
      selectedFiles.slice(
        0,
        remainingSlots
      )


    if (
      selectedFiles.length >
      remainingSlots
    ) {
      setImageNotice(
        `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 등록할 수 있어 ${acceptedFiles.length}장만 추가되었습니다.`
      )
    } else {
      setImageNotice('')
    }


    const newImages =
      acceptedFiles.map(
        (file, index) => {
          const fallbackId = [
            'write-image',
            Date.now(),
            file.lastModified,
            index,
            file.name,
            Math.random()
              .toString(36)
              .slice(2),
          ].join('-')


          const imageId =
            (
              typeof crypto !==
                'undefined' &&
              typeof crypto.randomUUID ===
                'function'
            )
              ? `write-image-${crypto.randomUUID()}`
              : fallbackId


          /*
            브라우저 로컬 Preview URL.

            서버 URL이 아닙니다.
          */

          const previewUrl =
            URL.createObjectURL(
              file
            )


          previewUrlsRef.current.add(
            previewUrl
          )


          return {
            id: imageId,
            file,
            name: file.name,
            previewUrl,
          }
        }
      )


    if (
      newImages.length === 0
    ) {
      return
    }


    setImages(
      (currentImages) => [
        ...currentImages,
        ...newImages,
      ]
    )


    if (!activePreviewId) {
      setActivePreviewId(
        newImages[0].id
      )
    }


    /*
      기존 이미지 필수 오류가 있다면
      이미지 추가 즉시 제거.
    */

    if (
      validationErrors.images
    ) {
      setValidationErrors(
        (currentErrors) => ({
          ...currentErrors,
          images: '',
        })
      )
    }
  }


  /* =====================================
     IMAGE DELETE
  ===================================== */

  const handleRemoveImage = (
    imageId
  ) => {
    const imageToRemove =
      images.find(
        (image) =>
          image.id === imageId
      )


    if (!imageToRemove) {
      return
    }


    const remainingImages =
      images.filter(
        (image) =>
          image.id !== imageId
      )


    URL.revokeObjectURL(
      imageToRemove.previewUrl
    )

    previewUrlsRef.current.delete(
      imageToRemove.previewUrl
    )


    setImages(
      remainingImages
    )


    setActivePreviewId(
      (currentPreviewId) => {
        if (
          remainingImages.length === 0
        ) {
          return null
        }


        const previewStillExists =
          remainingImages.some(
            (image) =>
              image.id ===
              currentPreviewId
          )


        if (
          currentPreviewId ===
            imageId ||
          !previewStillExists
        ) {
          return remainingImages[0].id
        }


        return currentPreviewId
      }
    )


    setImageNotice('')
  }


  /* =====================================
     TAG NORMALIZATION
  ===================================== */

  const normalizeTag = (
    rawTag
  ) => {
    return rawTag
      .trim()
      .replace(/^#+/, '')
      .trim()
  }


  /* =====================================
     ADD TAG
  ===================================== */

  const addTag = (
    rawTag,
    options = {}
  ) => {
    const {
      source = 'input',
      clearInputOnSuccess = false,
    } = options


    if (
      source === 'input'
    ) {
      setRecommendedTagNotice('')
    } else {
      setInputTagNotice('')
    }


    const normalizedTag =
      normalizeTag(
        rawTag
      )


    if (!normalizedTag) {
      if (
        source === 'input'
      ) {
        setInputTagNotice(
          '태그를 입력해 주세요.'
        )
      }

      return false
    }


    const normalizedLower =
      normalizedTag.toLowerCase()


    const isDuplicate =
      tags.some(
        (tag) =>
          tag.toLowerCase() ===
          normalizedLower
      )


    if (isDuplicate) {
      if (
        source === 'input'
      ) {
        setInputTagNotice(
          '이미 추가된 태그입니다.'
        )
      } else {
        setRecommendedTagNotice('')
      }

      return false
    }


    if (
      tags.length >=
      MAX_TAG_COUNT
    ) {
      if (
        source === 'input'
      ) {
        setInputTagNotice(
          `해시태그는 최대 ${MAX_TAG_COUNT}개까지 추가할 수 있습니다.`
        )
      } else {
        setRecommendedTagNotice(
          `해시태그는 최대 ${MAX_TAG_COUNT}개까지 추가할 수 있습니다.`
        )
      }

      return false
    }


    setTags(
      (currentTags) => [
        ...currentTags,
        normalizedTag,
      ]
    )


    if (
      source === 'input'
    ) {
      setInputTagNotice('')
    } else {
      setRecommendedTagNotice('')
    }


    if (
      clearInputOnSuccess
    ) {
      setTagInput('')
    }


    return true
  }


  /* =====================================
     REMOVE TAG
  ===================================== */

  const removeTag = (
    tagToRemove
  ) => {
    setTags(
      (currentTags) =>
        currentTags.filter(
          (tag) =>
            tag !== tagToRemove
        )
    )

    setInputTagNotice('')
    setRecommendedTagNotice('')
  }


  /* =====================================
     TAG ENTER
  ===================================== */

  const handleTagKeyDown = (
    event
  ) => {
    if (
      event.key !== 'Enter'
    ) {
      return
    }


    event.preventDefault()


    addTag(
      tagInput,
      {
        source: 'input',
        clearInputOnSuccess:
          true,
      }
    )
  }


  /* =====================================
     ADD PRODUCT
  ===================================== */

  const addProduct = (
    product
  ) => {
    const isAlreadySelected =
      selectedProducts.some(
        (selectedProduct) =>
          selectedProduct.id ===
          product.id
      )


    if (
      isAlreadySelected
    ) {
      return
    }


    if (
      selectedProducts.length >=
      MAX_PRODUCT_COUNT
    ) {
      setProductNotice(
        `관련 상품은 최대 ${MAX_PRODUCT_COUNT}개까지 선택할 수 있습니다.`
      )

      return
    }


    setSelectedProducts(
      (currentProducts) => [
        ...currentProducts,
        product,
      ]
    )


    setProductNotice('')
  }


  /* =====================================
     REMOVE PRODUCT
  ===================================== */

  const removeProduct = (
    productId
  ) => {
    setSelectedProducts(
      (currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.id !==
            productId
        )
    )


    setProductNotice('')
  }


  /* =====================================
     CONTENT CHANGE
  ===================================== */

  const handleContentChange = (
    event
  ) => {
    const nextContent =
      event.target.value


    setContent(
      nextContent
    )


    /*
      실제 내용 입력 시
      기존 Validation 오류 제거.
    */

    if (
      validationErrors.content &&
      nextContent.trim().length > 0
    ) {
      setValidationErrors(
        (currentErrors) => ({
          ...currentErrors,
          content: '',
        })
      )
    }
  }


  /* =====================================
     VALIDATE POST
  ===================================== */

  const validatePost = () => {
    const nextErrors = {
      images: '',
      content: '',
    }


    if (
      images.length === 0
    ) {
      nextErrors.images =
        '이미지를 1장 이상 추가해 주세요.'
    }


    if (
      content.trim().length === 0
    ) {
      nextErrors.content =
        '내용을 입력해 주세요.'
    }


    setValidationErrors(
      nextErrors
    )


    const hasError =
      Boolean(
        nextErrors.images ||
        nextErrors.content
      )


    return {
      isValid:
        !hasError,

      errors:
        nextErrors,
    }
  }


  /* =====================================
     MOVE TO FIRST ERROR
  ===================================== */

  const moveToFirstError = (
    errors
  ) => {
    requestAnimationFrame(
      () => {
        /* IMAGE FIRST */

        if (
          errors.images
        ) {
          gallerySectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })

          return
        }


        /* CONTENT SECOND */

        if (
          errors.content
        ) {
          contentTextareaRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })


          requestAnimationFrame(
            () => {
              contentTextareaRef.current?.focus({
                preventScroll: true,
              })
            }
          )
        }
      }
    )
  }


  /* =====================================
     GROUP 6 — POST ID
  ===================================== */

  /*
    현재는 서버에서 발급하는 ID가 없으므로
    프론트엔드 시연용 ID를 생성합니다.

    crypto.randomUUID 지원 환경:
    community-post-xxxxxxxx...

    미지원 환경:
    timestamp 기반 fallback
  */

  const createPostId = () => {
    if (
      typeof crypto !==
        'undefined' &&
      typeof crypto.randomUUID ===
        'function'
    ) {
      return `community-post-${crypto.randomUUID()}`
    }


    return [
      'community-post',
      Date.now(),
      Math.random()
        .toString(36)
        .slice(2),
    ].join('-')
  }


  /* =====================================
     GROUP 6 — BUILD SUBMISSION
  ===================================== */

  /*
    지금까지 작성한 데이터를
    하나의 게시글 객체로 통합합니다.

    중요:
    image.previewUrl은 blob: URL이며
    브라우저 현재 세션의 Preview용입니다.

    따라서 이 객체는 현재 프론트엔드
    시연 / 데이터 계약 확인용이며,
    영구 저장 데이터로 취급하면 안 됩니다.
  */

  const buildSubmission = () => {
    const postId =
      createPostId()


    return {
      /*
        게시글 고유 ID
      */

      id:
        postId,


      /*
        현재 Schema 버전.

        이후 Main / Detail과 실제 공유 구조를
        만들 때 구조 변경 추적에 유용합니다.
      */

      schemaVersion:
        'community-write-v0.2',


      /*
        작성 본문.

        앞뒤 공백은 제거하고 저장합니다.
      */

      content:
        content.trim(),


      /*
        첫 이미지 = 대표 이미지.

        이미지 배열 순서 자체도 유지합니다.
      */

      images:
        images.map(
          (image, index) => ({
            id:
              image.id,

            name:
              image.name,

            previewUrl:
              image.previewUrl,

            isRepresentative:
              index === 0,

            order:
              index,
          })
        ),


      /*
        태그는 내부 저장 형태 그대로.

        # 문자는 렌더링 시 붙이는 구조입니다.
      */

      tags:
        [...tags],


      /*
        선택한 상품은 이후 Detail의
        Styled Products 등에 연결하기 쉽도록
        필요한 정보만 복사합니다.
      */

      products:
        selectedProducts.map(
          (product) => ({
            id:
              product.id,

            name:
              product.name,

            price:
              product.price,

            image:
              product.image,
          })
        ),


      /*
        현재 프론트엔드에서 생성한 시각.

        서버 시간이 아니므로
        최종 백엔드 도입 시 대체 대상입니다.
      */

      createdAt:
        new Date().toISOString(),
    }
  }


  /* =====================================
     GROUP 6 — SUBMIT
  ===================================== */

  const handleSubmit = () => {
    /*
      1. GROUP 5 Validation
    */

    const {
      isValid,
      errors,
    } = validatePost()


    if (!isValid) {
      moveToFirstError(
        errors
      )

      return
    }


    /*
      2. GROUP 6 submission 객체 생성
    */

    const submissionData =
      buildSubmission()


    /*
      실제 DB 저장이 아닙니다.

      QA에서 데이터 구조를 확인하기 위해
      state와 console에만 남깁니다.
    */

    setLastSubmission(
      submissionData
    )


    console.log(
      '[CommunityWrite] Submission created:',
      submissionData
    )


    /*
      여기서 /community로 이동하지 않습니다.

      이유:
      아직 Main / Detail에 새 게시글을
      실제 반영하는 공유 저장소가 없기 때문입니다.

      서버 저장 성공처럼 보이는 Toast도
      아직 표시하지 않습니다.
    */
  }


  /* =====================================
     GROUP 6 — CANCEL
  ===================================== */

  const handleCancel = () => {
    /*
      작성한 실제 데이터가 없다면
      별도 경고 없이 Main으로 이동.
    */

    if (!isDirty) {
      navigate(
        '/community'
      )

      return
    }


    /*
      현재 GROUP 6에서는
      신규 Modal 컴포넌트를 추가하지 않고
      브라우저 confirm을 사용합니다.

      한 달 팀 프로젝트 범위에서
      가장 안전하고 구현 비용이 낮습니다.
    */

    const shouldLeave =
      window.confirm(
        '작성 중인 내용이 있습니다.\n페이지를 나가면 작성 내용이 사라집니다.\n\n나가시겠습니까?'
      )


    if (!shouldLeave) {
      return
    }


    navigate(
      '/community'
    )
  }


  return (
    <main
      className="mooday-write"
      id="community-write"
    >

      <div className="mooday-write__inner">


        {/* =================================
            MAIN LAYOUT
        ================================= */}

        <div className="mooday-write__layout">


          {/* =================================
              LEFT — GALLERY
          ================================= */}

          <WriteGallery
            images={
              images
            }
            activePreviewId={
              activePreviewId
            }
            imageNotice={
              imageNotice
            }
            validationError={
              validationErrors.images
            }
            galleryRef={
              gallerySectionRef
            }
            onPreviewChange={
              setActivePreviewId
            }
            onFilesSelected={
              handleFilesSelected
            }
            onRemoveImage={
              handleRemoveImage
            }
          />


          {/* =================================
              RIGHT — FORM
          ================================= */}

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
                ref={
                  contentTextareaRef
                }
                id="mooday-write-content"
                className={
                  'mooday-write-form__textarea' +
                  (
                    validationErrors.content
                      ? ' mooday-write-form__textarea--error'
                      : ''
                  )
                }
                placeholder="오늘 입은 옷이나 좋아하는 스타일을 자유롭게 남겨주세요."
                value={
                  content
                }
                maxLength={
                  2000
                }
                onChange={
                  handleContentChange
                }
                aria-invalid={
                  Boolean(
                    validationErrors.content
                  )
                }
                aria-describedby={
                  validationErrors.content
                    ? 'mooday-write-content-error'
                    : undefined
                }
              />


              {validationErrors.content && (
                <p
                  id="mooday-write-content-error"
                  className="mooday-write-validation__message"
                  role="alert"
                >
                  {validationErrors.content}
                </p>
              )}

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
                value={
                  tagInput
                }
                maxLength={
                  30
                }
                onChange={(event) => {
                  setTagInput(
                    event.target.value
                  )

                  setInputTagNotice('')
                  setRecommendedTagNotice('')
                }}
                onKeyDown={
                  handleTagKeyDown
                }
              />


              {inputTagNotice && (
                <p
                  className="
                    mooday-write-tags__notice
                    mooday-write-tags__notice--input
                  "
                  role="status"
                  aria-live="polite"
                >
                  {inputTagNotice}
                </p>
              )}


              {/* SELECTED TAGS */}

              <div className="mooday-write-form__subheading">

                <h3>
                  선택된 태그

                  <span>
                    ({tags.length})
                  </span>
                </h3>


                <span>
                  최대 {MAX_TAG_COUNT}개까지 추가할 수 있습니다.
                </span>

              </div>


              {tags.length === 0 ? (
                <div className="mooday-write-tags__empty">
                  선택된 해시태그가 여기에 표시됩니다.
                </div>
              ) : (
                <div className="mooday-write-tags__selected">

                  {tags.map(
                    (tag) => (
                      <div
                        key={
                          tag
                        }
                        className="mooday-write-tags__selected-chip"
                      >

                        <span>
                          #{tag}
                        </span>


                        <button
                          type="button"
                          className="mooday-write-tags__remove"
                          onClick={() => {
                            removeTag(
                              tag
                            )
                          }}
                          aria-label={`#${tag} 태그 삭제`}
                          title="태그 삭제"
                        >
                          ×
                        </button>

                      </div>
                    )
                  )}

                </div>
              )}


              {/* RECOMMENDED TAGS */}

              <div
                className="
                  mooday-write-form__subheading
                  mooday-write-form__subheading--recommended
                "
              >
                <h3>
                  추천 태그
                </h3>
              </div>


              <div className="mooday-write-tags__recommended">

                {recommendedTags.map(
                  (tag) => {
                    const isSelected =
                      tags.some(
                        (
                          selectedTag
                        ) =>
                          selectedTag.toLowerCase() ===
                          tag.toLowerCase()
                      )


                    return (
                      <button
                        key={
                          tag
                        }
                        type="button"
                        className={
                          'mooday-write-tags__chip' +
                          (
                            isSelected
                              ? ' mooday-write-tags__chip--selected'
                              : ''
                          )
                        }
                        onClick={() => {
                          addTag(
                            tag,
                            {
                              source:
                                'recommended',
                            }
                          )
                        }}
                        aria-pressed={
                          isSelected
                        }
                      >
                        #{tag}
                      </button>
                    )
                  }
                )}

              </div>


              {recommendedTagNotice && (
                <p
                  className="
                    mooday-write-tags__notice
                    mooday-write-tags__notice--recommended
                  "
                  role="status"
                  aria-live="polite"
                >
                  {recommendedTagNotice}
                </p>
              )}

            </section>


            {/* =================================
                PRODUCTS
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
                  최대 {MAX_PRODUCT_COUNT}개까지 추가할 수 있습니다.
                </span>

              </div>


              {/* SEARCH */}

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
                  value={
                    productQuery
                  }
                  onChange={(event) => {
                    setProductQuery(
                      event.target.value
                    )

                    setProductNotice('')
                  }}
                />


                {productQuery && (
                  <button
                    type="button"
                    className="mooday-write-product-search__clear"
                    onClick={
                      clearProductSearch
                    }
                    aria-label="상품 검색어 지우기"
                    title="검색어 지우기"
                  >
                    ×
                  </button>
                )}

              </div>


              {/* RESULTS */}

              {filteredProducts.length > 0 ? (
                <div className="mooday-write-products__results">

                  {filteredProducts.map(
                    (product) => {
                      const isSelected =
                        selectedProducts.some(
                          (
                            selectedProduct
                          ) =>
                            selectedProduct.id ===
                            product.id
                        )


                      return (
                        <WriteProductResult
                          key={
                            product.id
                          }
                          product={
                            product
                          }
                          isSelected={
                            isSelected
                          }
                          onAdd={
                            addProduct
                          }
                        />
                      )
                    }
                  )}

                </div>
              ) : (
                <div
                  className="mooday-write-products__empty-result"
                  role="status"
                >
                  검색 결과가 없습니다.
                </div>
              )}


              {productNotice && (
                <p
                  className="mooday-write-products__notice"
                  role="status"
                  aria-live="polite"
                >
                  {productNotice}
                </p>
              )}


              {/* SELECTED PRODUCTS */}

              <div
                className="
                  mooday-write-form__subheading
                  mooday-write-form__subheading--selected-products
                "
              >

                <h3>

                  선택된 상품

                  <span>
                    (
                    {selectedProducts.length}
                    /
                    {MAX_PRODUCT_COUNT}
                    )
                  </span>

                </h3>

              </div>


              {selectedProducts.length === 0 ? (
                <div className="mooday-write-products__selected-empty">
                  선택된 상품이 없습니다.
                </div>
              ) : (
                <div className="mooday-write-products__selected">

                  {selectedProducts.map(
                    (product) => (
                      <WriteSelectedProduct
                        key={
                          product.id
                        }
                        product={
                          product
                        }
                        onRemove={
                          removeProduct
                        }
                      />
                    )
                  )}

                </div>
              )}

            </section>

          </div>

        </div>


        {/* =================================
            GROUP 6 — ACTION BUTTONS
        ================================= */}

        <div className="mooday-write__actions">

          {/*
            기존 <a href="/community"> 취소 링크를
            button으로 변경했습니다.

            이유:
            navigate 전에 이탈 경고를 실행해야 하기 때문입니다.
          */}

          <button
            type="button"
            className="
              mooday-write__button
              mooday-write__button--cancel
            "
            onClick={
              handleCancel
            }
          >
            취소
          </button>


          <button
            type="button"
            className="
              mooday-write__button
              mooday-write__button--submit
            "
            onClick={
              handleSubmit
            }
          >
            게시하기
          </button>

        </div>


        {/* =================================
            GROUP 6 — DEBUG NOTE

            화면에는 표시하지 않습니다.

            lastSubmission은 향후
            Main / Detail 연동 전
            개발 과정에서 확인하기 위한 state입니다.

            필요 시 React DevTools 또는
            console에서 구조를 확인합니다.
        ================================= */}

        {lastSubmission && null}

      </div>

    </main>
  )
}