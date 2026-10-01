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

  3. Related Styles 최신 반응형 정책
     - 현재 게시글 제외
     - Desktop / Tablet / Mobile 전체 8개 표시
     - Mobile 2열 × 4행
     - Mobile Load More 제거

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
   02. MAIN COMPONENT
===================================== */

export default function CommunityDetail({ postId }) {


  /* =================================
     02-1. CURRENT POST ID
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
     02-2. GROUP 1
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
    최신 Related Styles 정책:

    Desktop / Tablet / Mobile 모두
    현재 게시글을 제외한 8개를 한 번에 표시합니다.

    Mobile은 2열 × 4행으로 구성하며,
    별도의 Load More 상태나 버튼을 사용하지 않습니다.
  */


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

              Desktop / Tablet / Mobile:
              → 현재 게시글 제외 8개 전체 표시

              Mobile:
              → 2열 × 4행
          ----------------------------- */}

          <div
            className="mooday-detail__related-grid"
            id="mooday-detail-related-grid"
          >

            {relatedPosts.map(
              (relatedPost) => (

                <CommunityCard
                  key={relatedPost.id}
                  post={relatedPost}
                />

              )
            )}

          </div>


          {/*
            Mobile도 Related 8개를 모두 표시하므로
            별도의 Load More UI는 사용하지 않습니다.
          */}


        </section>


      </div>

    </main>

  )

}