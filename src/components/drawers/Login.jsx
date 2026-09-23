import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import "./Login.css";

export default function Login({
  open,
  onClose,
}) {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    onClose();
    navigate("/signup");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Account"
    >
      <form
        className="login-content"
        onSubmit={handleSubmit}
      >
        <div className="login-content__fields">
          <input
            type="text"
            placeholder="Account ID"
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="login-content__submit"
        >
          Log in
        </button>

        <div className="login-content__links">
          <div className="login-content__links-left">
            <button type="button">
              Find ID
            </button>

            <button type="button">
              Password
            </button>
          </div>

          <button
            type="button"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </div>

        <div className="login-content__divider" />

        <div className="login-content__social">
          <button
            type="button"
            className="login-social"
          >
            <img
              className="login-social__logo"
              src="/images/common/kakao-talk.svg"
              alt=""
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
              alt=""
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
    </Drawer>
  );
}