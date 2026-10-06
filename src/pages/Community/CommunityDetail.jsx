import {
  useEffect,
  useState,
} from 'react'

import CommunityCard from '../../components/community/CommunityCard.jsx'
import DetailGallery from '../../components/community/DetailGallery.jsx'
import StyledProducts from '../../components/community/StyledProducts.jsx'
import DetailPost from '../../components/community/DetailPost.jsx'
import DetailComments from '../../components/community/DetailComments.jsx'

import {
  communityPosts,
} from '../../data/Community.js'

import {
  communityDetailData,
} from '../../data/CommunityDetail.js'

import './Community.css'
import './CommunityDetail.css'

import {
  products,
} from '../../data/Products.js'


/* =====================================
   POST ID
===================================== */

function getPostIdFromPath() {
  if (typeof window === 'undefined') {
    return null
  }

  const match =
    window.location.pathname.match(
      /^\/community\/(post-\d{2})\/?$/
    )

  return match ? match[1] : null
}


/* =====================================
   COMMUNITY DETAIL
===================================== */

export default function CommunityDetail({
  postId,
}) {
  const [
    pathPostId,
    setPathPostId,
  ] = useState(
    getPostIdFromPath
  )


  /* =================================
     URL CHANGE
  ================================= */

  useEffect(() => {
    function handlePopState() {
      setPathPostId(
        getPostIdFromPath()
      )
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


  const currentPostId =
    postId ?? pathPostId


  /* =================================
     POST CHANGE SCROLL RESET
  ================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [currentPostId])


  /* =================================
     DATA
  ================================= */

const post =
  communityPosts.find(
    (item) =>
      item.id === currentPostId
  )

const detail =
  communityDetailData[currentPostId]


const styledProducts =
  (detail?.productIds ?? [])
    .map((productId) =>
      products.find(
        (product) =>
          product.id === productId
      )
    )
    .filter(Boolean)


/* =================================
   EMPTY STATE
================================= */
  /* =================================
     EMPTY STATE
  ================================= */

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

            <a href="/community">
              Community Main으로 돌아가기 →
            </a>
          </div>

        </div>
      </main>
    )
  }


  /* =================================
     RELATED POSTS
  ================================= */

  const relatedPosts =
    communityPosts.filter(
      (item) =>
        item.id !== currentPostId
    )


  /* =================================
     RENDER
  ================================= */

  return (
    <main
      className="mooday-detail"
      id="community-detail"
    >
      <div className="mooday-detail__inner">


        {/* =================================
            HERO
        ================================= */}

        <section className="mooday-detail__hero">


          {/* LEFT — GALLERY */}

          <DetailGallery
            key={currentPostId}
            images={detail.gallery}
            author={post.author}
          />


          {/* RIGHT — PRODUCTS / POST / TAGS */}

          <div className="mooday-detail__side">


            {/* PRODUCTS */}

            <StyledProducts
              products={styledProducts}
            />


            {/* POST */}

            <section className="mooday-detail__post-section">

              <DetailPost
                key={currentPostId}
                post={post}
                detail={detail}
              />


              {/* HASHTAGS */}

              {detail.hashtags?.length > 0 && (
                <div className="mooday-detail__hashtags">
                  <div className="mooday-detail__tag-list">
                    {detail.hashtags.map((tag) => (
                      <span
                        className="mooday-detail__tag"
                        key={tag}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </section>


          </div>


        </section>


        {/* =================================
            COMMENTS
        ================================= */}

        <section className="mooday-detail__comments-section">

          <DetailComments
            key={currentPostId}
            comments={detail.comments}
            count={detail.commentCount}
          />

        </section>


        {/* =================================
            RELATED STYLES
        ================================= */}

        <section
          className="mooday-detail__related"
          aria-labelledby="detail-related-title"
        >

          <div className="mooday-detail__related-heading">

            <h2 id="detail-related-title">
              Related Styles
            </h2>

            <a href="/community">
              View All

              <span aria-hidden="true">
                →
              </span>
            </a>

          </div>


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

        </section>


      </div>
    </main>
  )
}