
import { useEffect, useState } from 'react'

import CommunityGrid from '../components/community/CommunityGrid.jsx'

import {
  communityMainTags,
  communityPosts,
} from '../data/community.js'

import '../styles/community.css'


/*
  ==========================================
  MOODAY COMMUNITY MAIN
  Version 1.3 - Breakpoint Update
  ==========================================

  Desktop : 1280px 이상
  Tablet  : 768px ~ 1279px
  Mobile  : 767px 이하

  최초 게시글:
  Desktop : 9개
  Tablet  : 6개
  Mobile  : 3개

  Load more 클릭 시 3개 추가

  Header / Footer / Router는 팀장 담당.
*/


/* =====================================
   01. RESPONSIVE SETTINGS
===================================== */

/*
  디바이스별 초기 노출 개수.

  기존 v1.2의 9 / 6 / 3을 그대로 유지합니다.
*/

const INITIAL_VISIBLE_COUNT = {
  desktop: 9,
  tablet: 6,
  mobile: 3,
}


/*
  Load more 클릭 시 추가할 게시글 수
*/

const LOAD_MORE_COUNT = 3


/* =====================================
   02. DEVICE DETECTION
===================================== */

/*
  현재 브라우저 너비를 기준으로
  Desktop / Tablet / Mobile을 구분합니다.

  중요:
  아래 기준은 community.css의
  미디어 쿼리와 반드시 일치해야 합니다.

  v1.3 변경:
  Desktop 시작점을 1024px에서 1280px로 변경.
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
    Mobile: 767px 이하
  */

  if (width <= 767) {
    return 'mobile'
  }

  /*
    Tablet: 768px ~ 1279px

    이전 버전의 1023px 상한을
    1279px로 확장했습니다.
  */

  if (width <= 1279) {
    return 'tablet'
  }

  /*
    Desktop: 1280px 이상
  */

  return 'desktop'
}


/* =====================================
   03. COMMUNITY COMPONENT
===================================== */

export default function Community() {

  /*
    현재 디바이스 유형과
    추가로 펼친 게시글 수를 함께 관리합니다.

    디바이스 변경 시 해당 환경의 초기 개수로
    재설정하는 기존 동작을 유지합니다.
  */

  const [displayState, setDisplayState] = useState(() => ({
    device: getDeviceType(),
    extraCount: 0,
  }))


  /* =================================
     04. WINDOW RESIZE
  ================================= */

  useEffect(() => {

    function handleResize() {

      const nextDevice = getDeviceType()

      setDisplayState((previous) => {

        /*
          같은 디바이스 구간이면
          기존 Load more 상태를 유지합니다.

          예:
          800px → 1100px
          둘 다 Tablet이므로 상태 유지.
        */

        if (previous.device === nextDevice) {
          return previous
        }

        /*
          디바이스 구간이 변경되면
          새로운 구간의 초기 상태로 돌아갑니다.

          예:
          1279px → 1280px
          Tablet에서 Desktop으로 변경.
        */

        return {
          device: nextDevice,
          extraCount: 0,
        }

      })

    }

    /*
      최초 화면 크기를 다시 확인합니다.
    */

    handleResize()

    /*
      브라우저 크기 변경 감지
    */

    window.addEventListener('resize', handleResize)

    /*
      컴포넌트가 제거될 때
      이벤트 리스너 정리
    */

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [])


  /* =================================
     05. VISIBLE POST COUNT
  ================================= */

  /*
    디바이스별 초기 개수
  */

  const initialCount =
    INITIAL_VISIBLE_COUNT[displayState.device]


  /*
    초기 개수 + 추가로 펼친 개수

    전체 게시글 수를 넘지 않도록 제한합니다.
  */

  const visibleCount = Math.min(
    initialCount + displayState.extraCount,
    communityPosts.length
  )


  /*
    실제 출력할 게시글만 선택합니다.

    원본 communityPosts는 변경하지 않습니다.
  */

  const visiblePosts = communityPosts.slice(
    0,
    visibleCount
  )


  /*
    아직 표시하지 않은 게시글이 있을 때만
    Load more 버튼을 표시합니다.
  */

  const hasMorePosts =
    visibleCount < communityPosts.length


  /* =================================
     06. LOAD MORE
  ================================= */

  function handleLoadMore() {

    /*
      기존 카드 아래에 3개씩 추가합니다.
    */

    setDisplayState((previous) => ({

      ...previous,

      extraCount:
        previous.extraCount + LOAD_MORE_COUNT,

    }))

  }


  /* =================================
     07. PAGE RENDER
  ================================= */

  return (

    <main
      className="mooday-community"
      id="community-main"
    >

      <div className="mooday-community__inner">


        {/* =================================
            08. LATEST / POPULAR / WRITE
        ================================= */}

        <div className="mooday-community__top">

          <div
            className="mooday-community__tabs"
            aria-label="게시글 정렬 영역"
          >

            {/*
              정렬 기능은 후속 구현 대상입니다.
              현재는 최종 시안의 UI만 유지합니다.
            */}

            <span
              className="
                mooday-community__tab
                mooday-community__tab--active
              "
            >
              Latest
            </span>

            <span
              className="
                mooday-community__tab
                mooday-community__tab--pending
              "
            >
              Popular
            </span>

          </div>


          {/*
            Write 페이지 이동 주소.

            실제 화면 연결은 팀장 Router 통합 후
            검증합니다.
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
            09. HASHTAGS / FILTER
        ================================= */}

        <div className="mooday-community__tools">

          {/*
            모든 태그를 유지합니다.

            모바일에서는 CSS에서
            여러 줄 자동 줄바꿈을 적용합니다.
          */}

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
            Filter 기능은 추후 구현.
            현재는 기존 시안의 위치와 디자인 유지.
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


        {/* =================================
            10. COMMUNITY GRID
        ================================= */}

        {/*
          현재 디바이스와 Load more 상태에 따라
          게시글 표시 개수가 결정됩니다.

          카드 컴포넌트 및 이미지 처리 코드는
          기존 파일을 그대로 사용합니다.
        */}

        <CommunityGrid posts={visiblePosts} />


        {/* =================================
            11. LOAD MORE BUTTON
        ================================= */}

        {/*
          남은 게시글이 있을 때만 표시합니다.

          Desktop: 초기 9개
          Tablet : 초기 6개
          Mobile : 초기 3개

          모든 게시글 표시 후 버튼 제거.
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