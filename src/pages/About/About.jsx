import './About.css'

export default function About() {

  return (
    <main className="mooday-about">
      <div className="mooday-about__inner">

        {/* INTRO */}
        <header className="mooday-about__header">
          <p className="mooday-about__eyebrow">
            ABOUT MOODAY
          </p>

          <h1 className="mooday-about__title">
            Find your mood,
            <br />
            wear your day.
          </h1>
        </header>


        {/* WHY MOODAY */}
        <section
          className="mooday-about__section mooday-about__section--story"
          aria-labelledby="about-story-title"
        >
          <div className="mooday-about__section-label">
            <span>01</span>
            <span>WHY MOODAY</span>
          </div>

          <div className="mooday-about__section-content">
            <h2 id="about-story-title">
              무엇을 살지보다,
              <br />
              무엇을 좋아하는지부터.
            </h2>
            <div className="mooday-about__text">
            <p>
              온라인 쇼핑은 대부분 원하는 상품을 찾는 것에서 시작합니다.
              <br />
              하지만 새로운 것을 좋아하게 되는 순간은 언제나 상품에서 시작되는 것은 아닙니다.
            </p>

            <p>
              한 장의 사진, 에디터의 이야기,
              누군가의 자연스러운 스타일을 통해 미처 알지 못했던 나를 발견하기도 합니다.
            </p>

            <p>
              MOODAY는 상품보다 취향에서 시작합니다.
              <br />
              내가 발견한 나의 취향이 자연스럽게 상품까지 이어지는 경험을 제안합니다.
            </p>
          </div>
          </div>
        </section>


        {/* EDITORIAL */}
        <section
          className="mooday-about__section"
          aria-labelledby="about-editorial-title"
        >
          <div className="mooday-about__section-label">
            <span>02</span>
            <span>OUR EDITORIAL</span>
          </div>

          <div className="mooday-about__section-content">
            <h2 id="about-editorial-title">
              취향을 발견하는
              <br />
              하나의 이야기.
            </h2>

            <div className="mooday-about__text">
              <p>
                MOODAY의 에디토리얼을 통해
                자신만의 시선으로 쌓아올린 에디터의 글을
                사용자만의 방식으로 따라갑니다.
              </p>

              <p>
                콘텐츠와 쇼핑을 분리하지 않는 것,
                그것이 MOODAY가 생각하는 큐레이션입니다.
              </p>
            </div>
          </div>
        </section>


        {/* PHILOSOPHY */}
        <section
          className="mooday-about__section"
          aria-labelledby="about-philosophy-title"
        >
          <div className="mooday-about__section-label">
            <span>03</span>
            <span>OUR PHILOSOPHY</span>
          </div>

          <div className="mooday-about__section-content">
            <h2 id="about-philosophy-title">
              From mood to style.
            </h2>

            <div className="mooday-about__philosophy-list">

              <article className="mooday-about__philosophy-item">
                <span className="mooday-about__philosophy-number">
                  01
                </span>

                <div>
                  <h3>Discover</h3>

                  <p>
                    에디터의 큐레이션을 통해
                    새로운 분위기와 감각을 만나보세요.
                  </p>
                </div>
              </article>


              <article className="mooday-about__philosophy-item">
                <span className="mooday-about__philosophy-number">
                  02
                </span>

                <div>
                  <h3>Explore</h3>

                  <p>
                    하나의 콘텐츠에서 또 다른 스타일로,
                    목적 없이 표류하는 그 과정 자체가
                    새로운 발견이 될 수 있습니다.
                  </p>
                </div>
              </article>


              <article className="mooday-about__philosophy-item">
                <span className="mooday-about__philosophy-number">
                  03
                </span>

                <div>
                  <h3>Connect</h3>

                  <p>
                    에디토리얼과 커뮤니티를 통한 영감이
                    나의 일상으로 이어질 수 있는 경험을 만듭니다.
                  </p>
                </div>
              </article>

            </div>
          </div>
        </section>


        {/* EXPERIENCE */}
        <section
          className="mooday-about__section"
          aria-labelledby="about-experience-title"
        >
          <div className="mooday-about__section-label">
            <span>04</span>
            <span>MOODAY EXPERIENCE</span>
          </div>

          <div className="mooday-about__section-content">
            <h2 id="about-experience-title">
              Discover.
              <br />
              Explore.
              <br />
              Wear.
            </h2>

            <div className="mooday-about__service-list">

              <article className="mooday-about__service-item">
                <div className="mooday-about__service-heading">
                  <span>EDITORIAL</span>
                  <span>01</span>
                </div>

                <p>
                  에디터의 시선을 통해 새로운 취향과 스타일을 발견합니다.
                </p>
              </article>


              <article className="mooday-about__service-item">
                <div className="mooday-about__service-heading">
                  <span>COMMUNITY</span>
                  <span>02</span>
                </div>

                <p>
                  다른 사람의 실제 스타일을 통해 취향을 확장합니다.
                </p>
              </article>


              <article className="mooday-about__service-item">
                <div className="mooday-about__service-heading">
                  <span>SHOP</span>
                  <span>03</span>
                </div>

                <p>
                  발견한 취향과 연결된 상품을 자연스럽게 탐색합니다.
                </p>
              </article>

            </div>
          </div>
        </section>
        <p className="mooday-about__closing-message">
          MOOD + DAY
          <br />
          매일의 기분과 취향으로 나의 하루를 쌓아간다는 의미를 담고 있습니다.
          <br />
          자신만의 고유함을 찾아가는 우리를 기대합니다.
        </p>

        <p className="mooday-about__closing-en">
          FIND YOUR MOOD, WEAR YOUR DAY.
        </p>
      </div>
    </main>
  )
}