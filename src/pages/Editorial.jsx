import { editorials, featuredEditorial } from '../data/editorials'
import '../styles/editorial.css'

function Editorial() {
  const handleEditorialClick = (id) => {
    window.location.href = `/editorial/${id}`
  }

  return (
    <main className="editorial-page">
      <div className="editorial-main">
        {/* 상단 히어로 영역 */}
        <section className="editorial-hero">
          {/* 사진 콜라주 */}
          <div className="editorial-hero__collage">
            {/* 작은 사진 4개 */}
            <div className="editorial-hero__small-grid">
              <img
                src="/images/editorial01-detail01.jpg"
                alt="햇살 아래 인물"
              />

              <img
                src="/images/editorial01-detail02.png"
                alt="침구와 책"
              />

              <img
                src="/images/editorial01-detail03.png"
                alt="빛을 받은 식물"
              />

              <img
                src="/images/editorial01-detail04.png"
                alt="바닷가를 걷는 모습"
              />
            </div>

            {/* 대표사진 */}
            <button
              className="editorial-hero__main-image"
              type="button"
              onClick={() =>
                handleEditorialClick(featuredEditorial.id)
              }
              aria-label={`${featuredEditorial.title} 상세 보기`}
            >
              <img
                src={featuredEditorial.heroImage}
                alt={featuredEditorial.title}
              />
            </button>

            {/* Weekend Calm 사진 */}
            <a className="editorial-hero__weekend" href="/shop">
              <img
                src="/images/editorial-weekend.jpg"
                alt="잔잔한 바다 풍경"
              />

              <span className="editorial-hero__weekend-text">
                <strong>Weekend Calm</strong>
                <small>Unwind in natural tones.</small>
                <span>Shop&nbsp;&nbsp;→</span>
              </span>
            </a>
          </div>

          {/* 오른쪽 소개 영역 */}
          <div className="editorial-hero__content">
            <p className="editorial-hero__label">
              EDITORIAL
            </p>

            <h1>
              The Softer
              <br />
              Rhythm
            </h1>

            <p className="editorial-hero__description">
              In a fast-moving world,
              <br />
              we choose a slower rhythm.
              <br />
              A more mindful way of living
              <br />
              through clothing, movement, and every moment.
            </p>

            <button
              className="editorial-hero__button"
              type="button"
              onClick={() =>
                handleEditorialClick(featuredEditorial.id)
              }
            >
              Read Story
            </button>

            <div className="editorial-hero__pagination">
              <span>01</span>
              <span>/</span>
              <span>08</span>

              <button
                type="button"
                aria-label="이전 에디토리얼"
              >
                ‹
              </button>

              <button
                type="button"
                aria-label="다음 에디토리얼"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        {/* 에디토리얼 목록 */}
        <section
          className="editorial-grid"
          aria-label="에디토리얼 목록"
        >
          {editorials.slice(1).map((editorial) => (
            <article
              className="editorial-card"
              key={editorial.id}
            >
              <button
                className="editorial-card__image"
                type="button"
                onClick={() =>
                  handleEditorialClick(editorial.id)
                }
                aria-label={`${editorial.title} 상세 보기`}
              >
                <img
                  src={editorial.image}
                  alt={editorial.title}
                />
              </button>

              <button
                className="editorial-card__text"
                type="button"
                onClick={() =>
                  handleEditorialClick(editorial.id)
                }
              >
                <strong>{editorial.title}</strong>

                <span>
                  {editorial.cardDescription}
                </span>
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default Editorial