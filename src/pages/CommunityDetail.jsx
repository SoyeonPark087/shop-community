import { useEffect, useState } from 'react'

import CommunityCard from '../components/community/CommunityCard.jsx'
import DetailGallery from '../components/community/DetailGallery.jsx'
import StyledProducts from '../components/community/StyledProducts.jsx'
import DetailPost from '../components/community/DetailPost.jsx'
import DetailComments from '../components/community/DetailComments.jsx'

import { communityPosts } from '../data/community.js'
import { communityDetailData } from '../data/communityDetail.js'

import './Community.css'
import './CommunityDetail.css'


/*
  =========================================
  MOODAY COMMUNITY DETAIL
  Responsive Version 1.2
  =========================================

  GROUP 1 보강 사항:

  1. 기존 Gallery 기능 유지
     - 썸네일 클릭 → 메인 이미지 변경
     - 게시글 변경 시 Gallery 초기화

  2. 기존 Not Found 처리 유지
     - 존재하지 않는 post ID
     - 잘못된 URL 형식

  3. 기존 Related Styles 구조 유지
     - 현재 게시글 제외
     - Desktop / Tablet 전체 8개
     - Mobile 초기 4개
     - Load More 후 전체 8개

  4. [GROUP 1 신규]
     게시글 ID 변경 시 페이지 상단으로 이동

     예:
     post-01 하단 Related Styles
     → post-02 클릭
     → post-02 Detail 상단부터 표시

  Header / Footer / Router는 포함하지 않습니다.
*/


/* =====================================
   01. POST ID
===================================== */

/*
  App에서 postId를 전달하면 해당 값을 사용하고,
  전달하지 않으면 현재 URL에서 post ID를 읽습니다.

  허용 예:
  /community/post-01
  /community/post-09

  형식이 맞지 않으면 null을 반환합니다.
*/

function getPostIdFromPath() {

  if (typeof window === 'undefined') {
    return null
  }

  const match = window.location.pathname.match(
    /^\/community\/(post-\d{2})\/?$/
  )

  return match ? match[1] : null

}


/* =====================================
   02. MOBILE CHECK
===================================== */

/*
  Community Main과 동일하게
  767px 이하를 Mobile로 판단합니다.

  이 값은 Related Styles에서:

  Desktop / Tablet
  → 8개 전체 표시

  Mobile
  → 최초 4개 표시

  로 구분하기 위해 사용합니다.
*/

function getIsMobile() {

  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(max-width: 767px)').matches

}


/* =====================================
   03. MAIN COMPONENT
===================================== */

export default function CommunityDetail({ postId }) {


  /* =================================
     03-1. CURRENT POST ID
  ================================= */

  /*
    URL 기반 post ID를 상태로 관리합니다.

    popstate:
    브라우저 뒤로가기 / 앞으로가기로
    주소가 변경되는 경우를 감지합니다.
  */

  const [pathPostId, setPathPostId] = useState(
    getPostIdFromPath
  )


  useEffect(() => {

    function handlePopState() {
      setPathPostId(getPostIdFromPath())
    }

    window.addEventListener(
      'popstate',
      handlePopState
    )

    return () => {

      window.removeEventListener(
        'popstate',
        handlePopState
      )

    }

  }, [])


  /*
    App에서 postId prop이 전달되면 우선 사용.

    별도의 prop이 없으면
    URL에서 읽은 pathPostId를 사용합니다.
  */

  const currentPostId =
    postId ?? pathPostId


  /* =================================
     03-2. GROUP 1
     POST CHANGE SCROLL RESET
  ================================= */

  /*
    [GROUP 1 신규 기능]

    Related Styles는 Detail 페이지 하단에 있습니다.

    따라서 사용자가:

    post-01 하단
    → Related Styles의 post-02 클릭

    처럼 이동하면 브라우저 / SPA 구조에 따라
    이전 스크롤 위치가 유지될 수 있습니다.

    currentPostId가 변경될 때마다
    페이지 최상단으로 이동하여
    새로운 Detail을 처음부터 볼 수 있게 합니다.

    behavior: 'auto'
    - 애니메이션 없이 즉시 상단 이동
    - 페이지 전환처럼 자연스럽게 보이도록 처리
    - 기존 레이아웃에는 영향을 주지 않음

    ※ Header / Router / Main은 수정하지 않습니다.
  */

  useEffect(() => {

    /*
      유효한 post ID가 없는 경우에도
      Empty State를 페이지 상단에서 볼 수 있도록
      동일하게 top 0으로 이동합니다.
    */

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })

  }, [currentPostId])


  /* =================================
     03-3. RESPONSIVE STATE
  ================================= */

  const [isMobile, setIsMobile] = useState(
    getIsMobile
  )


  /*
    화면 폭이 Mobile 구간으로 진입하거나
    Mobile에서 벗어나는 경우만
    React 상태를 갱신합니다.

    별도 npm 패키지는 사용하지 않습니다.
  */

  useEffect(() => {

    const mediaQuery = window.matchMedia(
      '(max-width: 767px)'
    )


    function handleChange(event) {
      setIsMobile(event.matches)
    }


    /*
      최초 mount 시에도
      현재 브라우저 크기를 다시 반영합니다.
    */

    setIsMobile(mediaQuery.matches)


    /*
      최신 브라우저
    */

    if (mediaQuery.addEventListener) {

      mediaQuery.addEventListener(
        'change',
        handleChange
      )

      return () => {

        mediaQuery.removeEventListener(
          'change',
          handleChange
        )

      }

    }


    /*
      구형 브라우저 호환 처리
    */

    mediaQuery.addListener(handleChange)

    return () => {
      mediaQuery.removeListener(handleChange)
    }

  }, [])


  /* =================================
     03-4. RELATED LOAD MORE STATE
  ================================= */

  /*
    Mobile Related Styles의 펼침 상태입니다.

    단순 true / false 대신
    "어느 게시글에서 펼쳤는가"를 저장합니다.

    예:

    expandedPostId = 'post-01'

    post-01에서는 펼쳐진 상태지만
    post-02로 이동하면:

    expandedPostId !== currentPostId

    가 되므로 자동으로 초기 상태로 돌아갑니다.

    따라서 별도의 reset useEffect가 필요 없습니다.
  */

  const [
    expandedPostId,
    setExpandedPostId,
  ] = useState(null)


  const isRelatedExpanded =
    expandedPostId === currentPostId


  /* =================================
     04. POST DATA
  ================================= */

  /*
    Main 데이터와 Detail 데이터는
    동일한 post ID를 기준으로 연결합니다.
  */

  const post = communityPosts.find(
    (item) => item.id === currentPostId
  )

  const detail =
    communityDetailData[currentPostId]


  /* =================================
     05. NOT FOUND / EMPTY STATE
  ================================= */

  /*
    다음 경우 동일한 Empty State를 출력합니다.

    1. Main 데이터에 post가 없음
    2. Detail 데이터가 없음
    3. URL 형식이 잘못되어 currentPostId가 null

    예:

    /community/post-99
    /community/foo
    /community/post-1
  */

  if (!post || !detail) {

    return (

      <main className="mooday-detail">

        <div className="mooday-detail__inner">

          <div className="mooday-detail__empty">

            <h1>
              게시글을 찾을 수 없습니다.
            </h1>

            <p>
              요청한 게시글이 존재하지 않습니다.
            </p>

            {/*
              Router 공통 파일을 수정하지 않고
              기존 Community Main 경로로 이동합니다.
            */}

            <a href="/community">
              Community Main으로 돌아가기 →
            </a>

          </div>

        </div>

      </main>

    )

  }


  /* =====================================
     06. RELATED STYLES DATA
  ===================================== */

  /*
    Community Main의 게시글 순서를 유지하면서
    현재 보고 있는 게시글만 제외합니다.

    전체 데이터:
    post-01 ~ post-09 = 9개

    현재 게시글 1개 제외:
    Related Styles = 8개
  */

  const relatedPosts = communityPosts.filter(
    (item) => item.id !== currentPostId
  )


  /*
    Desktop / Tablet:
    → 전체 8개

    Mobile:
    → 초기 4개

    Mobile에서 Load More를 누른 경우:
    → 전체 8개
  */

  const shouldLimitRelated =
    isMobile && !isRelatedExpanded


  const visibleRelatedPosts =
    shouldLimitRelated
      ? relatedPosts.slice(0, 4)
      : relatedPosts


  /*
    Mobile에서만,
    실제 숨겨진 게시글이 있을 경우
    Load More 버튼을 출력합니다.
  */

  const showLoadMore =
    shouldLimitRelated
    && relatedPosts.length > 4


  function handleLoadMore() {

    /*
      현재 게시글 ID를 저장하여
      이 게시글에서만 Related를 펼칩니다.
    */

    setExpandedPostId(currentPostId)

  }


  /* =====================================
     07. PAGE RENDER
  ===================================== */

  return (

    <main
      className="mooday-detail"
      id="community-detail"
    >

      <div className="mooday-detail__inner">


        {/* =================================
            01. HERO / PRODUCTS
        ================================= */}

        <section className="mooday-detail__hero">


          {/* -----------------------------
              IMAGE GALLERY

              key={currentPostId}

              게시글이 변경되면 Gallery를
              새 컴포넌트로 다시 mount합니다.

              따라서 DetailGallery 내부의
              selectedIndex가 다시 0이 되고,
              첫 번째 이미지부터 표시됩니다.
          ----------------------------- */}

          <DetailGallery
            key={currentPostId}
            images={detail.gallery}
            author={post.author}
          />


          {/* -----------------------------
              STYLED PRODUCTS

              Shop Router가 아직 확정되지 않았으므로
              현재 products 데이터 구조만 유지합니다.

              실제 Product URL 연동은
              Shop 개발 완료 후 별도 연결합니다.
          ----------------------------- */}

          <StyledProducts
            products={detail.products}
          />


        </section>


        {/* =================================
            02. POST / COMMENTS
        ================================= */}

        <section className="mooday-detail__content">


          {/* -----------------------------
              POST

              GROUP 2에서:
              Like toggle / count 기능을
              이 컴포넌트에 추가할 예정입니다.
          ----------------------------- */}

          <DetailPost
            key={currentPostId}
            post={post}
            detail={detail}
          />


          {/* -----------------------------
              COMMENTS

              GROUP 3:
              댓글 입력 / 등록 / Count 연동.

              key={currentPostId}를 사용하여
              게시글 변경 시 입력값과
              sessionComments를 초기화합니다.

              GROUP 4에서:
              현재 세션 댓글 수정 / 삭제 기능을
              추가할 예정입니다.
          ----------------------------- */}

          <DetailComments
            key={currentPostId}
            comments={detail.comments}
            count={detail.commentCount}
          />


        </section>


        {/* =================================
            03. HASHTAGS
        ================================= */}

        <section
          className="mooday-detail__hashtags"
          aria-labelledby="detail-hashtags-title"
        >

          <h2 id="detail-hashtags-title">
            해시태그
          </h2>


          <div className="mooday-detail__tag-list">


            {detail.hashtags.map((tag) => (

              <span
                className="mooday-detail__tag"
                key={tag}
              >

                #{tag}

              </span>

            ))}


            {/*
              기존 시안의 + 표시입니다.

              현재 기능이 없는 장식 UI이므로
              button으로 변경하지 않습니다.
            */}

            <span
              className="mooday-detail__tag-add"
              aria-hidden="true"
            >

              +

            </span>


          </div>

        </section>


        {/* =================================
            04. RELATED STYLES
        ================================= */}

        <section
          className="mooday-detail__related"
          aria-labelledby="detail-related-title"
        >


          {/* -----------------------------
              RELATED HEADER
          ----------------------------- */}

          <div className="mooday-detail__related-heading">

            <h2 id="detail-related-title">
              Related Styles
            </h2>


            {/*
              View All은 Community Main으로 이동.

              Main / Router 파일은
              이번 작업에서 수정하지 않습니다.
            */}

            <a href="/community">

              View All

              <span aria-hidden="true">
                →
              </span>

            </a>

          </div>


          {/* -----------------------------
              RELATED CARD GRID

              currentPostId를 제외한
              다른 게시글만 렌더링합니다.

              Desktop / Tablet:
              → 8개

              Mobile:
              → 최초 4개
          ----------------------------- */}

          <div
            className="mooday-detail__related-grid"
            id="mooday-detail-related-grid"
          >

            {visibleRelatedPosts.map(
              (relatedPost) => (

                <CommunityCard
                  key={relatedPost.id}
                  post={relatedPost}
                />

              )
            )}

          </div>


          {/* -----------------------------
              MOBILE LOAD MORE

              Mobile 최초 상태에서만 표시.

              클릭:
              4개 → 8개

              전체 표시 후 버튼은 사라집니다.
          ----------------------------- */}

          {showLoadMore && (

            <div className="mooday-detail__load-more">

              <button
                type="button"
                className="mooday-detail__load-more-button"
                onClick={handleLoadMore}
                aria-controls="mooday-detail-related-grid"
              >

                Load More

                <span aria-hidden="true">
                  +
                </span>

              </button>

            </div>

          )}


        </section>


      </div>

    </main>

  )

}