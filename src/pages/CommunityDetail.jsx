
import { useEffect, useState } from 'react'

import CommunityCard from '../components/community/CommunityCard.jsx'
import DetailGallery from '../components/community/DetailGallery.jsx'
import StyledProducts from '../components/community/StyledProducts.jsx'
import DetailPost from '../components/community/DetailPost.jsx'
import DetailComments from '../components/community/DetailComments.jsx'

import { communityPosts } from '../data/community.js'
import { communityDetailData } from '../data/communityDetail.js'

import '../styles/community.css'
import '../styles/communityDetail.css'


/*
  =========================================
  MOODAY COMMUNITY DETAIL
  Responsive Version 1.1
  =========================================

  변경 사항:

  1. Mobile Related Styles 초기 4개 표시
  2. Load More 클릭 시 전체 8개 표시
  3. Desktop / Tablet에서는 항상 전체 표시
  4. 게시글 변경 시 Load More 초기화

  유지 사항:

  - 기존 post-01 ~ post-09
  - 기존 이미지 / 상품 데이터
  - Detail 갤러리
  - Post / Comments
  - Hashtags
  - 기존 카드 이동 경로

  Header / Footer / Router는 포함하지 않습니다.
*/


/* =====================================
   01. POST ID
===================================== */

/*
  현재 임시 App.jsx 구조와 호환됩니다.

  App에서 postId를 전달하면 해당 값을 사용하고,
  전달하지 않으면 URL에서 읽습니다.
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

  화면 크기가 변경되면 상태를 갱신합니다.

  별도의 npm 패키지는 사용하지 않습니다.
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
     CURRENT POST ID
  ================================= */

  const [pathPostId, setPathPostId] = useState(
    getPostIdFromPath
  )


  /*
    기존 URL 변경 감지 기능 유지.
  */

  useEffect(() => {

    function handlePopState() {
      setPathPostId(getPostIdFromPath())
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }

  }, [])


  const currentPostId = postId ?? pathPostId


  /* =================================
     RESPONSIVE STATE
  ================================= */

  const [isMobile, setIsMobile] = useState(getIsMobile)


  /*
    화면 폭이 Mobile 구간으로 진입하거나
    Mobile에서 벗어나는 상황을 처리합니다.

    matchMedia를 사용하므로
    불필요하게 모든 픽셀 단위의 resize에서
    React 상태를 갱신하지 않습니다.
  */

  useEffect(() => {

    const mediaQuery = window.matchMedia(
      '(max-width: 767px)'
    )

    function handleChange(event) {
      setIsMobile(event.matches)
    }

    setIsMobile(mediaQuery.matches)


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
     LOAD MORE STATE
  ================================= */

  /*
    단순 boolean 대신 펼쳐진 게시글 ID를 저장합니다.

    예:
    expandedPostId = 'post-01'

    현재 게시글이 post-02로 변경되면
    자동으로 펼침 상태가 해제됩니다.

    따라서 게시글 변경 시 별도의
    setState 초기화 Effect가 필요하지 않습니다.
  */

  const [expandedPostId, setExpandedPostId] = useState(null)


  const isRelatedExpanded =
    expandedPostId === currentPostId


  /* =================================
     POST DATA
  ================================= */

  const post = communityPosts.find(
    (item) => item.id === currentPostId
  )

  const detail = communityDetailData[currentPostId]


  /* =================================
     EMPTY STATE
  ================================= */

  if (!post || !detail) {

    return (

      <main className="mooday-detail">

        <div className="mooday-detail__inner">

          <div className="mooday-detail__empty">

            <h1>게시글을 찾을 수 없습니다.</h1>

            <p>
              요청한 게시글이 존재하지 않습니다.
            </p>

            <a href="/community">
              Community Main으로 돌아가기 →
            </a>

          </div>

        </div>

      </main>

    )

  }


  /* =====================================
     04. RELATED STYLES DATA
  ================================= */

  /*
    기존 Main 게시글 순서를 유지합니다.

    현재 게시글 1개만 제외하므로
    현재 데이터에서는 총 8개가 됩니다.
  */

  const relatedPosts = communityPosts.filter(
    (item) => item.id !== currentPostId
  )


  /*
    Desktop / Tablet:
    전체 게시글 표시

    Mobile:
    초기 4개
    Load More 클릭 후 전체 표시
  */

  const shouldLimitRelated =
    isMobile && !isRelatedExpanded


  const visibleRelatedPosts = shouldLimitRelated
    ? relatedPosts.slice(0, 4)
    : relatedPosts


  /*
    Mobile에서만,
    숨겨진 게시글이 있을 때 버튼 표시
  */

  const showLoadMore =
    shouldLimitRelated && relatedPosts.length > 4


  function handleLoadMore() {

    setExpandedPostId(currentPostId)

  }


  /* =====================================
     05. PAGE RENDER
  ================================= */

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

          <DetailGallery
            key={currentPostId}
            images={detail.gallery}
            author={post.author}
          />

          <StyledProducts
            products={detail.products}
          />

        </section>


        {/* =================================
            02. POST / COMMENTS
        ================================= */}

        <section className="mooday-detail__content">

          <DetailPost
            post={post}
            detail={detail}
          />

          <DetailComments
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
              기존 시안의 + UI 유지.

              기능 미구현 상태이므로
              실제 button으로 변경하지 않습니다.
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

          <div className="mooday-detail__related-heading">

            <h2 id="detail-related-title">

              Related Styles

            </h2>


            {/*
              View All은 기존대로
              Community Main으로 이동합니다.
            */}

            <a href="/community">

              View All

              <span aria-hidden="true">
                →
              </span>

            </a>

          </div>


          {/* =================================
              RELATED CARD GRID
          ================================= */}

          <div
            className="mooday-detail__related-grid"
            id="mooday-detail-related-grid"
          >

            {visibleRelatedPosts.map((relatedPost) => (

              <CommunityCard
                key={relatedPost.id}
                post={relatedPost}
              />

            ))}

          </div>


          {/* =================================
              MOBILE LOAD MORE
          ================================= */}

          {/*
            Mobile에서 최초 4개만 보이는 경우
            Load More 버튼을 표시합니다.

            클릭 후에는 전체 8개를 표시하며
            버튼은 자동으로 사라집니다.

            Desktop / Tablet에서는
            버튼 자체가 렌더링되지 않습니다.
          */}

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