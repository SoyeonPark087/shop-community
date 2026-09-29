import { useState } from 'react'


/*
  =========================================
  DETAIL COMMENTS
  GROUP 4 — SESSION COMMENT EDIT / DELETE
  =========================================

  [GROUP 3에서 유지되는 기능]

  1. 댓글 입력 가능
  2. 공백 댓글 등록 방지
  3. 등록 버튼 클릭으로 댓글 생성
  4. Enter 키로 댓글 등록
  5. 등록 즉시 댓글 목록 하단에 표시
  6. 등록 후 입력창 초기화
  7. 기존 count + sessionComments.length 로
     댓글 수 자동 계산
  8. 게시글 변경 시 CommunityDetail의
     key={currentPostId}로 현재 세션 댓글 초기화

  [GROUP 4 신규 기능]

  9. 현재 세션에서 작성한 댓글만 수정 가능
  10. 현재 세션에서 작성한 댓글만 삭제 가능
  11. ··· 버튼 클릭 → 수정 / 삭제 메뉴
  12. 수정 모드 → 저장 / 취소
  13. Enter → 수정 저장
  14. Escape → 수정 취소
  15. 수정 완료 시 "수정됨" 표시
  16. 삭제 전 확인 UI 제공
  17. 삭제 취소 가능
  18. 삭제 시 sessionComments에서 제거
      → 댓글 Count도 자동 감소

  중요:

  - 기존 comments prop은 계속 읽기 전용입니다.
  - 기존 샘플 댓글에는 수정 / 삭제 기능을 넣지 않습니다.
  - sessionComments에만 수정 / 삭제 기능을 제공합니다.
  - 실제 DB / 로그인 계정 / 저장 기능은 없습니다.
  - 새로고침 또는 다른 post 이동 시 세션 데이터는 초기화됩니다.
*/


export default function DetailComments({
  comments = [],
  count = 0,
}) {


  /* =================================
     01. COMMENT INPUT STATE
  ================================= */

  /*
    새 댓글 입력값.

    GROUP 3에서 추가한 state를 그대로 유지합니다.
  */

  const [commentInput, setCommentInput] = useState('')


  /* =================================
     02. SESSION COMMENTS STATE
  ================================= */

  /*
    현재 페이지 세션에서 사용자가 직접 작성한 댓글만
    별도의 배열로 관리합니다.

    기존 comments prop은 수정하지 않습니다.

    GROUP 4에서는 이 배열 안의 댓글만:
    - 수정
    - 삭제

    할 수 있습니다.
  */

  const [sessionComments, setSessionComments] = useState([])


  /* =================================
     03. GROUP 4
     ACTIVE MENU STATE
  ================================= */

  /*
    현재 ··· 메뉴가 열려 있는 댓글 ID입니다.

    null:
    아무 메뉴도 열려 있지 않음

    예:
    'session-comment-1234'
    → 해당 댓글 메뉴만 열림
  */

  const [activeMenuId, setActiveMenuId] = useState(null)


  /* =================================
     04. GROUP 4
     EDIT STATE
  ================================= */

  /*
    현재 수정 중인 댓글 ID.
  */

  const [editingCommentId, setEditingCommentId] = useState(null)


  /*
    수정 input 안에 들어갈 임시 텍스트입니다.

    사용자가 수정 도중 내용을 변경해도
    저장 버튼을 누르기 전까지는
    실제 sessionComments를 변경하지 않습니다.
  */

  const [editingText, setEditingText] = useState('')


  /* =================================
     05. GROUP 4
     DELETE CONFIRM STATE
  ================================= */

  /*
    삭제 확인 상태인 댓글 ID입니다.

    null이면 삭제 확인 UI가 없습니다.
  */

  const [deletingCommentId, setDeletingCommentId] = useState(null)


  /* =================================
     06. DERIVED VALUES
  ================================= */

  /*
    신규 댓글 등록 가능 여부.

    GROUP 3 규칙 그대로 유지합니다.
  */

  const trimmedComment = commentInput.trim()

  const canSubmit = trimmedComment.length > 0


  /*
    댓글 Count는 별도 state로 관리하지 않습니다.

    기존 count
    +
    현재 남아 있는 sessionComments 수

    로 계산합니다.

    따라서:

    댓글 등록 → 자동 +1
    댓글 삭제 → 자동 -1
    댓글 수정 → 변화 없음
  */

  const displayCount =
    count + sessionComments.length


  /*
    수정 저장 가능 여부.

    신규 댓글 등록과 동일하게
    공백만 있는 경우 저장할 수 없습니다.
  */

  const trimmedEditingText = editingText.trim()

  const canSaveEdit =
    trimmedEditingText.length > 0


  /*
    수정 또는 삭제 확인 상태가 열려 있을 때
    다른 댓글의 메뉴를 동시에 조작하지 않기 위한 값입니다.
  */

  const hasTemporaryAction =
    editingCommentId !== null
    || deletingCommentId !== null


  /* =================================
     07. NEW COMMENT REGISTER
  ================================= */

  function handleSubmitComment() {

    /*
      공백만 입력했다면 등록하지 않습니다.
    */

    if (!canSubmit) {
      return
    }


    /*
      현재는 실제 로그인 사용자 정보가 없으므로
      임시 author는 user로 사용합니다.

      isEdited는 처음 작성할 때 false.

      GROUP 4에서 실제 수정이 일어났을 때만
      true로 바뀝니다.
    */

    const newComment = {
      id: `session-comment-${Date.now()}`,
      author: 'user',
      text: trimmedComment,
      time: '방금 전',
      isEdited: false,
    }


    setSessionComments((currentComments) => [
      ...currentComments,
      newComment,
    ])


    /*
      등록 후 입력창 초기화.
    */

    setCommentInput('')

  }


  /* =================================
     08. NEW COMMENT ENTER
  ================================= */

  function handleInputKeyDown(event) {

    if (event.key !== 'Enter') {
      return
    }

    event.preventDefault()

    handleSubmitComment()

  }


  /* =================================
     09. GROUP 4
     MENU TOGGLE
  ================================= */

  function handleMenuToggle(commentId) {

    /*
      수정 중이거나 삭제 확인 중이라면
      다른 댓글 메뉴를 새로 열지 않습니다.

      한 번에 하나의 임시 작업만 진행하도록
      상태 충돌을 방지합니다.
    */

    if (hasTemporaryAction) {
      return
    }


    /*
      같은 메뉴를 다시 누르면 닫고,
      다른 댓글 메뉴를 누르면 해당 댓글 메뉴로 교체합니다.
    */

    setActiveMenuId((currentId) =>
      currentId === commentId
        ? null
        : commentId
    )

  }


  /* =================================
     10. GROUP 4
     START EDIT
  ================================= */

  function handleStartEdit(comment) {

    /*
      현재 댓글의 원본 내용을
      editingText에 복사합니다.

      이 단계에서는 실제 댓글 데이터가
      아직 변경되지 않습니다.
    */

    setEditingCommentId(comment.id)
    setEditingText(comment.text)

    /*
      메뉴는 닫습니다.
    */

    setActiveMenuId(null)

    /*
      혹시 남아 있을 수 있는 삭제 상태도 정리합니다.
    */

    setDeletingCommentId(null)

  }


  /* =================================
     11. GROUP 4
     SAVE EDIT
  ================================= */

  function handleSaveEdit() {

    /*
      수정 대상이 없거나
      공백뿐인 경우 저장하지 않습니다.
    */

    if (
      editingCommentId === null
      || !canSaveEdit
    ) {
      return
    }


    /*
      sessionComments에서
      수정 중인 ID와 일치하는 댓글만 변경합니다.

      기존 객체를 직접 수정하지 않고
      새로운 배열 / 객체를 생성합니다.
    */

    setSessionComments((currentComments) =>
      currentComments.map((comment) => {

        if (comment.id !== editingCommentId) {
          return comment
        }

        return {
          ...comment,
          text: trimmedEditingText,
          isEdited: true,
        }

      })
    )


    /*
      수정 완료 후 편집 상태 초기화.
    */

    setEditingCommentId(null)
    setEditingText('')

  }


  /* =================================
     12. GROUP 4
     CANCEL EDIT
  ================================= */

  function handleCancelEdit() {

    /*
      editingText는 임시 state이므로
      취소하면 원래 sessionComments에는
      아무 변화가 없습니다.
    */

    setEditingCommentId(null)
    setEditingText('')

  }


  /* =================================
     13. GROUP 4
     EDIT KEYBOARD CONTROL
  ================================= */

  function handleEditKeyDown(event) {

    /*
      Enter:
      수정 저장
    */

    if (event.key === 'Enter') {

      event.preventDefault()

      handleSaveEdit()

      return

    }


    /*
      Escape:
      수정 취소
    */

    if (event.key === 'Escape') {

      event.preventDefault()

      handleCancelEdit()

    }

  }


  /* =================================
     14. GROUP 4
     START DELETE
  ================================= */

  function handleStartDelete(commentId) {

    /*
      삭제 메뉴를 누르면
      실제 삭제는 바로 하지 않고
      해당 댓글에 확인 UI를 표시합니다.
    */

    setDeletingCommentId(commentId)

    /*
      기존 ··· 메뉴는 닫습니다.
    */

    setActiveMenuId(null)

    /*
      수정 상태가 남아 있지 않도록 정리합니다.
    */

    setEditingCommentId(null)
    setEditingText('')

  }


  /* =================================
     15. GROUP 4
     CANCEL DELETE
  ================================= */

  function handleCancelDelete() {

    setDeletingCommentId(null)

  }


  /* =================================
     16. GROUP 4
     CONFIRM DELETE
  ================================= */

  function handleConfirmDelete(commentId) {

    /*
      sessionComments에서
      선택한 댓글을 제외한 새 배열을 만듭니다.
    */

    setSessionComments((currentComments) =>
      currentComments.filter(
        (comment) =>
          comment.id !== commentId
      )
    )


    /*
      삭제 확인 상태 및 메뉴 상태 초기화.
    */

    setDeletingCommentId(null)
    setActiveMenuId(null)


    /*
      Count는 별도로 수정하지 않습니다.

      displayCount가
      count + sessionComments.length
      구조이기 때문에 자동으로 1 감소합니다.
    */

  }


  return (

    <section
      className="mooday-detail-comments"
      aria-labelledby="detail-comments-title"
    >


      {/* =================================
          TITLE / COMMENT COUNT
      ================================= */}

      <h2
        className="mooday-detail-section-title"
        id="detail-comments-title"
      >

        COMMENTS

        <span>
          {displayCount}
        </span>

      </h2>


      {/* =================================
          17. EXISTING COMMENTS
      ================================= */}

      <div className="mooday-detail-comments__list">


        {/*
          =================================
          EXISTING SAMPLE COMMENTS

          communityDetail.js에서 전달된
          기존 샘플 댓글입니다.

          GROUP 4에서도 계속 읽기 전용입니다.

          기존 ···는 시각 요소로만 남겨두며
          실제 수정 / 삭제 버튼으로 변경하지 않습니다.
          =================================
        */}

        {comments.map((comment) => (

          <article
            className="mooday-detail-comment"
            key={comment.id}
          >


            <div
              className="
                mooday-detail-avatar
                mooday-detail-avatar--comment
              "
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


            {/*
              기존 댓글은 읽기 전용.

              따라서 여전히 span입니다.
            */}

            <span
              className="mooday-detail-comment__more"
              aria-hidden="true"
            >
              ···
            </span>


          </article>

        ))}


        {/* =================================
            18. SESSION COMMENTS
        ================================= */}

        {sessionComments.map((comment) => {

          const isEditing =
            editingCommentId === comment.id

          const isDeleteConfirm =
            deletingCommentId === comment.id

          const isMenuOpen =
            activeMenuId === comment.id


          return (

            <article
              className="
                mooday-detail-comment
                mooday-detail-comment--session
              "
              key={comment.id}
            >


              {/* -----------------------------
                  SESSION USER AVATAR
              ----------------------------- */}

              <div
                className="
                  mooday-detail-avatar
                  mooday-detail-avatar--comment
                "
                aria-hidden="true"
              >

                {comment.author.charAt(0).toUpperCase()}

              </div>


              {/* -----------------------------
                  COMMENT CONTENT
              ----------------------------- */}

              <div className="mooday-detail-comment__content">

                <strong>
                  @{comment.author}
                </strong>


                {/* =============================
                    NORMAL VIEW
                ============================= */}

                {!isEditing && (

                  <>

                    <p>
                      {comment.text}
                    </p>


                    <span className="mooday-detail-comment__time">

                      {comment.time}

                      {comment.isEdited && (
                        <>
                          {' · 수정됨'}
                        </>
                      )}

                    </span>

                  </>

                )}


                {/* =============================
                    GROUP 4 — EDIT MODE
                ============================= */}

                {isEditing && (

                  <div className="mooday-detail-comment__edit">

                    <label
                      htmlFor={`edit-${comment.id}`}
                      className="mooday-detail-visually-hidden"
                    >
                      댓글 수정
                    </label>


                    <input
                      id={`edit-${comment.id}`}
                      type="text"
                      value={editingText}
                      onChange={(event) =>
                        setEditingText(event.target.value)
                      }
                      onKeyDown={handleEditKeyDown}
                      autoFocus
                    />


                    <div className="mooday-detail-comment__edit-actions">

                      <button
                        type="button"
                        className="
                          mooday-detail-comment__action-button
                          mooday-detail-comment__action-button--secondary
                        "
                        onClick={handleCancelEdit}
                      >
                        취소
                      </button>


                      <button
                        type="button"
                        className="
                          mooday-detail-comment__action-button
                          mooday-detail-comment__action-button--primary
                        "
                        onClick={handleSaveEdit}
                        disabled={!canSaveEdit}
                      >
                        저장
                      </button>

                    </div>

                  </div>

                )}


                {/* =============================
                    GROUP 4 — DELETE CONFIRM
                ============================= */}

                {isDeleteConfirm && (

                  <div className="mooday-detail-comment__delete-confirm">

                    <p>
                      댓글을 삭제하시겠습니까?
                    </p>


                    <div className="mooday-detail-comment__delete-actions">

                      <button
                        type="button"
                        className="
                          mooday-detail-comment__action-button
                          mooday-detail-comment__action-button--secondary
                        "
                        onClick={handleCancelDelete}
                      >
                        취소
                      </button>


                      <button
                        type="button"
                        className="
                          mooday-detail-comment__action-button
                          mooday-detail-comment__action-button--danger
                        "
                        onClick={() =>
                          handleConfirmDelete(comment.id)
                        }
                      >
                        삭제
                      </button>

                    </div>

                  </div>

                )}

              </div>


              {/* =================================
                  GROUP 4 — SESSION MENU
              ================================= */}

              {/*
                수정 중 / 삭제 확인 중인 댓글에서는
                메뉴 버튼을 숨깁니다.

                다른 댓글의 메뉴 역시
                임시 작업 중에는 disabled 처리합니다.
              */}

              {!isEditing && !isDeleteConfirm && (

                <div className="mooday-detail-comment__menu-wrap">

                  <button
                    type="button"
                    className="
                      mooday-detail-comment__more
                      mooday-detail-comment__more--button
                    "
                    onClick={() =>
                      handleMenuToggle(comment.id)
                    }
                    aria-label="댓글 메뉴 열기"
                    aria-expanded={isMenuOpen}
                    disabled={hasTemporaryAction}
                  >
                    ···
                  </button>


                  {isMenuOpen && (

                    <div
                      className="mooday-detail-comment__menu"
                      role="menu"
                    >

                      <button
                        type="button"
                        role="menuitem"
                        onClick={() =>
                          handleStartEdit(comment)
                        }
                      >
                        수정
                      </button>


                      <button
                        type="button"
                        role="menuitem"
                        className="
                          mooday-detail-comment__menu-delete
                        "
                        onClick={() =>
                          handleStartDelete(comment.id)
                        }
                      >
                        삭제
                      </button>

                    </div>

                  )}

                </div>

              )}


            </article>

          )

        })}

      </div>


      {/* =================================
          19. COMMENT COMPOSER
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
            value={commentInput}
            onChange={(event) =>
              setCommentInput(event.target.value)
            }
            onKeyDown={handleInputKeyDown}
            placeholder="댓글을 입력해주세요."
            autoComplete="off"
          />


          <button
            type="button"
            onClick={handleSubmitComment}
            disabled={!canSubmit}
            aria-label="댓글 등록"
          >
            등록
          </button>

        </div>


      </div>


    </section>

  )

}