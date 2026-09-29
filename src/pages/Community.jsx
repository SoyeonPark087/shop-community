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
  Community Main v0.2 - GROUP 3
  ==========================================

  Desktop : 1280px 이상
  Tablet  : 768px ~ 1279px
  Mobile  : 767px 이하

  최초 게시글:
  Desktop : 9개
  Tablet  : 6개
  Mobile  : 3개

  Load more 클릭 시 3개 추가

  GROUP 1:
  - community.js에 createdAt 추가
  - community.js에 popularityScore 추가

  GROUP 2:
  - Latest 실제 정렬
  - Popular 실제 정렬
  - 정렬 상태 UI 연결
  - 기존 Load more와 정렬 기능 연계

  GROUP 3:
  - 게시글이 하나도 없을 때 Empty State 표시
  - Empty State에서는 Grid / Load more 숨김
  - Empty State에서는 태그 / Filter 영역 숨김
  - Empty State 내부 Write CTA 제공

  중요:
  - GROUP 1 / GROUP 2 기능은 그대로 유지합니다.
  - 정렬은 전체 게시글을 먼저 대상으로 합니다.
  - 정렬 완료 후 visibleCount만큼 잘라서 표시합니다.
  - 정렬 변경 시 현재 Load more 노출 개수는 유지합니다.
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
  아래 기준은 community.css의
  미디어 쿼리와 반드시 일치해야 합니다.
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

    기존 Community Main 구조를 유지합니다.
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
    GROUP 2 핵심 로직 유지.

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
    GROUP 3 핵심.

    전체 정렬 결과에 게시글이 하나도 없으면
    Community가 비어 있는 것으로 판단합니다.

    별도의 React state를 만들지 않고,
    현재 데이터에서 바로 계산되는 파생값으로 둡니다.

    현재 communityPosts에는 9개의 게시글이 있으므로
    정상 운영 화면에서는 false입니다.
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

    Empty State에서는 sortedPosts.length가 0이므로
    visibleCount 역시 자동으로 0이 됩니다.
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

    Empty State에서는:
    0 < 0 → false

    가 되므로 Load more가 자동으로 표시되지 않습니다.
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

    예:
    Mobile Latest 6개
    → Popular 선택
    → Popular 상위 6개 유지
  */

  function handleLatestSort() {
    setSortMode(SORT_MODE.latest)
  }


  /*
    Popular 선택.

    GROUP 1에서 추가한
    popularityScore를 기준으로 정렬합니다.

    현재 popularityScore는
    실제 Detail Like와 연결된 값이 아니라
    Main v0.2 시연용 임시 데이터입니다.
  */

  function handlePopularSort() {
    setSortMode(SORT_MODE.popular)
  }


  /* =================================
     10. LOAD MORE
  ================================= */

  function handleLoadMore() {

    /*
      현재 정렬 결과의 카드 아래에
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

          따라서:
          Latest / Popular / Write
          영역은 Empty State에서도 그대로 표시됩니다.
        */}

        <div className="mooday-community__top">

          <div
            className="mooday-community__tabs"
            aria-label="게시글 정렬"
          >

            {/*
              Latest

              현재 선택 상태에 따라
              active / pending 클래스를 전환합니다.
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

              현재는 GROUP 1의
              popularityScore가 높은 게시글부터
              화면에 표시합니다.
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

            Empty State 여부와 관계없이
            항상 유지합니다.
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
          GROUP 3 정책:

          게시글이 존재할 때만
          태그 / Filter 영역을 표시합니다.

          Community 전체에 게시글이 하나도 없는 상황에서
          실제 필터 기능도 없는 태그들이 먼저 노출되는
          어색함을 피하기 위한 처리입니다.

          향후 실제 태그 필터 기능이 구현될 경우에는
          이 정책을 다시 검토할 수 있습니다.
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


            {/*
              Filter 기능은 기존과 동일하게
              아직 미구현 상태입니다.

              위치와 디자인만 유지합니다.
            */}

            <span
              className="mooday-community__filter"
              aria-label="필터 기능은 추후 구현"
            >

              Filter

              <span aria-hidden="true">
                ☷
              </span>

            </span>

          </div>

        )}


        {/* =================================
            14. GRID / EMPTY STATE
        ================================= */}

        {/*
          GROUP 3 핵심 렌더링 분기.

          게시글 있음:
          → CommunityGrid

          게시글 없음:
          → Empty State

          CommunityGrid 자체에는 Empty 로직을 넣지 않아
          기존 컴포넌트의 책임을 그대로 유지합니다.
        */}

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


            {/*
              Empty State 안의 상황별 CTA.

              상단 Write 링크과 목적은 같지만,
              비어 있는 콘텐츠 영역에서도
              사용자가 다음 행동을 쉽게 찾을 수 있도록
              추가합니다.

              별도 새로운 기능은 아니며
              기존 /community/write 주소를 사용합니다.
            */}

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

        {/*
          게시글이 있고,
          현재 정렬 결과에서
          아직 표시하지 않은 게시글이 있을 때만
          Load more 버튼을 표시합니다.

          Empty State에서는 hasMorePosts가 false이므로
          버튼이 렌더링되지 않습니다.
        */}

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