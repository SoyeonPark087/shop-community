
/*
  =========================================
  DETAIL COMMENTS
  =========================================

  댓글 목록은 샘플 데이터를 표시합니다.

  댓글 입력 및 등록 기능은 후속 구현입니다.

  현재 등록 버튼은 disabled 상태로 표시합니다.
*/


export default function DetailComments({
  comments = [],
  count = 0,
}) {

  return (

    <section
      className="mooday-detail-comments"
      aria-labelledby="detail-comments-title"
    >


      {/* =================================
          TITLE
      ================================= */}

      <h2
        className="mooday-detail-section-title"
        id="detail-comments-title"
      >

        COMMENTS

        <span>
          {count}
        </span>

      </h2>


      {/* =================================
          COMMENT LIST
      ================================= */}

      <div className="mooday-detail-comments__list">

        {comments.map((comment) => (

          <article
            className="mooday-detail-comment"
            key={comment.id}
          >


            <div
              className="mooday-detail-avatar
                mooday-detail-avatar--comment"
              aria-hidden="true"
            >

              {comment.author.charAt(0).toUpperCase()}

            </div>


            <div className="mooday-detail-comment__content">

              <strong>
                @{comment.author}
              </strong>

              <p>
                {comment.text}
              </p>

              <span className="mooday-detail-comment__time">
                {comment.time}
              </span>

            </div>


            <span
              className="mooday-detail-comment__more"
              aria-hidden="true"
            >
              ···
            </span>


          </article>

        ))}

      </div>


      {/* =================================
          COMMENT INPUT UI
      ================================= */}

      <div className="mooday-detail-comments__composer">


        <div
          className="
            mooday-detail-avatar
            mooday-detail-avatar--comment
          "
          aria-hidden="true"
        >
          U
        </div>


        <div className="mooday-detail-comments__input-group">

          <label
            htmlFor="mooday-detail-comment-input"
            className="mooday-detail-visually-hidden"
          >
            댓글 입력
          </label>


          <input
            id="mooday-detail-comment-input"
            type="text"
            placeholder="댓글을 입력해주세요."
            disabled
          />


          <button
            type="button"
            disabled
            aria-label="댓글 등록 기능 준비 중"
          >

            등록

          </button>

        </div>


      </div>


    </section>

  )

}