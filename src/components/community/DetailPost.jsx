import {
  useState,
} from 'react'


export default function DetailPost({
  post,
  detail,
}) {


  /* =================================
     AUTHOR
  ================================= */

  const authorInitial =
    post.author.charAt(0).toUpperCase()


  /* =================================
     LIKE STATE
  ================================= */

  const [
    isLiked,
    setIsLiked,
  ] = useState(false)

  const [
    likeCount,
    setLikeCount,
  ] = useState(
    Number.isFinite(post.likes)
      ? post.likes
      : 0
  )


  /* =================================
     LIKE TOGGLE
  ================================= */

  function handleLikeToggle() {
    if (isLiked) {
      setLikeCount(
        (currentCount) =>
          Math.max(
            0,
            currentCount - 1
          )
      )

      setIsLiked(false)

      return
    }

    setLikeCount(
      (currentCount) =>
        currentCount + 1
    )

    setIsLiked(true)
  }


  /* =================================
     EDIT
  ================================= */

  function handleEdit() {
    console.log(
      '게시글 수정:',
      post.id
    )
  }


  /* =================================
     DELETE
  ================================= */

  function handleDelete() {
    const shouldDelete =
      window.confirm(
        '이 게시글을 삭제하시겠습니까?'
      )

    if (!shouldDelete) {
      return
    }

    console.log(
      '게시글 삭제:',
      post.id
    )
  }


  /* =================================
     RENDER
  ================================= */

  return (
    <article className="mooday-detail-post">


      {/* SECTION TITLE */}

      <h2 className="mooday-detail-section-title">
        POST
      </h2>


      {/* =================================
          HEADER
      ================================= */}

      <div className="mooday-detail-post__header">


        {/* AUTHOR */}

        <div className="mooday-detail-post__author">

          <div
            className="mooday-detail-avatar"
            aria-hidden="true"
          >
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


        {/* ACTIONS */}

        <div className="mooday-detail-post__actions">


          {/* LIKE */}

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


          {/* EDIT */}

          <button
            type="button"
            className="mooday-detail-post__edit"
            onClick={handleEdit}
          >
            수정
          </button>


          {/* DELETE */}

          <button
            type="button"
            className="mooday-detail-post__delete"
            onClick={handleDelete}
          >
            삭제
          </button>


        </div>

      </div>


      {/* =================================
          POST CONTENT
      ================================= */}

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