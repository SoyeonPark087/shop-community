import { useEffect, useState } from 'react'

import CommunityCard from '../../components/community/CommunityCard.jsx'

import {
  communityMainTags,
  communityPosts,
} from '../../data/Community.js'

import './Community.css'


const SORT_MODE = {
  LATEST: 'LATEST',
  POPULAR: 'POPULAR',
}

const POSTS_PER_PAGE = 9



function getSortedPosts(posts, sortMode) {

  const copiedPosts = [...posts]


  if (sortMode === SORT_MODE.POPULAR) {

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

export default function Community() {



  const [sortMode, setSortMode] = useState(
    SORT_MODE.LATEST
  )

  const [selectedTag, setSelectedTag] = useState('All')


  const [currentPage, setCurrentPage] = useState(1)


  const tagFilteredPosts =
    selectedTag === 'All'
      ? communityPosts
      : communityPosts.filter(
          (post) =>
            post.tags.includes(selectedTag)
        )


  const sortedPosts = getSortedPosts(
    tagFilteredPosts,
    sortMode
  )


  const isEmpty =
    communityPosts.length === 0

  const hasNoResults =
    !isEmpty
    && tagFilteredPosts.length === 0

  const totalPages = Math.max(
    1,
    Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  )

  const startIndex =
    (currentPage - 1) * POSTS_PER_PAGE

  const visiblePosts = sortedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  )


  function handleTagSelect(tag) {
    setSelectedTag(tag)
    setCurrentPage(1)
    }


  function handleLatestSort() {
    setSortMode(SORT_MODE.LATEST)
    setCurrentPage(1)
  }

  function handlePopularSort() {
    setSortMode(SORT_MODE.POPULAR)
    setCurrentPage(1)
  }
  


  return (

    <main
      className="mooday-community"
      id="community-main"
    >

      <div className="mooday-community__inner">


        <div className="mooday-community__top">

          <div
            className="mooday-community__tabs"
            aria-label="게시글 정렬"
          >

            <button
              type="button"
              className={
                `mooday-community__tab ${
                  sortMode === SORT_MODE.LATEST
                    ? 'mooday-community__tab--active'
                    : 'mooday-community__tab--pending'
                }`
              }
              onClick={handleLatestSort}
              aria-pressed={
                sortMode === SORT_MODE.LATEST
              }
            >
              LATEST
            </button>


            <button
              type="button"
              className={
                `mooday-community__tab ${
                  sortMode === SORT_MODE.POPULAR
                    ? 'mooday-community__tab--active'
                    : 'mooday-community__tab--pending'
                }`
              }
              onClick={handlePopularSort}
              aria-pressed={
                sortMode === SORT_MODE.POPULAR
              }
            >
              POPULAR
            </button>

          </div>

        </div>



        {!isEmpty && (

          <div className="mooday-community__tools">

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
            
          <a
            className="mooday-community__write"
            href="/community/write"
          >

            Write

          </a>

          </div>

        )}


        {isEmpty ? (

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
              다른 태그를 선택해 주세요.
            </p>

            <button
              type="button"
              className="mooday-community-no-results__reset"
              onClick={() => {
                setSelectedTag('All')
                setCurrentPage(1)
              }}
            >
              View all
            </button>

          </section>

        ) : (

          <div className="mooday-community-grid">
            {visiblePosts.map((post) => (
              <CommunityCard
                key={post.id}
                post={post}
              />
            ))}
          </div>

        )}


        {!isEmpty && !hasNoResults && totalPages && (
          <nav
            className="mooday-community__pagination"
            aria-label="커뮤니티 페이지"
          >
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              FIRST
            </button>

            <button
              type="button"
              aria-label="이전 페이지"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.max(1, prev - 1)
                )
              }
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                className={
                  currentPage === page
                    ? 'is-current'
                    : ''
                }
                aria-current={
                  currentPage === page
                    ? 'page'
                    : undefined
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              aria-label="다음 페이지"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(totalPages, prev + 1)
                )
              }
              disabled={currentPage === totalPages}
            >
              ›
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              LAST
            </button>
          </nav>
        )}


      </div>

    </main>

  )

}