import { useEffect, useRef, useState } from 'react'

const INITIAL_PROFILE = { name: '', email: '', phone: '' }

const INITIAL_EVENT_CONSENT = true
const INITIAL_MARKETING_CONSENT = false

const INITIAL_SAVED_STATE = {
  ...INITIAL_PROFILE,

  eventConsent: INITIAL_EVENT_CONSENT,
  marketingConsent: INITIAL_MARKETING_CONSENT,
}

const EMPTY_ERRORS = { name: '', email: '', phone: '' }

const EMPTY_TOUCHED = { name: false, email: false, phone: false }

const DEMO_USER_ID = 'mooday_user01'

function validateName(value) {
  if (!value.trim()) {
    return '이름을 입력해주세요.'
  }

  return ''
}

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

export default function ProfileForm() {

  const [profile, setProfile] = useState(INITIAL_PROFILE)
  const [eventConsent, setEventConsent] = useState(INITIAL_EVENT_CONSENT)
  const [marketingConsent, setMarketingConsent] = useState(INITIAL_MARKETING_CONSENT)
  const [savedState, setSavedState] = useState(INITIAL_SAVED_STATE)
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

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [isDirty])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    }
  }, [])

  function updateField(event) {
    const { name, value } = event.target

    setProfile(previous => ({ ...previous, [name]: value }))

    if (touched[name]) {
      setErrors(previous => ({ ...previous, [name]: validateField(name, value) }))
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target

    setTouched(previous => ({ ...previous, [name]: true }))

    setErrors(previous => ({ ...previous, [name]: validateField(name, value) }))
  }

  function validateAll() {
    const nextErrors = {
      name: validateName(profile.name),
      email: validateEmail(profile.email),
      phone: validatePhone(profile.phone),
    }

    setTouched({ name: true, email: true, phone: true })

    setErrors(nextErrors)

    const hasError = Object.values(nextErrors).some(message => message !== '')

    return !hasError
  }

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

  function saveDemoProfile() {
    setSavedState({
      ...profile,

      eventConsent,
      marketingConsent,
    })

    setErrors({ ...EMPTY_ERRORS })
    setTouched({ ...EMPTY_TOUCHED })

    showSaveToast()
  }

  function handleSubmit(event) {
    event.preventDefault()

    const isValid = validateAll()

    if (!isValid) {
      return
    }

    saveDemoProfile()
  }

  return (
    <>
      <form className="mooday-profile-form" onSubmit={handleSubmit} noValidate autoComplete="off">

        <h1 className="mooday-profile-form__title" id="mooday-profile-heading">
          PROFILE
        </h1>

        <div className="mooday-profile-form__fields">

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
              aria-describedby={errors.name ? 'mooday-profile-name-error' : undefined}
            />

            {errors.name && (
              <p className="mooday-profile-form__error-message" id="mooday-profile-name-error" role="alert">
                {errors.name}
              </p>
            )}
          </div>

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
                  <rect x="5" y="10" width="14" height="11" rx="2" />

                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
              </div>

              <span className="mooday-profile-form__id-note" id="mooday-profile-id-note">
                아이디는 변경할 수 없습니다.
              </span>
            </div>
          </div>

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
              aria-describedby={errors.email ? 'mooday-profile-email-error' : undefined}
            />

            {errors.email && (
              <p className="mooday-profile-form__error-message" id="mooday-profile-email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

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
              aria-describedby={errors.phone ? 'mooday-profile-phone-error' : undefined}
            />

            {errors.phone && (
              <p className="mooday-profile-form__error-message" id="mooday-profile-phone-error" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

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

              <button className="mooday-profile-form__password-button" type="button" disabled>
                비밀번호 변경
              </button>
            </div>

            <span className="mooday-profile-form__visually-hidden" id="mooday-profile-password-note">
              비밀번호 마스킹 표시는 디자인용입니다.
              실제 비밀번호 데이터는 연결되어 있지 않습니다.
            </span>
          </div>
        </div>

        <div className="mooday-profile-form__consents">

          <label className="mooday-profile-form__consent">
            <input
              type="checkbox"
              checked={eventConsent}
              onChange={event => setEventConsent(event.target.checked)}
            />

            <span>
              이벤트, 혜택, 신규 콘텐츠 알림을 이메일로 받아볼게요.
            </span>
          </label>

          <label className="mooday-profile-form__consent">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={event => setMarketingConsent(event.target.checked)}
            />

            <span>
              마케팅 정보 수신에 동의합니다. (선택)
            </span>
          </label>
        </div>

        <button className="mooday-profile-form__submit" type="submit" disabled={!isDirty}>
          수정하기
        </button>
      </form>

      {showToast && (
        <div className="mooday-profile-toast" role="status" aria-live="polite">
          변경사항이 저장되었습니다.
        </div>
      )}
    </>
  )
}
