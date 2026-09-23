import { useState } from 'react'

/**
 * mooday My Page - Profile v0.1
 *
 * 현재 적용된 UI 정책
 * --------------------------------------------------
 * 1. 이름 / 이메일 / 휴대폰 번호
 *    - 샘플 데이터 없이 빈 입력창
 *    - 사용자가 임시로 입력 가능
 *
 * 2. 아이디
 *    - 시연용 고정 아이디 표시
 *    - readOnly
 *    - 연한 회색 배경
 *    - 잠금 아이콘 표시
 *
 * 3. 비밀번호
 *    - 실제 비밀번호 데이터 없음
 *    - "••••••••" 마스킹 표현만 표시
 *    - 아주 옅은 회색 배경
 *    - 비밀번호 변경 버튼은 현재 기능 없음
 *
 * 4. 수정하기
 *    - 실제 저장/API 호출 없음
 *    - 입력 상태만 최초 상태로 초기화
 */

// 일반 입력 필드는 샘플 정보 없이 빈 상태로 시작합니다.
const EMPTY_PROFILE = {
  name: '',
  email: '',
  phone: '',
}

// UI 시연을 위한 고정 아이디입니다.
// 실제 로그인 사용자 또는 서버 데이터가 아닙니다.
const DEMO_USER_ID = 'mooday_user01'

export default function ProfileForm() {
  // 이름 / 이메일 / 휴대폰 번호 임시 입력 상태
  const [profile, setProfile] = useState(EMPTY_PROFILE)

  // 체크박스 초기 상태
  const [eventConsent, setEventConsent] = useState(true)
  const [marketingConsent, setMarketingConsent] = useState(false)

  /**
   * 일반 입력 필드 변경 함수
   */
  function updateField(event) {
    const { name, value } = event.target

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  /**
   * 수정하기 버튼
   *
   * 실제 회원정보 저장 기능은 없습니다.
   * 현재 v0.1에서는 사용자가 입력한 시연용 상태만 초기화합니다.
   */
  function resetDemo(event) {
    event.preventDefault()

    // 일반 입력창 초기화
    setProfile({ ...EMPTY_PROFILE })

    // 체크박스 초기 상태로 복귀
    setEventConsent(true)
    setMarketingConsent(false)

    // 현재 Profile 페이지 상단으로 이동
    document
      .getElementById('mooday-profile-top')
      ?.scrollIntoView({ behavior: 'instant' })
  }

  return (
    <form
      className="mooday-profile-form"
      onSubmit={resetDemo}
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

        {/* 01. 이름 */}
        <div className="mooday-profile-form__field">
          <label htmlFor="mooday-profile-name">
            이름
          </label>

          <input
            id="mooday-profile-name"
            name="name"
            type="text"
            value={profile.name}
            onChange={updateField}
            autoComplete="off"
          />
        </div>

        {/* ======================================
            02. 아이디
            - 고정 시연용 아이디
            - 변경 불가
            - 잠금 아이콘 표시
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

            {/* 아이디 입력창 + 잠금 아이콘 */}
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

              {/*
                잠금 아이콘
                별도 아이콘 라이브러리를 설치하지 않고
                inline SVG로 처리합니다.
              */}
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

            {/* 변경 불가 안내 */}
            <span
              className="mooday-profile-form__id-note"
              id="mooday-profile-id-note"
            >
              아이디는 변경할 수 없습니다.
            </span>
          </div>
        </div>

        {/* 03. 이메일 */}
        <div className="mooday-profile-form__field">
          <label htmlFor="mooday-profile-email">
            이메일
          </label>

          <input
            id="mooday-profile-email"
            name="email"
            type="email"
            value={profile.email}
            onChange={updateField}
            autoComplete="off"
          />
        </div>

        {/* 04. 휴대폰 번호 */}
        <div className="mooday-profile-form__field">
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
            autoComplete="off"
          />
        </div>

        {/* ======================================
            05. 비밀번호

            중요:
            실제 비밀번호를 저장하거나 표시하지 않습니다.

            "••••••••"는 단순한 UI 상태 표현이며
            실제 비밀번호 데이터가 아닙니다.
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

            {/*
              실제 값은 비어 있습니다.

              placeholder만 사용하여
              "비밀번호가 설정되어 있는 상태"처럼 표현합니다.
            */}
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

            {/*
              현재 Profile v0.1에서는
              비밀번호 변경 기능을 구현하지 않습니다.

              disabled 상태로 두어
              기능이 있는 것처럼 오해하지 않게 합니다.
            */}
            <button
              className="mooday-profile-form__password-button"
              type="button"
              disabled
            >
              비밀번호 변경
            </button>
          </div>

          {/* 화면에는 보이지 않는 접근성 안내 */}
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
          SUBMIT / RESET DEMO BUTTON
      ========================================= */}
      <button
        className="mooday-profile-form__submit"
        type="submit"
      >
        수정하기
      </button>
    </form>
  )
}