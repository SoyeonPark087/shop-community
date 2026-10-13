import { useState } from 'react'

export default function DetailComments({ comments = [], count = 0 }) {

  const [commentInput, setCommentInput] = useState('')
  const [sessionComments, setSessionComments] = useState([])
  const [activeMenuId, setActiveMenuId] = useState(null)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [deletingCommentId, setDeletingCommentId] = useState(null)

  const trimmedComment = commentInput.trim()

  const canSubmit = trimmedComment.length > 0

  const displayCount = count + sessionComments.length

  const trimmedEditingText = editingText.trim()

  const canSaveEdit = trimmedEditingText.length > 0

  const hasTemporaryAction = editingCommentId !== null || deletingCommentId !== null

  function handleSubmitComment() {

    if (!canSubmit) {
      return
    }

    const newComment = {
      id: `session-comment-${Date.now()}`,
      author: 'user',
      text: trimmedComment,
      time: '방금 전',
      isEdited: false,
    }

    setSessionComments(currentComments => [...currentComments, newComment])

    setCommentInput('')

  }

  function handleInputKeyDown(event) {

    if (event.key !== 'Enter') {
      return
    }

    event.preventDefault()

    handleSubmitComment()

  }

  function handleMenuToggle(commentId) {

    if (hasTemporaryAction) {
      return
    }

    setActiveMenuId(currentId => currentId === commentId ? null : commentId)

  }

  function handleStartEdit(comment) {

    setEditingCommentId(comment.id)
    setEditingText(comment.text)

    setActiveMenuId(null)

    setDeletingCommentId(null)

  }

  function handleSaveEdit() {

    if (editingCommentId === null || !canSaveEdit) {
      return
    }

    setSessionComments((currentComments) =>
      currentComments.map((comment) => {

        if (comment.id !== editingCommentId) {
          return comment
        }

        return { ...comment, text: trimmedEditingText, isEdited: true }

      })
    )

    setEditingCommentId(null)
    setEditingText('')

  }

  function handleCancelEdit() {

    setEditingCommentId(null)
    setEditingText('')

  }

  function handleEditKeyDown(event) {

    if (event.key === 'Enter') {

      event.preventDefault()

      handleSaveEdit()

      return

    }

    if (event.key === 'Escape') {

      event.preventDefault()

      handleCancelEdit()

    }

  }

  function handleStartDelete(commentId) {

    setDeletingCommentId(commentId)

    setActiveMenuId(null)

    setEditingCommentId(null)
    setEditingText('')

  }

  function handleCancelDelete() {

    setDeletingCommentId(null)

  }

  function handleConfirmDelete(commentId) {

    setSessionComments((currentComments) =>
      currentComments.filter(
        (comment) =>
          comment.id !== commentId
      )
    )

    setDeletingCommentId(null)
    setActiveMenuId(null)

  }

  return (

    <section className="mooday-detail-comments" aria-labelledby="detail-comments-title">

      <h2 className="mooday-detail-section-title" id="detail-comments-title">

        COMMENTS

        <span>
          {displayCount}
        </span>

      </h2>

      <div className="mooday-detail-comments__list">

        {comments.map((comment) => (

          <article className="mooday-detail-comment" key={comment.id}>

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

            <span className="mooday-detail-comment__more" aria-hidden="true">
              ···
            </span>

          </article>

        ))}

        {sessionComments.map((comment) => {

          const isEditing = editingCommentId === comment.id

          const isDeleteConfirm = deletingCommentId === comment.id

          const isMenuOpen = activeMenuId === comment.id

          return (

            <article
              className="
                mooday-detail-comment
                mooday-detail-comment--session
              "
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
                      onChange={event => setEditingText(event.target.value)}
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
                        onClick={() => handleConfirmDelete(comment.id)}
                      >
                        삭제
                      </button>

                    </div>

                  </div>

                )}

              </div>

              {!isEditing && !isDeleteConfirm && (

                <div className="mooday-detail-comment__menu-wrap">

                  <button
                    type="button"
                    className="
                      mooday-detail-comment__more
                      mooday-detail-comment__more--button
                    "
                    onClick={() => handleMenuToggle(comment.id)}
                    aria-label="댓글 메뉴 열기"
                    aria-expanded={isMenuOpen}
                    disabled={hasTemporaryAction}
                  >
                    ···
                  </button>

                  {isMenuOpen && (

                    <div className="mooday-detail-comment__menu" role="menu">

                      <button type="button" role="menuitem" onClick={() => handleStartEdit(comment)}>
                        수정
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        className="
                          mooday-detail-comment__menu-delete
                        "
                        onClick={() => handleStartDelete(comment.id)}
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

          <label htmlFor="mooday-detail-comment-input" className="mooday-detail-visually-hidden">
            댓글 입력
          </label>

          <input
            id="mooday-detail-comment-input"
            type="text"
            value={commentInput}
            onChange={event => setCommentInput(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="댓글을 입력해주세요."
            autoComplete="off"
          />

          <button type="button" onClick={handleSubmitComment} disabled={!canSubmit} aria-label="댓글 등록">
            등록
          </button>

        </div>

      </div>

    </section>

  )

}
