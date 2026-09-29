import { useEffect, useState } from 'react'

import CommunityGrid from '../components/community/CommunityGrid.jsx'

import {
  communityMainTags,
  communityPosts,
} from '../data/community.js'

import './Community.css'


/*
  ==========================================
  MOODAY COMMUNITY MAIN
  Community Main v0.2
  Visual Feedback - STEP 2
  ==========================================

  Desktop : 1280px 이상
  Tablet  : 768px ~ 1279px
  Mobile  : 767px 이하

  최초 게시글:
  Desktop : 9개
  Tablet  : 6개
  Mobile  : 3개

  Load more 클릭 시 3개 추가

  기존 기능 GROUP:
  GROUP 1
  - community.js에 createdAt 추가
  - community.js에 popularityScore 추가

  GROUP 2
  - Latest 실제 정렬
  - Popular 실제 정렬
  - 정렬 상태 UI 연결
  - 기존 Load more와 정렬 기능 연계

  GROUP 3
  - 게시글이 하나도 없을 때 Empty State 표시
  - Empty State에서는 Grid / Load more 숨김
  - Empty State에서는 태그 / Filter 영역 숨김
  - Empty State 내부 Write CTA 제공

  Visual Feedback STEP 1
  - Page Background #FAFAF8
  - Surface hierarchy 정리
  - Neutral / Border / Sage Color Token 정리

  Visual Feedback STEP 2
  - 기존 문자형 Filter 아이콘 제거
  - Figma 기준 filter.svg 실제 SVG asset 적용
  - Filter Text ↔ Icon 중앙 정렬

  중요:
  - 기존 정렬 / Load More / Empty State 로직은 유지합니다.
  - Typography / 전체 Spacing 정리는 아직 진행하지 않습니다.
  - Header / Footer / Router는 수정하지 않습니다.
*/


/* =====================================
   01. RESPONSIVE SETTINGS
===================================== */

/*
  디바이스별 초기 노출 개수.

  기존 Community Main의
  9 / 6 / 3 규칙을 그대로 유지합니다.
*/

const INITIAL_VISIBLE_COUNT = {
  desktop: 9,
  tablet: 6,
  mobile: 3,
}


/*
  Load more 클릭 시
  추가로 표시할 게시글 수입니다.
*/

const LOAD_MORE_COUNT = 3


/* =====================================
   02. SORT SETTINGS
===================================== */

/*
  Community Main에서 사용하는 정렬 모드.

  문자열을 코드 곳곳에 직접 반복하지 않고
  한 곳에서 관리합니다.
*/

const SORT_MODE = {
  latest: 'latest',
  popular: 'popular',
}


/*
  게시글 배열을 정렬하는 함수.

  중요:
  Array.prototype.sort()는 원본 배열 자체를
  변경할 수 있기 때문에
  반드시 [...posts]로 복사한 뒤 정렬합니다.

  Latest:
  → createdAt 최신순

  Popular:
  → popularityScore 높은 순
*/

function getSortedPosts(posts, sortMode) {

  const copiedPosts = [...posts]


  /*
    Popular 정렬
  */

  if (sortMode === SORT_MODE.popular) {

    return copiedPosts.sort(
      (a, b) =>
        b.popularityScore - a.popularityScore
    )

  }


  /*
    Latest 정렬.

    예상하지 못한 sortMode가 들어와도
    Latest를 기본 정렬 방식으로 사용합니다.
  */

  return copiedPosts.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )

}


/* =====================================
   03. DEVICE DETECTION
===================================== */

/*
  현재 브라우저 너비를 기준으로
  Desktop / Tablet / Mobile을 구분합니다.

  중요:
  아래 기준은 Community.css의
  media query와 반드시 일치해야 합니다.
*/

function getDeviceType() {

  /*
    브라우저가 없는 환경에서는
    Desktop을 기본값으로 사용합니다.
  */

  if (typeof window === 'undefined') {
    return 'desktop'
  }


  const width = window.innerWidth


  /*
    Mobile
    767px 이하
  */

  if (width <= 767) {
    return 'mobile'
  }


  /*
    Tablet
    768px ~ 1279px
  */

  if (width <= 1279) {
    return 'tablet'
  }


  /*
    Desktop
    1280px 이상
  */

  return 'desktop'
}


/* =====================================
   04. COMMUNITY COMPONENT
===================================== */

export default function Community() {

  /*
    현재 정렬 방식.

    최초 진입 시 Latest가 기본값입니다.
  */

  const [sortMode, setSortMode] = useState(
    SORT_MODE.latest
  )


  /*
    현재 디바이스 유형과
    Load more로 추가 표시한 게시글 수를
    함께 관리합니다.
  */

  const [displayState, setDisplayState] = useState(() => ({
    device: getDeviceType(),
    extraCount: 0,
  }))


  /* =================================
     05. WINDOW RESIZE
  ================================= */

  useEffect(() => {

    function handleResize() {

      const nextDevice = getDeviceType()

      setDisplayState((previous) => {

        /*
          같은 디바이스 구간 안에서
          브라우저 크기만 변경된 경우에는
          기존 Load more 상태를 유지합니다.

          예:
          800px → 1100px

          둘 다 Tablet이므로
          extraCount를 유지합니다.
        */

        if (previous.device === nextDevice) {
          return previous
        }


        /*
          breakpoint를 넘어
          디바이스 구간 자체가 변경된 경우에는
          새로운 디바이스의 초기 게시글 수로
          돌아갑니다.

          예:
          1279px → 1280px
          Tablet → Desktop

          정렬 방식(sortMode)은 유지하고
          Load more 상태만 초기화합니다.
        */

        return {
          device: nextDevice,
          extraCount: 0,
        }

      })

    }


    /*
      최초 렌더링 이후
      실제 화면 크기를 한 번 더 확인합니다.
    */

    handleResize()


    /*
      브라우저 크기 변경 감지
    */

    window.addEventListener('resize', handleResize)


    /*
      컴포넌트가 제거될 때
      이벤트 리스너를 정리합니다.
    */

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      )
    }

  }, [])


  /* =================================
     06. SORTED POSTS
  ================================= */

  /*
    반드시:

    전체 communityPosts
    → 정렬
    → visibleCount만큼 slice

    순서로 처리합니다.

    Tablet / Mobile에서 먼저 slice한 뒤
    정렬하면 아직 Load more되지 않은 게시글이
    정렬 대상에서 빠질 수 있기 때문입니다.
  */

  const sortedPosts = getSortedPosts(
    communityPosts,
    sortMode
  )


  /* =================================
     07. EMPTY STATE
  ================================= */

  /*
    전체 정렬 결과에 게시글이 하나도 없으면
    Community가 비어 있는 것으로 판단합니다.

    별도의 React state를 만들지 않고
    현재 데이터에서 계산되는 파생값으로 둡니다.
  */

  const isEmpty = sortedPosts.length === 0


  /* =================================
     08. VISIBLE POST COUNT
  ================================= */

  /*
    현재 디바이스의 초기 게시글 개수.
  */

  const initialCount =
    INITIAL_VISIBLE_COUNT[displayState.device]


  /*
    초기 개수 + Load more로 펼친 개수.

    전체 정렬 결과보다 커지지 않도록
    Math.min()으로 제한합니다.
  */

  const visibleCount = Math.min(
    initialCount + displayState.extraCount,
    sortedPosts.length
  )


  /*
    정렬된 게시글 중
    현재 화면에서 실제로 보여줄 게시글만 선택합니다.
  */

  const visiblePosts = sortedPosts.slice(
    0,
    visibleCount
  )


  /*
    아직 표시하지 않은 게시글이 존재할 때만
    Load more 버튼을 표시합니다.
  */

  const hasMorePosts =
    visibleCount < sortedPosts.length


  /* =================================
     09. SORT HANDLERS
  ================================= */

  /*
    Latest 선택.

    정렬을 변경하더라도
    현재 Load more 노출 개수는 초기화하지 않습니다.
  */

  function handleLatestSort() {
    setSortMode(SORT_MODE.latest)
  }


  /*
    Popular 선택.

    현재는 GROUP 1에서 추가한
    popularityScore 기준입니다.

    추후 Community Detail의 실제 초기 likes가
    공통 데이터로 정리되면 likes 기준으로
    교체할 수 있습니다.
  */

  function handlePopularSort() {
    setSortMode(SORT_MODE.popular)
  }


  /* =================================
     10. LOAD MORE
  ================================= */

  function handleLoadMore() {

    /*
      현재 정렬 결과 아래에
      게시글을 3개씩 추가합니다.

      Latest / Popular 모두
      동일한 Load more 규칙을 사용합니다.
    */

    setDisplayState((previous) => ({

      ...previous,

      extraCount:
        previous.extraCount + LOAD_MORE_COUNT,

    }))

  }


  /* =================================
     11. PAGE RENDER
  ================================= */

  return (

    <main
      className="mooday-community"
      id="community-main"
    >

      <div className="mooday-community__inner">


        {/* =================================
            12. LATEST / POPULAR / WRITE
        ================================= */}

        {/*
          게시글이 없는 경우에도
          페이지의 기본 Navigation 구조는 유지합니다.
        */}

        <div className="mooday-community__top">

          <div
            className="mooday-community__tabs"
            aria-label="게시글 정렬"
          >

            {/*
              Latest
            */}

            <button
              type="button"
              className={
                `mooday-community__tab ${
                  sortMode === SORT_MODE.latest
                    ? 'mooday-community__tab--active'
                    : 'mooday-community__tab--pending'
                }`
              }
              onClick={handleLatestSort}
              aria-pressed={
                sortMode === SORT_MODE.latest
              }
            >
              Latest
            </button>


            {/*
              Popular
            */}

            <button
              type="button"
              className={
                `mooday-community__tab ${
                  sortMode === SORT_MODE.popular
                    ? 'mooday-community__tab--active'
                    : 'mooday-community__tab--pending'
                }`
              }
              onClick={handlePopularSort}
              aria-pressed={
                sortMode === SORT_MODE.popular
              }
            >
              Popular
            </button>

          </div>


          {/*
            기존 상단 Write 진입 링크.
          */}

          <a
            className="mooday-community__write"
            href="/community/write"
          >

            Write

            <span aria-hidden="true">
              →
            </span>

          </a>

        </div>


        {/* =================================
            13. HASHTAGS / FILTER
        ================================= */}

        {/*
          게시글이 존재할 때만
          Tag / Filter 영역을 표시합니다.
        */}

        {!isEmpty && (

          <div className="mooday-community__tools">

            <div
              className="mooday-community__chips"
              aria-label="커뮤니티 해시태그"
            >

              {communityMainTags.map((tag) => (

                <span
                  key={tag}

                  className={
                    `mooday-community__chip${
                      tag === 'All'
                        ? ' mooday-community__chip--selected'
                        : ''
                    }`
                  }
                >

                  {tag === 'All' ? tag : `#${tag}`}

                </span>

              ))}

            </div>


            {/* =================================
                FILTER
                Visual Feedback STEP 2
            ================================= */}

            {/*
              현재 Filter 기능 자체는 아직 미구현입니다.

              STEP 2에서는 기존 문자형 아이콘:

              ☷

              을 제거하고,
              Figma에서 전달받은 실제 SVG asset을
              그대로 사용합니다.

              실제 파일 위치:

              public/images/community/icons/filter.svg

              따라서 JSX에서는 public 폴더를 제외한:

              /images/community/icons/filter.svg

              경로를 사용합니다.

              SVG는 Filter 텍스트의 의미를
              보조하는 장식 아이콘이므로
              alt="" + aria-hidden="true"로
              중복 읽기를 방지합니다.
            */}

            <span
              className="mooday-community__filter"
              aria-label="필터 기능은 추후 구현"
            >

              Filter

              <img
                className="mooday-community__filter-icon"
                src="/images/community/icons/filter.svg"
                alt=""
                aria-hidden="true"
              />

            </span>

          </div>

        )}


        {/* =================================
            14. GRID / EMPTY STATE
        ================================= */}

        {isEmpty ? (

          /* -----------------------------
             EMPTY STATE
          ----------------------------- */

          <section
            className="mooday-community-empty"
            aria-labelledby="community-empty-title"
          >

            <h2
              className="mooday-community-empty__title"
              id="community-empty-title"
            >
              아직 등록된 게시글이 없습니다.
            </h2>


            <p className="mooday-community-empty__description">
              새로운 스타일을 공유해 보세요.
            </p>


            <a
              className="mooday-community-empty__write"
              href="/community/write"
            >
              Write

              <span aria-hidden="true">
                →
              </span>
            </a>

          </section>

        ) : (

          /* -----------------------------
             COMMUNITY GRID
          ----------------------------- */

          <CommunityGrid posts={visiblePosts} />

        )}


        {/* =================================
            15. LOAD MORE BUTTON
        ================================= */}

        {hasMorePosts && (

          <div className="mooday-community__load-wrap">

            <button
              type="button"
              className="mooday-community__load"
              onClick={handleLoadMore}
              aria-label="게시글 3개 더 보기"
            >

              Load more

            </button>

          </div>

        )}

      </div>

    </main>

  )

}