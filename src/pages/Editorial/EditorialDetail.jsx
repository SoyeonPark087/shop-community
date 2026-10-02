import { editorials } from '../../data/Editorial'
import './EditorialDetail.css'

function EditorialDetail() {
  const editorialId = window.location.pathname
    .split('/')
    .filter(Boolean)
    .pop()

  const editorial = editorials.find(
    (item) => String(item.id) === String(editorialId)
  )

  if (!editorial) {
    return (
      <main className="editorial-detail editorial-detail--empty">
        <h1>에디토리얼을 찾을 수 없습니다.</h1>

        <a href="/editorial">
          Editorial로 돌아가기
        </a>
      </main>
    )
  }

  const detailImages = editorial.detailImages || []
  const paragraphs = editorial.paragraphs || []
  const shopProducts = editorial.shopProducts || []
  const relatedStories = editorial.relatedStories || []

  return (
    <main className="editorial-detail">
      {/* 상단 기사 영역 */}
      <section
        className="editorial-detail__article"
        aria-labelledby="editorial-detail-title"
      >
        {/* 왼쪽 제목 영역 */}
        <aside className="editorial-detail__intro">
          <p className="editorial-detail__label">
            EDITORIAL
          </p>

          <h1 id="editorial-detail-title">
            {editorial.koreanTitle || editorial.title}
          </h1>

          {editorial.subtitle && (
            <p className="editorial-detail__subtitle">
              {editorial.subtitle}
            </p>
          )}

          <span
            className="editorial-detail__line"
            aria-hidden="true"
          />

          <div className="editorial-detail__meta">
            <span>
              by {editorial.author || 'MOODAY'}
            </span>

            <span>
              {editorial.date || '2026. 09. 09'}
            </span>
          </div>
        </aside>

        {/* 오른쪽 본문 영역 */}
        <article className="editorial-detail__body">
          {detailImages[0] && (
            <img
              className="editorial-detail__main-image"
              src={detailImages[0]}
              alt={`${editorial.title} 이미지 1`}
              decoding="async"
            />
          )}

          {paragraphs[0] && (
            <p>{paragraphs[0]}</p>
          )}

          {detailImages[1] && (
            <img
              src={detailImages[1]}
              alt={`${editorial.title} 이미지 2`}
              loading="lazy"
              decoding="async"
            />
          )}

          {paragraphs[1] && (
            <p>{paragraphs[1]}</p>
          )}

          {detailImages[2] && (
            <img
              src={detailImages[2]}
              alt={`${editorial.title} 이미지 3`}
              loading="lazy"
              decoding="async"
            />
          )}

          {paragraphs[2] && (
            <p>{paragraphs[2]}</p>
          )}

          {/* 이미지가 3개보다 많을 때 */}
          {detailImages.slice(3).map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={`${editorial.title} 이미지 ${index + 4}`}
              loading="lazy"
              decoding="async"
            />
          ))}

          {/* 문단이 3개보다 많을 때 */}
          {paragraphs.slice(3).map((paragraph, index) => (
            <p key={`paragraph-${index}`}>
              {paragraph}
            </p>
          ))}
        </article>
      </section>

      {/* Shop the Story */}
      {shopProducts.length > 0 && (
        <section
          className="editorial-detail__shop"
          aria-labelledby="shop-story-title"
        >
          <h2 id="shop-story-title">
            Shop the Story
          </h2>

          <div className="editorial-detail__products">
            {shopProducts.map((product) => (
              <article
                className="editorial-detail__product"
                key={product.id}
              >
                <div className="editorial-detail__product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <strong>{product.name}</strong>

                <span>
                  ₩ {Number(product.price).toLocaleString()}
                </span>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section
          className="editorial-detail__related"
          aria-labelledby="related-stories-title"
        >
          <div className="editorial-detail__section-heading">
            <h2 id="related-stories-title">
              Related Stories
            </h2>
          </div>

          <div className="editorial-detail__related-grid">
            {relatedStories.map((story) => (
              <article
                className="editorial-detail__related-card"
                key={story.id}
              >
                <div className="editorial-detail__related-image">
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <strong>{story.title}</strong>

                <span>{story.description}</span>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default EditorialDetail