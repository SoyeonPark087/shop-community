
/*
  =========================================
  DETAIL POST
  =========================================

  작성자 프로필 아이콘 유지.

  좋아요 및 더보기는
  현재 시각적 표시만 구현합니다.
*/


export default function DetailPost({
  post,
  detail,
}) {

  const authorInitial =
    post.author.charAt(0).toUpperCase()


  return (

    <article className="mooday-detail-post">


      <h2 className="mooday-detail-section-title">
        POST
      </h2>


      {/* =================================
          AUTHOR
      ================================= */}

      <div className="mooday-detail-post__header">

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


        <div className="mooday-detail-post__actions">

          {/*
            좋아요는 현재 UI만 표시합니다.
            실제 좋아요 기능은 후속 구현입니다.
          */}

          <span
            className="mooday-detail-post__likes"
            aria-label={`좋아요 ${detail.likes}개`}
          >

            <span aria-hidden="true">
              ♡
            </span>

            {detail.likes}

          </span>


          {/*
            더보기 메뉴는 UI만 표시합니다.
          */}

          <span
            className="mooday-detail-post__more"
            aria-hidden="true"
          >
            ···
          </span>

        </div>

      </div>


      {/* =================================
          POST CONTENT
      ================================= */}

      <div className="mooday-detail-post__body">

        {detail.body.map((paragraph, index) => (

          <p key={index}>
            {paragraph}
          </p>

        ))}

      </div>


    </article>

  )

}