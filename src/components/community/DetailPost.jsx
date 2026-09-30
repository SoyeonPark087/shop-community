import { useState } from 'react'


/*
  =========================================
  DETAIL POST
  GROUP 2 — LIKE INTERACTION / STEP 1 DATA LINK
  =========================================

  기존 유지:

  - 작성자 프로필 아이콘
  - 작성 시간
  - 게시글 본문
  - 더보기 UI

  Like 기능:

  1. 좋아요 버튼 클릭 가능
  2. 좋아요 On / Off 토글
  3. Like Count +1 / -1
  4. aria-pressed 접근성 상태

  STEP 1 변경:

  - Like 초기값을 communityDetail.js의 detail.likes가 아니라
    community.js의 post.likes에서 가져옵니다.

  중요:

  - 실제 DB 저장은 하지 않습니다.
  - localStorage / sessionStorage에도 저장하지 않습니다.
  - 새로고침 시 community.js의 post.likes 초기값으로 돌아갑니다.
  - CommunityDetail.jsx에서 key={currentPostId}를 사용하므로
    다른 게시글로 이동하면 해당 게시글의 Like 상태로 초기화됩니다.
*/


export default function DetailPost({
  post,
  detail,
}) {


  /* =================================
     01. AUTHOR
  ================================= */

  const authorInitial =
    post.author.charAt(0).toUpperCase()


  /* =================================
     02. LIKE STATE
  ================================= */

  /*
    현재 세션에서 좋아요를 눌렀는지 저장합니다.

    백엔드 / 계정 연동이 없으므로
    Detail 진입 시 항상 false로 시작합니다.
  */

  const [isLiked, setIsLiked] = useState(false)


  /*
    화면에 출력할 Like Count입니다.

    STEP 1부터 Like의 단일 기준값은:
    community.js → post.likes

    Main Popular과 Detail 초기 Like가
    같은 값을 사용할 수 있도록
    Detail 데이터의 중복 likes 값을 제거합니다.

    데이터가 숫자가 아닌 경우를 대비해
    0으로 안전하게 대체합니다.
  */

  const [likeCount, setLikeCount] = useState(
    Number.isFinite(post.likes)
      ? post.likes
      : 0
  )


  /* =================================
     03. LIKE TOGGLE EVENT
  ================================= */

  function handleLikeToggle() {

    /*
      현재 좋아요가 On 상태라면:

      true → false
      count - 1

      Math.max()로 0 아래로 내려가지 않게 방어합니다.
    */

    if (isLiked) {

      setLikeCount((currentCount) =>
        Math.max(0, currentCount - 1)
      )

      setIsLiked(false)

      return

    }


    /*
      현재 좋아요가 Off 상태라면:

      false → true
      count + 1
    */

    setLikeCount((currentCount) =>
      currentCount + 1
    )

    setIsLiked(true)

  }


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

          {/* =================================
              LIKE BUTTON
          ================================= */}

          {/*
            Off:
            ♡ + 초기 Like 수

            On:
            ♥ + 초기 Like 수 + 1
          */}

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
              {isLiked ? '♥' : '♡'}
            </span>

            {likeCount}

          </button>


          {/*
            더보기 메뉴는 기존과 동일하게
            현재 시각적 UI만 유지합니다.
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