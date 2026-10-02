import { useEffect, useRef, useState } from 'react'


const INITIAL_PROFILE = {
  name: '',
  email: '',
  phone: '',
}


const INITIAL_EVENT_CONSENT = true
const INITIAL_MARKETING_CONSENT = false



const INITIAL_SAVED_STATE = {
  name: INITIAL_PROFILE.name,
  email: INITIAL_PROFILE.email,
  phone: INITIAL_PROFILE.phone,

  eventConsent: INITIAL_EVENT_CONSENT,
  marketingConsent: INITIAL_MARKETING_CONSENT,
}



const EMPTY_ERRORS = {
  name: '',
  email: '',
  phone: '',
}



const EMPTY_TOUCHED = {
  name: false,
  email: false,
  phone: false,
}



const DEMO_USER_ID = 'mooday_user01'



function validateName(value) {
  if (!value.trim()) {
    return '이름을 입력해주세요.'
  }

  return ''
}


/**
 * 이메일 검사
 *
 * 규칙:
 * - 필수 입력
 * - 일반적인 이메일 형식 확인
 */
function validateEmail(value) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return '이메일을 입력해주세요.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(trimmedValue)) {
    return '올바른 이메일 형식을 입력해주세요.'
  }

  return ''
}


function validatePhone(value) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return '휴대폰 번호를 입력해주세요.'
  }

  const phonePattern = /^(010\d{8}|010-\d{4}-\d{4})$/

  if (!phonePattern.test(trimmedValue)) {
    return '올바른 휴대폰 번호를 입력해주세요.'
  }

  return ''
}



function validateField(name, value) {
  switch (name) {
    case 'name':
      return validateName(value)

    case 'email':
      return validateEmail(value)

    case 'phone':
      return validatePhone(value)

    default:
      return ''
  }
}


/* ==================================================
   3. PROFILE FORM COMPONENT
================================================== */

export default function ProfileForm() {
  /**
   * 현재 화면에 표시되는 Profile 값
   */
  const [profile, setProfile] = useState(INITIAL_PROFILE)


  /**
   * 현재 체크박스 상태
   */
  const [eventConsent, setEventConsent] = useState(
    INITIAL_EVENT_CONSENT
  )

  const [marketingConsent, setMarketingConsent] = useState(
    INITIAL_MARKETING_CONSENT
  )



  const [savedState, setSavedState] = useState(
    INITIAL_SAVED_STATE
  )


  const [errors, setErrors] = useState(EMPTY_ERRORS)

  const [touched, setTouched] = useState(EMPTY_TOUCHED)



  const [showToast, setShowToast] = useState(false)



  const toastTimerRef = useRef(null)


  const isDirty =
    profile.name !== savedState.name ||
    profile.email !== savedState.email ||
    profile.phone !== savedState.phone ||
    eventConsent !== savedState.eventConsent ||
    marketingConsent !== savedState.marketingConsent


  useEffect(() => {

    if (!isDirty) {
      return
    }

    function handleBeforeUnload(event) {

      event.preventDefault()

      event.returnValue = ''
    }

    window.addEventListener(
      'beforeunload',
      handleBeforeUnload
    )

    return () => {
      window.removeEventListener(
        'beforeunload',
        handleBeforeUnload
      )
    }
  }, [isDirty])


  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current)
      }
    }
  }, [])


  /* ==================================================
     7. INPUT CHANGE
  ================================================== */

  /**
   * 이름 / 이메일 / 휴대폰 입력 처리
   */
  function updateField(event) {
    const { name, value } = event.target

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }))

    /**
     * 이미 검증된 필드는
     * 입력 중에도 즉시 다시 검사합니다.
     */
    if (touched[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: validateField(name, value),
      }))
    }
  }


  /* ==================================================
     8. INPUT BLUR
  ================================================== */

  /**
   * 입력창에서 Focus가 빠질 때
   * 해당 필드를 검증합니다.
   */
  function handleBlur(event) {
    const { name, value } = event.target

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: validateField(name, value),
    }))
  }


  /* ==================================================
     9. VALIDATE ALL
  ================================================== */

  /**
   * 수정하기 클릭 시
   * Profile 필드 전체 검사
   *
   * 반환:
   * true  → 정상
   * false → 하나 이상 오류
   */
  function validateAll() {
    const nextErrors = {
      name: validateName(profile.name),
      email: validateEmail(profile.email),
      phone: validatePhone(profile.phone),
    }

    /**
     * Submit을 시도했으므로
     * 모든 필드를 검증 완료 상태로 변경합니다.
     */
    setTouched({
      name: true,
      email: true,
      phone: true,
    })

    setErrors(nextErrors)

    const hasError = Object.values(nextErrors).some(
      (message) => message !== ''
    )

    return !hasError
  }


  /* ==================================================
     10. SAVE TOAST
  ================================================== */

  /**
   * 저장 성공 Toast 표시
   *
   * 이전 Timer가 남아 있다면 제거하고
   * 새로 3초 Timer를 시작합니다.
   */
  function showSaveToast() {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }

    setShowToast(true)

    toastTimerRef.current = setTimeout(() => {
      setShowToast(false)
      toastTimerRef.current = null
    }, 3000)
  }


  /* ==================================================
     11. DEMO SAVE
  ================================================== */

  /**
   * 현재 화면값을
   * 새로운 저장 기준값으로 설정합니다.
   *
   * 실제 서버 / localStorage 저장은 아닙니다.
   */
  function saveDemoProfile() {
    setSavedState({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,

      eventConsent,
      marketingConsent,
    })

    /**
     * 저장 성공 후
     * Error / Touched 상태 정리
     */
    setErrors({ ...EMPTY_ERRORS })
    setTouched({ ...EMPTY_TOUCHED })

    /**
     * 저장 완료 Toast
     */
    showSaveToast()
  }


  /* ==================================================
     12. FORM SUBMIT
  ================================================== */

  /**
   * Submit Flow
   *
   * 변경사항 있음
   * ↓
   * 수정하기 클릭
   * ↓
   * 전체 Validation
   *
   * 오류 있음
   * → 저장 중단
   *
   * 정상
   * → 현재 값을 savedState로 저장
   * → 입력값 유지
   * → isDirty 자동 false
   * → 수정하기 Disabled
   * → beforeunload 경고 자동 해제
   * → Toast 표시
   */
  function handleSubmit(event) {
    event.preventDefault()

    const isValid = validateAll()

    if (!isValid) {
      return
    }

    saveDemoProfile()
  }


  /* ==================================================
     13. JSX
  ================================================== */

  return (
    <>
      <form
        className="mooday-profile-form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        {/* =========================================
            PROFILE TITLE
        ========================================= */}
        <h1
          className="mooday-profile-form__title"
          id="mooday-profile-heading"
        >
          PROFILE
        </h1>


        {/* =========================================
            PROFILE FIELDS
        ========================================= */}
        <div className="mooday-profile-form__fields">

          {/* ======================================
              01. 이름
          ====================================== */}
          <div
            className={`
              mooday-profile-form__field
              ${
                errors.name
                  ? 'mooday-profile-form__field--error'
                  : ''
              }
            `}
          >
            <label htmlFor="mooday-profile-name">
              이름
            </label>

            <input
              id="mooday-profile-name"
              name="name"
              type="text"
              value={profile.name}
              onChange={updateField}
              onBlur={handleBlur}
              autoComplete="off"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name
                  ? 'mooday-profile-name-error'
                  : undefined
              }
            />

            {errors.name && (
              <p
                className="mooday-profile-form__error-message"
                id="mooday-profile-name-error"
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>


          {/* ======================================
              02. 아이디

              - 고정 Demo ID
              - Read Only
              - Validation 대상 아님
              - Dirty 대상 아님
          ====================================== */}
          <div
            className="
              mooday-profile-form__field
              mooday-profile-form__field--id
            "
          >
            <label htmlFor="mooday-profile-id">
              아이디
            </label>

            <div className="mooday-profile-form__id-row">

              <div className="mooday-profile-form__id-control">
                <input
                  id="mooday-profile-id"
                  name="userId"
                  type="text"
                  value={DEMO_USER_ID}
                  readOnly
                  aria-describedby="mooday-profile-id-note"
                  autoComplete="off"
                />

                {/* Lock Icon */}
                <svg
                  className="mooday-profile-form__lock-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="11"
                    rx="2"
                  />

                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </div>

              <span
                className="mooday-profile-form__id-note"
                id="mooday-profile-id-note"
              >
                아이디는 변경할 수 없습니다.
              </span>
            </div>
          </div>


          {/* ======================================
              03. 이메일
          ====================================== */}
          <div
            className={`
              mooday-profile-form__field
              ${
                errors.email
                  ? 'mooday-profile-form__field--error'
                  : ''
              }
            `}
          >
            <label htmlFor="mooday-profile-email">
              이메일
            </label>

            <input
              id="mooday-profile-email"
              name="email"
              type="email"
              value={profile.email}
              onChange={updateField}
              onBlur={handleBlur}
              autoComplete="off"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email
                  ? 'mooday-profile-email-error'
                  : undefined
              }
            />

            {errors.email && (
              <p
                className="mooday-profile-form__error-message"
                id="mooday-profile-email-error"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>


          {/* ======================================
              04. 휴대폰 번호
          ====================================== */}
          <div
            className={`
              mooday-profile-form__field
              ${
                errors.phone
                  ? 'mooday-profile-form__field--error'
                  : ''
              }
            `}
          >
            <label htmlFor="mooday-profile-phone">
              휴대폰 번호
            </label>

            <input
              id="mooday-profile-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              value={profile.phone}
              onChange={updateField}
              onBlur={handleBlur}
              autoComplete="off"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone
                  ? 'mooday-profile-phone-error'
                  : undefined
              }
            />

            {errors.phone && (
              <p
                className="mooday-profile-form__error-message"
                id="mooday-profile-phone-error"
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>


          {/* ======================================
              05. 비밀번호

              실제 비밀번호 데이터 없음

              - Read Only
              - Validation 대상 아님
              - Dirty 대상 아님
          ====================================== */}
          <div
            className="
              mooday-profile-form__field
              mooday-profile-form__field--password
            "
          >
            <label htmlFor="mooday-profile-password">
              비밀번호
            </label>

            <div className="mooday-profile-form__password-row">

              {/* 디자인용 Masking UI */}
              <input
                id="mooday-profile-password"
                className="mooday-profile-form__password-input"
                type="text"
                value=""
                placeholder="••••••••"
                readOnly
                autoComplete="off"
                aria-describedby="mooday-profile-password-note"
              />

              <button
                className="mooday-profile-form__password-button"
                type="button"
                disabled
              >
                비밀번호 변경
              </button>
            </div>

            <span
              className="mooday-profile-form__visually-hidden"
              id="mooday-profile-password-note"
            >
              비밀번호 마스킹 표시는 디자인용입니다.
              실제 비밀번호 데이터는 연결되어 있지 않습니다.
            </span>
          </div>
        </div>


        {/* =========================================
            CONSENT CHECKBOXES
        ========================================= */}
        <div className="mooday-profile-form__consents">

          {/* 이벤트 이메일 수신 */}
          <label className="mooday-profile-form__consent">
            <input
              type="checkbox"
              checked={eventConsent}
              onChange={(event) =>
                setEventConsent(event.target.checked)
              }
            />

            <span>
              이벤트, 혜택, 신규 콘텐츠 알림을 이메일로 받아볼게요.
            </span>
          </label>


          {/* 마케팅 정보 수신 */}
          <label className="mooday-profile-form__consent">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(event) =>
                setMarketingConsent(event.target.checked)
              }
            />

            <span>
              마케팅 정보 수신에 동의합니다. (선택)
            </span>
          </label>
        </div>


        {/* =========================================
            SUBMIT BUTTON

            변경사항 없음:
            Disabled

            변경사항 있음:
            Active

            저장 성공 후:
            savedState 갱신
            → isDirty false
            → 다시 Disabled
        ========================================= */}
        <button
          className="mooday-profile-form__submit"
          type="submit"
          disabled={!isDirty}
        >
          수정하기
        </button>
      </form>


      {/* =========================================
          SAVE TOAST

          실제 서버 저장이 아닌
          UI 시연용 저장 완료 메시지
      ========================================= */}
      {showToast && (
        <div
          className="mooday-profile-toast"
          role="status"
          aria-live="polite"
        >
          변경사항이 저장되었습니다.
        </div>
      )}
    </>
  )
}