import { useEffect, useState } from 'react'

import CommunityGrid from '../components/community/CommunityGrid.jsx'
import CommunityFilter from '../components/community/CommunityFilter.jsx'

import {
  communityMainTags,
  communityPosts,
} from '../data/community.js'

import './Community.css'


/*
  ==========================================
  MOODAY COMMUNITY MAIN
  Community Main v0.2.2
  STEP 4 — OPTIONAL ADVANCED FILTER
  ==========================================

  Desktop : 1280px 이상
  Tablet  : 768px ~ 1279px
  Mobile  : 767px 이하

  최초 게시글:
  Desktop : 9개
  Tablet  : 6개
  Mobile  : 3개

  Load more 클릭 시 3개 추가


  STEP 1
  - Card별 likes 추가
  - Card별 postType / scene 추가
  - Detail Like Single Source 연결
  - Card별 Comment Count 연결


  STEP 2
  - Latest 실제 정렬
  - Popular을 likes 기준으로 전환
  - 기존 popularityScore 제거


  STEP 3
  - Main Tag 실제 필터 구현
  - selectedTag 상태 추가
  - Tag → Sort → Slice 구조 적용
  - Tag 변경 시 Load More 초기화
  - Tag UI span → button
  - Tag 순서 자연스럽게 재배치


  STEP 4
  - 우측 Filter 실제 기능 구현
  - CommunityFilter.jsx 분리
  - Post Type / Scene
  - Draft / Applied State 분리
  - Reset / Apply
  - Filter Active 상태
  - Advanced Filter 적용 시 Load More 초기화
  - Community Empty / Filter No Results 분리


  STEP 4 RESET UX 보정
  - 일반 Option 선택은 Draft만 변경
  - Apply를 눌러야 실제 Filter 반영
  - Reset은 예외적으로 즉시 실행
  - Reset 시 Post Type / Scene → All
  - Reset 시 Load More 초기화
  - Reset 시 Main Tag는 유지
  - Reset 후 Popover는 열린 상태 유지


  중요:

  Filter는 Optional Module로 설계합니다.

  기본 Main 구조:

  communityPosts
  → Main Tag
  → Advanced Filter
  → Latest / Popular
  → Responsive Slice
  → Grid


  향후 Advanced Filter를 폐기하는 경우:

  communityPosts
  → Main Tag
  → Latest / Popular
  → Responsive Slice
  → Grid

  로 다시 연결할 수 있어야 합니다.

  따라서:

  - Tag
  - Sort
  - Load More
  - Grid

  로직을 CommunityFilter 내부에 넣지 않습니다.

  Header / Footer / Router는 수정하지 않습니다.
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

const SORT_MODE = {
  latest: 'latest',
  popular: 'popular',
}


/*
  게시글 배열 정렬.

  원본 배열을 변경하지 않도록
  반드시 복사 후 sort합니다.

  Latest:
  → createdAt 최신순

  Popular:
  → likes 높은 순
*/

function getSortedPosts(posts, sortMode) {

  const copiedPosts = [...posts]


  if (sortMode === SORT_MODE.popular) {

    return copiedPosts.sort(
      (a, b) =>
        b.likes - a.likes
    )

  }


  return copiedPosts.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )

}


/* =====================================
   03. DEVICE DETECTION
===================================== */

function getDeviceType() {

  /*
    SSR 등 브라우저가 없는 환경에서는
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

  /* =================================
     SORT STATE
  ================================= */

  /*
    최초 진입은 Latest.
  */

  const [sortMode, setSortMode] = useState(
    SORT_MODE.latest
  )


  /* =================================
     MAIN TAG STATE
  ================================= */

  /*
    STEP 3.

    Main 상단 Tag Filter.

    기본:
    All
  */

  const [selectedTag, setSelectedTag] = useState('All')


  /* =================================
     ADVANCED FILTER STATE
  ================================= */

  /*
    STEP 4.

    실제 Grid에 적용된 Filter 값입니다.

    CommunityFilter 내부 Draft State와
    구분합니다.

    초기값:
    Post Type = All
    Scene     = All
  */

  const [appliedPostType, setAppliedPostType] =
    useState('all')

  const [appliedScene, setAppliedScene] =
    useState('all')


  /* =================================
     DISPLAY STATE
  ================================= */

  /*
    현재 Device와
    Load More 추가 노출 수를 함께 관리합니다.
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
          같은 Device 구간에서는
          Load More 상태를 유지합니다.
        */

        if (previous.device === nextDevice) {
          return previous
        }


        /*
          Breakpoint를 넘어 Device가 변경되면
          해당 Device의 초기 개수로 복귀합니다.

          유지:
          - selectedTag
          - sortMode
          - appliedPostType
          - appliedScene

          초기화:
          - extraCount
        */

        return {
          device: nextDevice,
          extraCount: 0,
        }

      })

    }


    handleResize()


    window.addEventListener(
      'resize',
      handleResize
    )


    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      )
    }

  }, [])


  /* =================================
     06. MAIN TAG FILTER
  ================================= */

  /*
    STEP 3.

    Main 카드의 대표 tags를 기준으로
    첫 번째 Filtering Layer를 만듭니다.

    All:
    → 전체 게시글

    특정 Tag:
    → 해당 Tag를 가진 게시글
  */

  const tagFilteredPosts =
    selectedTag === 'All'
      ? communityPosts
      : communityPosts.filter(
          (post) =>
            post.tags.includes(selectedTag)
        )


  /* =================================
     07. ADVANCED FILTER
  ================================= */

  /*
    STEP 4.

    Tag 결과에 Post Type / Scene 조건을
    추가로 AND 결합합니다.

    예:

    #knitwear
    AND
    Outfit
    AND
    Indoor


    중요한 구조:

    tagFilteredPosts
    ↓
    advancedFilteredPosts

    Advanced Filter가 별도 Layer이므로
    향후 해당 기능을 폐기해도
    tagFilteredPosts를 바로 Sort에 연결할 수 있습니다.
  */

  const advancedFilteredPosts =
    tagFilteredPosts.filter((post) => {

      const matchesPostType =
        appliedPostType === 'all'
        || post.postType === appliedPostType


      const matchesScene =
        appliedScene === 'all'
        || post.scene === appliedScene


      return (
        matchesPostType
        && matchesScene
      )

    })


  /* =================================
     08. SORT
  ================================= */

  /*
    최종 처리 순서:

    Community Posts
    → Tag
    → Advanced Filter
    → Sort
    → Slice
  */

  const sortedPosts = getSortedPosts(
    advancedFilteredPosts,
    sortMode
  )


  /* =================================
     09. EMPTY / NO RESULTS
  ================================= */

  /*
    진짜 Community Empty.

    원본 게시글 자체가 하나도 없는 상태입니다.
  */

  const isEmpty =
    communityPosts.length === 0


  /*
    Filter No Results.

    원본 Community에는 게시글이 있지만
    현재 Tag + Advanced Filter 조합에
    일치하는 게시글이 없는 상태입니다.

    Community Empty와 반드시 구분합니다.
  */

  const hasNoResults =
    !isEmpty
    && advancedFilteredPosts.length === 0


  /* =================================
     10. VISIBLE COUNT
  ================================= */

  const initialCount =
    INITIAL_VISIBLE_COUNT[displayState.device]


  const visibleCount = Math.min(
    initialCount + displayState.extraCount,
    sortedPosts.length
  )


  const visiblePosts = sortedPosts.slice(
    0,
    visibleCount
  )


  const hasMorePosts =
    visibleCount < sortedPosts.length


  /* =================================
     11. TAG HANDLER
  ================================= */

  function handleTagSelect(tag) {

    setSelectedTag(tag)


    /*
      Tag는 게시글 집합 자체를 변경하므로
      Load More 상태를 초기화합니다.
    */

    setDisplayState((previous) => ({

      ...previous,

      extraCount: 0,

    }))

  }


  /* =================================
     12. ADVANCED FILTER HANDLERS
  ================================= */

  /*
    CommunityFilter의 Apply를 통해
    실제 Filter 값을 전달받습니다.

    일반 Option 선택은 CommunityFilter 내부의
    Draft에서만 이루어지며,
    Apply를 눌러야 이 함수가 호출됩니다.
  */

  function handleAdvancedFilterApply({
    postType,
    scene,
  }) {

    setAppliedPostType(postType)
    setAppliedScene(scene)


    /*
      Advanced Filter도 게시글 집합 자체를
      변경하므로 Load More를 초기화합니다.
    */

    setDisplayState((previous) => ({

      ...previous,

      extraCount: 0,

    }))

  }


  /*
    STEP 4 Reset UX 보정.

    Reset은 Apply와 달리
    즉시 실제 Advanced Filter를 초기화합니다.

    초기화:
    - Post Type → All
    - Scene → All
    - Load More → 초기 상태

    유지:
    - Main Tag
    - Latest / Popular
    - Device


    예:

    #knitwear
    + Outfit
    + Indoor

    Reset

    ↓

    #knitwear
    + All
    + All
  */

  function handleAdvancedFilterReset() {

    setAppliedPostType('all')
    setAppliedScene('all')


    setDisplayState((previous) => ({

      ...previous,

      extraCount: 0,

    }))

  }


  /* =================================
     13. SORT HANDLERS
  ================================= */

  /*
    Sort는 게시글 집합을 바꾸는 것이 아니라
    현재 결과의 순서만 변경하므로
    Load More 상태를 유지합니다.
  */

  function handleLatestSort() {
    setSortMode(SORT_MODE.latest)
  }


  function handlePopularSort() {
    setSortMode(SORT_MODE.popular)
  }


  /* =================================
     14. LOAD MORE
  ================================= */

  function handleLoadMore() {

    setDisplayState((previous) => ({

      ...previous,

      extraCount:
        previous.extraCount + LOAD_MORE_COUNT,

    }))

  }


  /* =================================
     15. PAGE RENDER
  ================================= */

  return (

    <main
      className="mooday-community"
      id="community-main"
    >

      <div className="mooday-community__inner">


        {/* =================================
            16. LATEST / POPULAR / WRITE
        ================================= */}

        <div className="mooday-community__top">

          <div
            className="mooday-community__tabs"
            aria-label="게시글 정렬"
          >

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
            17. MAIN TAG / ADVANCED FILTER
        ================================= */}

        {/*
          Community 자체가 Empty일 때만
          Tool 영역을 숨깁니다.

          No Results 상태에서는 사용자가
          조건을 다시 변경할 수 있어야 하므로
          Tag / Filter 영역을 계속 표시합니다.
        */}

        {!isEmpty && (

          <div className="mooday-community__tools">

            {/* =================================
                MAIN TAG FILTER
            ================================= */}

            <div
              className="mooday-community__chips"
              aria-label="커뮤니티 해시태그 필터"
            >

              {communityMainTags.map((tag) => {

                const isSelected =
                  selectedTag === tag


                return (

                  <button
                    key={tag}
                    type="button"
                    className={
                      `mooday-community__chip${
                        isSelected
                          ? ' mooday-community__chip--selected'
                          : ''
                      }`
                    }
                    onClick={() =>
                      handleTagSelect(tag)
                    }
                    aria-pressed={isSelected}
                  >

                    {tag === 'All'
                      ? tag
                      : `#${tag}`}

                  </button>

                )

              })}

            </div>


            {/* =================================
                OPTIONAL ADVANCED FILTER
            ================================= */}

            <CommunityFilter
              appliedPostType={appliedPostType}
              appliedScene={appliedScene}
              onApply={handleAdvancedFilterApply}
              onReset={handleAdvancedFilterReset}
            />

          </div>

        )}


        {/* =================================
            18. GRID / EMPTY / NO RESULTS
        ================================= */}

        {isEmpty ? (

          /* -----------------------------
             COMMUNITY EMPTY
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

        ) : hasNoResults ? (

          /* -----------------------------
             FILTER NO RESULTS
          ----------------------------- */

          <section
            className="mooday-community-no-results"
            aria-labelledby="community-no-results-title"
          >

            <h2
              className="mooday-community-no-results__title"
              id="community-no-results-title"
            >
              조건에 맞는 게시글이 없습니다.
            </h2>


            <p className="mooday-community-no-results__description">
              필터 조건을 다시 선택해 주세요.
            </p>


            <button
              type="button"
              className="mooday-community-no-results__reset"
              onClick={handleAdvancedFilterReset}
            >
              Reset filters
            </button>

          </section>

        ) : (

          /* -----------------------------
             COMMUNITY GRID
          ----------------------------- */

          <CommunityGrid posts={visiblePosts} />

        )}


        {/* =================================
            19. LOAD MORE
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