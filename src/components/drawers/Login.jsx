import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ open, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const handleCreateAccount = () => {
    onClose();
    navigate("/signup");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 현재는 UI 구현용
    // 추후 실제 로그인 API 연결
  };

  return (
    <div
      className={`login-drawer-layer ${
        open ? "login-drawer-layer--open" : ""
      }`}
      aria-hidden={!open}
    >
      {/* Drawer 외부 영역 */}
      <button
        type="button"
        className="login-drawer-backdrop"
        aria-label="로그인 메뉴 닫기"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />

      <aside
        className="login-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Account"
      >
        {/* Title */}
        <div className="login-drawer__header">
          <h2>Account</h2>

          <button
            type="button"
            className="login-drawer__close"
            onClick={onClose}
            aria-label="닫기"
          >
            <span className="login-drawer__close-icon" />
          </button>
        </div>

        {/* Login form */}
        <form
          className="login-drawer__body"
          onSubmit={handleSubmit}
        >
          <div className="login-drawer__fields">
            <input
              type="text"
              name="accountId"
              placeholder="Account ID"
              aria-label="Account ID"
              autoComplete="username"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="login-drawer__submit"
          >
            Log in
          </button>

          {/* Account links */}
          <div className="login-drawer__links">
            <div className="login-drawer__links-left">
              <button type="button">
                Find ID
              </button>

              <button type="button">
                Password
              </button>
            </div>

            <button
              type="button"
              className="login-drawer__create"
              onClick={handleCreateAccount}
            >
              Create Account
            </button>
          </div>

          <div className="login-drawer__divider" />

          {/* Social login */}
        <div className="login-drawer__social">
        <button
            type="button"
            className="login-social"
        >
            <img
            className="login-social__logo"
            src="/images/common/kakao-talk.svg"
            alt="카카오톡아이콘"
            />

            <span className="login-social__name">
            Kakao
            </span>

            <span
            className="login-social__arrow"
            aria-hidden="true"
            >
            →
            </span>
        </button>

        <button
            type="button"
            className="login-social"
        >
            <img
            className="login-social__logo"
            src="/images/common/naver.svg"
            alt="네이버아이콘"
            />

            <span className="login-social__name">
            Naver
            </span>

            <span
            className="login-social__arrow"
            aria-hidden="true"
            >
            →
            </span>
        </button>
        </div>
        </form>
      </aside>
    </div>
  );
}