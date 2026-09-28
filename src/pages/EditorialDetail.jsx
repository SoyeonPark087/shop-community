import { editorials } from '../data/editorials'
import '../styles/editorial-detail.css'

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
        <a href="/editorial">Editorial로 돌아가기</a>
      </main>
    )
  }

  const detailImages = editorial.detailImages || []
  const paragraphs = editorial.paragraphs || []
  const shopProducts = editorial.shopProducts || []

  // editorials.js의 해당 에디토리얼 안에 있는
  // relatedStories 데이터를 가져옵니다.
  const relatedStories = editorial.relatedStories || []

  return (
    <main className="editorial-detail">
      {/* 상단 기사 영역 */}
      <section className="editorial-detail__article">
        {/* 왼쪽 제목 영역 */}
        <aside className="editorial-detail__intro">
          <p className="editorial-detail__label">
            EDITORIAL
          </p>

          <h1>
            {editorial.koreanTitle || editorial.title}
          </h1>

          {editorial.subtitle && (
            <p className="editorial-detail__subtitle">
              {editorial.subtitle}
            </p>
          )}

          <span className="editorial-detail__line" />

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
            />
          )}

          {paragraphs[0] && (
            <p>{paragraphs[0]}</p>
          )}

          {detailImages[1] && (
            <img
              src={detailImages[1]}
              alt={`${editorial.title} 이미지 2`}
            />
          )}

          {paragraphs[1] && (
            <p>{paragraphs[1]}</p>
          )}

          {detailImages[2] && (
            <img
              src={detailImages[2]}
              alt={`${editorial.title} 이미지 3`}
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
            />
          ))}

          {/* 문단이 3개보다 많을 때 */}
          {paragraphs.slice(3).map((paragraph, index) => (
            <p key={`${paragraph}-${index}`}>
              {paragraph}
            </p>
          ))}
        </article>
      </section>

      {/* 상품 연결 영역 */}
      {shopProducts.length > 0 && (
        <section className="editorial-detail__shop">
          <h2>Shop the Story</h2>

          <div className="editorial-detail__products">
            {shopProducts.map((product) => (
              <a
                className="editorial-detail__product"
                href={`/shop/${product.id}`}
                key={product.id}
              >
                <div className="editorial-detail__product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <strong>{product.name}</strong>

                <span>
                  ₩ {Number(product.price).toLocaleString()}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 관련 에디토리얼 영역 */}
      {relatedStories.length > 0 && (
        <section className="editorial-detail__related">
          <div className="editorial-detail__section-heading">
            <h2>Related Stories</h2>

            <a href="/editorial">
              View All →
            </a>
          </div>

          <div className="editorial-detail__related-grid">
            {relatedStories.map((story) => (
              <a
                className="editorial-detail__related-card"
                href={`/editorial/${story.id}`}
                key={story.id}
              >
                <div className="editorial-detail__related-image">
                  <img
                    src={story.image}
                    alt={story.title}
                  />
                </div>

                <strong>{story.title}</strong>

                <span>{story.description}</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default EditorialDetail