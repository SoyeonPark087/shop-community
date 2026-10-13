import { useState } from 'react'

export default function DetailPost({ post, detail }) {

  const authorInitial = post.author.charAt(0).toUpperCase()

  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Number.isFinite(post.likes) ? post.likes : 0)

  function handleLikeToggle() {
    setLikeCount((count) => isLiked ? Math.max(0, count - 1) : count + 1)
    setIsLiked((liked) => !liked)
  }

  function handleDelete() {
    // 서버 삭제는 연결되지 않았으며 확인창만 표시합니다.
    window.confirm('이 게시글을 삭제하시겠습니까?')
  }

  return (
    <article className="mooday-detail-post">

      <h2 className="mooday-detail-section-title">
        POST
      </h2>

      <div className="mooday-detail-post__header">

        <div className="mooday-detail-post__author">

          <div className="mooday-detail-avatar" aria-hidden="true">
            {authorInitial}
          </div>

          <div className="mooday-detail-post__author-info">

            <strong>
              @{post.author}
            </strong>

            <span>
              {detail.time}
            </span>

          </div>

        </div>

        <div className="mooday-detail-post__actions">

          <button
            type="button"
            className={`mooday-detail-post__likes${
              isLiked
                ? ' mooday-detail-post__likes--active'
                : ''
            }`}
            onClick={handleLikeToggle}
            aria-pressed={isLiked}
            aria-label={
              isLiked
                ? `좋아요 취소, 현재 ${likeCount}개`
                : `좋아요 추가, 현재 ${likeCount}개`
            }
          >

          <span aria-hidden="true">
            ♥
          </span>

            {likeCount}

          </button>

          <button type="button" className="mooday-detail-post__edit">
            수정
          </button>

          <button type="button" className="mooday-detail-post__delete" onClick={handleDelete}>
            삭제
          </button>

        </div>

      </div>

      <div className="mooday-detail-post__body">

        {detail.body.map(
          (paragraph, index) => (

            <p key={index}>
              {paragraph}
            </p>

          )
        )}

      </div>

    </article>
  )
}
