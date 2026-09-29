import {
  editorials,
  featuredEditorial,
} from '../../data/editorials'
import './editorial.css'

function Editorial() {
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
                src="/images/editorial/editorial01-detail01.png"
                alt="햇살 아래 인물"
              />

              <img
                src="/images/editorial/editorial01-detail02.png"
                alt="침구와 책"
              />

              <img
                src="/images/editorial/editorial01-detail03.png"
                alt="빛을 받은 식물"
              />

              <img
                src="/images/editorial/editorial01-detail04.png"
                alt="바닷가를 걷는 모습"
              />
            </div>

            {/* 대표 사진: 링크 없음 */}
            <div className="editorial-hero__main-image">
              <img
                src={featuredEditorial.heroImage}
                alt={featuredEditorial.title}
              />
            </div>

            {/* Weekend Calm 사진 */}
            <div className="editorial-hero__weekend">
              <img
                src="/images/editorial/editorial-weekend.png"
                alt="잔잔한 바다 풍경"
              />

              <div className="editorial-hero__weekend-text">
                <strong>Weekend Calm</strong>

                <small>
                  Unwind in natural tones.
                </small>

                {/* Shop 글자와 화살표만 링크 */}
                <a
                  className="editorial-hero__shop-link"
                  href="/shop"
                >
                  Shop&nbsp;&nbsp;→
                </a>
              </div>
            </div>
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

            {/* 대표 에디토리얼 상세페이지 링크 */}
            <a
              className="editorial-hero__button"
              href={`/editorial/${featuredEditorial.id}`}
            >
              Read Story
            </a>

            {/* 페이지 표시 */}
            <div className="editorial-hero__pagination">
              <span>01</span>
              <span>/</span>
              <span>08</span>
              <span aria-hidden="true">‹</span>
              <span aria-hidden="true">›</span>
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
              {/* 카드 이미지: 링크 없음 */}
              <div className="editorial-card__image">
                <img
                  src={editorial.image}
                  alt={editorial.title}
                />
              </div>

              {/* 카드 텍스트: 링크 없음 */}
              <div className="editorial-card__text">
                <strong>{editorial.title}</strong>

                <span>
                  {editorial.cardDescription}
                </span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default Editorial