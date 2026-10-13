import { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { communityPosts } from '../../data/Community.js'

import './CommunityWrite.css'

import { products } from '../../data/Products.js'

const MAX_IMAGE_COUNT = 10

const VISIBLE_THUMBNAIL_COUNT = 4

const MAX_TAG_COUNT = 10

const MAX_PRODUCT_COUNT = 5

const recommendedTags = [...new Set(communityPosts.flatMap(post => post.tags))]

function WriteImagePlaceholder({ className = '', children }) {
  return (
    <div
      className={`mooday-write-image-placeholder ${className}`}
    >
      {children}
    </div>
  )
}

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
  const fileInputRef = useRef(null)

  const activeImage =
    images.find(
      (image) =>
        image.id === activePreviewId
    ) ||
    images[0] ||
    null

  const representativeImage = images[0] || null

  const isRepresentativePreview =
    activeImage &&
    representativeImage &&
    activeImage.id ===
      representativeImage.id

  const isImageLimitReached = images.length >= MAX_IMAGE_COUNT

  const hasScrollableThumbnails = images.length > VISIBLE_THUMBNAIL_COUNT

  const handleAddButtonClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || [])

    if (selectedFiles.length === 0) {
      return
    }

    onFilesSelected(selectedFiles)

    event.target.value = ''
  }

  return (
    <section ref={galleryRef} className="mooday-write-gallery" aria-label="게시글 이미지">

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
              src={activeImage.previewUrl}
              alt={`${activeImage.name} 미리보기`}
            />

            {isRepresentativePreview && (
              <span className="mooday-write-gallery__representative">
                대표 이미지
              </span>
            )}
          </>
        ) : (
          <WriteImagePlaceholder className="mooday-write-gallery__main-placeholder">

            <div className="mooday-write-gallery__empty-content">

              <span className="mooday-write-gallery__empty-icon" aria-hidden="true">
                +
              </span>

              <p>
                스타일 사진을 추가해 주세요.
              </p>

              <span>
                이미지 비율 4:5 · 최대 {MAX_IMAGE_COUNT}장
              </span>

            </div>

          </WriteImagePlaceholder>
        )}

      </div>

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
              const isActive = image.id === activeImage?.id

              return (
                <div key={image.id} className="mooday-write-gallery__thumbnail-item">

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
                      onPreviewChange(image.id)
                    }}
                    aria-label={
                      index === 0
                        ? `대표 이미지 ${index + 1} 미리보기`
                        : `이미지 ${index + 1} 미리보기`
                    }
                    aria-pressed={isActive}
                  >
                    <img src={image.previewUrl} alt="" />
                  </button>

                  <button
                    type="button"
                    className="mooday-write-gallery__thumbnail-delete"
                    onClick={() => {
                      onRemoveImage(image.id)
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

        <input
          ref={fileInputRef}
          className="mooday-write-gallery__file-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          tabIndex={-1}
          aria-hidden="true"
        />

        {!isImageLimitReached && (
          <button
            type="button"
            className="mooday-write-gallery__add"
            onClick={handleAddButtonClick}
            aria-label="이미지 파일 추가"
          >

            <span className="mooday-write-gallery__add-icon" aria-hidden="true">
              +
            </span>

            <span>
              사진 추가
            </span>

          </button>
        )}

      </div>

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

function WriteProductImage({ image, name }) {
  const [imageError, setImageError] = useState(false)

  const hasImage = typeof image === 'string' && image.trim() !== '' && !imageError

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

function WriteProductResult({ product, isSelected, onAdd }) {
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

      <WriteProductImage image={product.image} name={product.name} />

      <div className="mooday-write-product-result__info">
        <strong>
          {product.name}
        </strong>

        <span>
          ₩{product.price.toLocaleString()}
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
        disabled={isSelected}
        aria-label={
          isSelected
            ? `${product.name} 선택됨`
            : `${product.name} 선택`
        }
        title={isSelected ? '선택된 상품' : '상품 추가'}
      >
        {isSelected ? '✓' : '+'}
      </button>

    </div>
  )
}

function WriteSelectedProduct({ product, onRemove }) {
  return (
    <div className="mooday-write-selected-product">

      <WriteProductImage image={product.image} name={product.name} />

      <div className="mooday-write-selected-product__info">
        <strong>
          {product.name}
        </strong>

        <span>
          ₩{product.price.toLocaleString()}
        </span>
      </div>

      <button
        type="button"
        className="mooday-write-selected-product__remove"
        onClick={() => {
          onRemove(product.id)
        }}
        aria-label={`${product.name} 선택 해제`}
        title="선택 상품 제거"
      >
        ×
      </button>

    </div>
  )
}

export default function CommunityWrite() {

  const navigate = useNavigate()

  const [content, setContent] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [productQuery, setProductQuery] = useState('')

  const gallerySectionRef = useRef(null)

  const contentTextareaRef = useRef(null)

  const [images, setImages] = useState([])
  const [activePreviewId, setActivePreviewId] = useState(null)
  const [imageNotice, setImageNotice] = useState('')
  const [tags, setTags] = useState([])
  const [inputTagNotice, setInputTagNotice] = useState('')
  const [recommendedTagNotice, setRecommendedTagNotice] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [productNotice, setProductNotice] = useState('')
  const [validationErrors, setValidationErrors] = useState({ images: '', content: '' })
  const [lastSubmission, setLastSubmission] = useState(null)

  const isDirty =
    images.length > 0 ||
    content.trim().length > 0 ||
    tags.length > 0 ||
    selectedProducts.length > 0

  const normalizedProductQuery = productQuery.trim().toLowerCase()

  const filteredProducts =
    normalizedProductQuery
      ? products.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(normalizedProductQuery)
        )
      : []

  const clearProductSearch = () => {
    setProductQuery('');
    setProductNotice('');
  }

  const previewUrlsRef = useRef(new Set())

  useEffect(() => {
    const previewUrls = previewUrlsRef.current

    // 파일 미리보기 URL은 화면을 떠날 때 해제합니다.
    return () => {
      previewUrls.forEach((previewUrl) => {
        URL.revokeObjectURL(previewUrl);
      })

      previewUrls.clear()
    }
  }, [])

  useEffect(() => {
    if (!isDirty) {
      return undefined
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [isDirty])

  const handleFilesSelected = (selectedFiles) => {
    const remainingSlots = MAX_IMAGE_COUNT - images.length

    if (remainingSlots <= 0) {
      setImageNotice(
        `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 추가할 수 있습니다.`
      )

      return
    }

    const acceptedFiles = selectedFiles.slice(0, remainingSlots)

    if (selectedFiles.length > remainingSlots) {
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

          const previewUrl = URL.createObjectURL(file)

          previewUrlsRef.current.add(previewUrl)

          return { id: imageId, file, name: file.name, previewUrl }
        }
      )

    if (newImages.length === 0) {
      return
    }

    setImages(currentImages => [...currentImages, ...newImages])

    if (!activePreviewId) {
      setActivePreviewId(newImages[0].id)
    }

    if (validationErrors.images) {
      setValidationErrors(currentErrors => ({ ...currentErrors, images: '' }))
    }
  }

  const handleRemoveImage = (imageId) => {
    const imageToRemove = images.find(image => image.id === imageId)

    if (!imageToRemove) {
      return
    }

    const remainingImages = images.filter(image => image.id !== imageId)

    URL.revokeObjectURL(imageToRemove.previewUrl)

    previewUrlsRef.current.delete(imageToRemove.previewUrl)

    setImages(remainingImages)

    setActivePreviewId(
      (currentPreviewId) => {
        if (remainingImages.length === 0) {
          return null
        }

        const previewStillExists = remainingImages.some(image => image.id === currentPreviewId)

        if (currentPreviewId === imageId || !previewStillExists) {
          return remainingImages[0].id
        }

        return currentPreviewId
      }
    )

    setImageNotice('')
  }

  const addTag = (rawTag, { source = 'input', clearInputOnSuccess = false } = {}) => {
    const isInput = source === 'input'
    const setNotice = isInput ? setInputTagNotice : setRecommendedTagNotice
    const clearOtherNotice = isInput ? setRecommendedTagNotice : setInputTagNotice
    clearOtherNotice('')

    const normalizedTag = rawTag.trim().replace(/^#+/, '').trim()
    if (!normalizedTag) {
      if (isInput) setNotice('태그를 입력해 주세요.')
      return false
    }
    if (tags.some(tag => tag.toLowerCase() === normalizedTag.toLowerCase())) {
      setNotice(isInput ? '이미 추가된 태그입니다.' : '')
      return false
    }
    if (tags.length >= MAX_TAG_COUNT) {
      setNotice(`해시태그는 최대 ${MAX_TAG_COUNT}개까지 추가할 수 있습니다.`)
      return false
    }
    setTags((currentTags) => [...currentTags, normalizedTag])
    setNotice('')
    if (clearInputOnSuccess) setTagInput('')
    return true
  }

  const removeTag = (tagToRemove) => {
    setTags(currentTags => currentTags.filter(tag => tag !== tagToRemove))

    setInputTagNotice('')
    setRecommendedTagNotice('')
  }

  const handleTagKeyDown = (event) => {
    if (event.key !== 'Enter') {
      return
    }

    event.preventDefault()

    addTag(tagInput, { source: 'input', clearInputOnSuccess: true })
  }

  const addProduct = (product) => {
    const isAlreadySelected =
      selectedProducts.some(
        (selectedProduct) =>
          selectedProduct.id ===
          product.id
      )

    if (isAlreadySelected) {
      return
    }

    if (selectedProducts.length >= MAX_PRODUCT_COUNT) {
      setProductNotice(
        `관련 상품은 최대 ${MAX_PRODUCT_COUNT}개까지 선택할 수 있습니다.`
      )

      return
    }

    setSelectedProducts(currentProducts => [...currentProducts, product])

    setProductNotice('')
  }

  const removeProduct = (productId) => {
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

  const handleContentChange = (event) => {
    const nextContent = event.target.value

    setContent(nextContent)

    if (validationErrors.content && nextContent.trim().length > 0) {
      setValidationErrors(currentErrors => ({ ...currentErrors, content: '' }))
    }
  }

  const validatePost = () => {
    const nextErrors = { images: '', content: '' }

    if (images.length === 0) {
      nextErrors.images = '이미지를 1장 이상 추가해 주세요.'
    }

    if (content.trim().length === 0) {
      nextErrors.content = '내용을 입력해 주세요.'
    }

    setValidationErrors(nextErrors)

    const hasError = Boolean(nextErrors.images || nextErrors.content)

    return { isValid: !hasError, errors: nextErrors }
  }

  const moveToFirstError = (errors) => {
    requestAnimationFrame(
      () => {

        if (errors.images) {
          gallerySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

          return
        }

        if (errors.content) {
          contentTextareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

          requestAnimationFrame(
            () => {
              contentTextareaRef.current?.focus({ preventScroll: true })
            }
          )
        }
      }
    )
  }

  const createPostId = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return `community-post-${crypto.randomUUID()}`
    }

    return ['community-post', Date.now(), Math.random().toString(36).slice(2)].join('-')
  }

  const buildSubmission = () => {
    const postId = createPostId()

    return {

      id: postId,

      schemaVersion: 'community-write-v0.2',

      content: content.trim(),

      images: images.map(
          (image, index) => ({
            id: image.id,

            name: image.name,

            previewUrl: image.previewUrl,

            isRepresentative: index === 0,

            order: index,
          })
        ),

      tags: [...tags],

      products: selectedProducts.map(
          (product) => ({
            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,
          })
        ),

      createdAt: new Date().toISOString(),
    }
  }

  const handleSubmit = () => {

    const { isValid, errors } = validatePost()

    if (!isValid) {
      moveToFirstError(errors)

      return
    }

    // 서버 저장은 연결되지 않았으며 작성 데이터만 미리 확인합니다.
    setLastSubmission(buildSubmission())

  }

  const handleCancel = () => {
    if (!isDirty || window.confirm('작성 중인 내용이 있습니다.\n페이지를 나가면 작성 내용이 사라집니다.\n\n나가시겠습니까?')) {
      navigate('/community')
    }
  }

  return (
    <main className="mooday-write" id="community-write">

      <div className="mooday-write__inner">

        <div className="mooday-write__layout">

          <WriteGallery
            images={images}
            activePreviewId={activePreviewId}
            imageNotice={imageNotice}
            validationError={validationErrors.images}
            galleryRef={gallerySectionRef}
            onPreviewChange={setActivePreviewId}
            onFilesSelected={handleFilesSelected}
            onRemoveImage={handleRemoveImage}
          />

          <div className="mooday-write-form">

            <section className="mooday-write-form__section">

              <div className="mooday-write-form__heading">

                <label htmlFor="mooday-write-content">

                  내용

                  <span className="mooday-write-form__required" aria-label="필수">
                    *
                  </span>

                </label>

                <span className="mooday-write-form__counter">
                  {content.length}/2000
                </span>

              </div>

              <textarea
                ref={contentTextareaRef}
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
                value={content}
                maxLength={2000}
                onChange={handleContentChange}
                aria-invalid={Boolean(validationErrors.content)}
                aria-describedby={
                  validationErrors.content
                    ? 'mooday-write-content-error'
                    : undefined
                }
              />

              {validationErrors.content && (
                <p id="mooday-write-content-error" className="mooday-write-validation__message" role="alert">
                  {validationErrors.content}
                </p>
              )}

            </section>

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

                  setInputTagNotice('')
                  setRecommendedTagNotice('')
                }}
                onKeyDown={handleTagKeyDown}
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

              {tags.length > 0 && (
                <>
                  <div className="mooday-write-form__subheading">
                    <h3>
                      선택된 태그
                      <span>
                        {tags.length}/{MAX_TAG_COUNT}
                      </span>
                    </h3>
                  </div>

                  <div className="mooday-write-tags__selected">
                    {tags.map((tag) => (
                      <div key={tag} className="mooday-write-tags__selected-chip">
                        <span>#{tag}</span>

                        <button
                          type="button"
                          className="mooday-write-tags__remove"
                          onClick={() => {
                            removeTag(tag)
                          }}
                          aria-label={`#${tag} 태그 삭제`}
                          title="태그 삭제"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div
                className="
                  mooday-write-form__subheading
                  mooday-write-form__subheading--recommended
                "
              >
                <h3>추천 태그</h3>
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
                        key={tag}
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
                          addTag(tag, { source: 'recommended' })
                        }}
                        aria-pressed={isSelected}
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
                    선택
                  </span>
                </label>
              </div>

              <div className="mooday-write-product-search">
                <input
                  id="mooday-write-product-search"
                  type="search"
                  placeholder="상품명을 검색하여 추가할 수 있습니다."
                  value={productQuery}
                  onChange={(event) => {
                    setProductQuery(event.target.value)
                    setProductNotice('')
                  }}
                />

                {productQuery && (
                  <button
                    type="button"
                    className="mooday-write-product-search__clear"
                    onClick={clearProductSearch}
                    aria-label="상품 검색어 지우기"
                    title="검색어 지우기"
                  >
                    ×
                  </button>
                )}
              </div>

              {normalizedProductQuery && (
                filteredProducts.length > 0 ? (
                  <div className="mooday-write-products__results">
                    {filteredProducts.map((product) => {
                      const isSelected =
                        selectedProducts.some(
                          (selectedProduct) =>
                            selectedProduct.id === product.id
                        )

                      return (
                        <WriteProductResult key={product.id} product={product} isSelected={isSelected} onAdd={addProduct} />
                      )
                    })}
                  </div>
                ) : (
                  <div className="mooday-write-products__empty-result" role="status">
                    검색 결과가 없습니다.
                  </div>
                )
              )}

              {productNotice && (
                <p className="mooday-write-products__notice" role="status" aria-live="polite">
                  {productNotice}
                </p>
              )}

              {selectedProducts.length > 0 && (
                <>
                  <div
                    className="
                      mooday-write-form__subheading
                      mooday-write-form__subheading--selected-products
                    "
                  >
                    <h3>
                      선택된 상품

                      <span>
                        {selectedProducts.length}/{MAX_PRODUCT_COUNT}
                      </span>
                    </h3>
                  </div>

                  <div className="mooday-write-products__selected">
                    {selectedProducts.map((product) => (
                      <WriteSelectedProduct key={product.id} product={product} onRemove={removeProduct} />
                    ))}
                  </div>
                </>
              )}

            </section>

            </div>

            </div>

        <div className="mooday-write__actions">

          <button
            type="button"
            className="
              mooday-write__button
              mooday-write__button--cancel
            "
            onClick={handleCancel}
          >
            취소
          </button>

          <button
            type="button"
            className="
              mooday-write__button
              mooday-write__button--submit
            "
            onClick={handleSubmit}
          >
            게시하기
          </button>

        </div>

        {lastSubmission && (
          <p className="mooday-write__submit-notice" role="status" aria-live="polite">
            게시글 데이터가 준비되었습니다.
            현재는 데모 모드이며 실제 게시글로 저장되지는 않습니다.
          </p>
        )}

      </div>

    </main>
  )
}
