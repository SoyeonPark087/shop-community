import { useState } from "react";
import Footer from "../components/Footer";
import "./Signup.css";

const basicFields = [
  {
    id: "userId",
    label: "아이디",
    required: true,
    type: "text",
    placeholder: "영문, 숫자 조합 4자 이상",
  },
  {
    id: "password",
    label: "비밀번호",
    required: true,
    type: "password",
    placeholder: "영문, 숫자, 특수문자 조합 8자 이상",
  },
  {
    id: "passwordConfirm",
    label: "비밀번호 확인",
    required: true,
    type: "password",
    placeholder: "비밀번호를 다시 입력해주세요",
  },
  {
    id: "name",
    label: "이름",
    required: true,
    type: "text",
    placeholder: "이름을 입력해주세요",
  },
  {
    id: "phone",
    label: "휴대폰 번호",
    required: true,
    type: "tel",
    placeholder: "- 없이 숫자만 입력해주세요",
  },
  {
    id: "email",
    label: "이메일",
    required: true,
    type: "email",
    placeholder: "예) mooday@domain.com",
  },
];


const years = Array.from(
  { length: 100 },
  (_, index) => new Date().getFullYear() - index
);

const months = Array.from({ length: 12 }, (_, index) => index + 1);

const days = Array.from({ length: 31 }, (_, index) => index + 1);

function SignupHeading() {
  return (
    <div className="signup-heading">
      <h1>Create Account</h1>

      <p>
        지금, MOODAY와 함께 더 좋은 일상을 시작해보세요
      </p>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <section className="signup-section">
      <h2 className="signup-section__title">
        {title}
      </h2>

      <div className="signup-section__body">
        {children}
      </div>
    </section>
  );
}

function FormRow({
  label,
  required = false,
  htmlFor,
  children,
  className = "",
}) {
  return (
    <div className={`form-row ${className}`}>
      <label
        className="form-row__label"
        htmlFor={htmlFor}
      >
        {label}
        {required && (
          <span
            className="required-mark"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      <div className="form-row__field">
        {children}
      </div>
    </div>
  );
}

function AgreementRow({
  id,
  checked,
  onChange,
  children,
  view = false,
  strong = false,
}) {
  return (
    <div
      className={`agreement-row ${
        strong ? "agreement-row--strong" : ""
      }`}
    >
      <label className="agreement-check">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />

        <span className="agreement-check__box" />

        <span className="agreement-check__text">
          {children}
        </span>
      </label>

      {view && (
        <button
          type="button"
          className="agreement-view"
        >
          보기
        </button>
      )}
    </div>
  );
}


export default function Signup() {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const allChecked = Object.values(agreements).every(
    Boolean
  );

  const handleAllAgreement = (event) => {
    const checked = event.target.checked;

    setAgreements({
      terms: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  const handleAgreement = (name) => (event) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: event.target.checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="signup-page">
      <main className="signup-main">
        <div className="signup-inner">
          <SignupHeading />

          <form
            className="signup-form"
            onSubmit={handleSubmit}
          >
            <FormSection title="BASIC INFORMATION">
              {basicFields.map((field) => (
                <FormRow
                  key={field.id}
                  label={field.label}
                  required={field.required}
                  htmlFor={field.id}
                >
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete="off"
                  />
                </FormRow>
              ))}
            </FormSection>

            <FormSection title="ADDRESS">
              <FormRow
                label="우편 번호"
                required
                htmlFor="postcode"
              >
                <div className="address-search">
                  <input
                    id="postcode"
                    name="postcode"
                    type="text"
                    placeholder="주소 검색"
                    readOnly
                  />

                  <button
                    type="button"
                    className="address-search__button"
                  >
                    주소 검색
                  </button>
                </div>
              </FormRow>

              <FormRow
                label="기본 주소"
                required
                htmlFor="address"
              >
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="기본 주소를 입력해주세요"
                />
              </FormRow>

              <FormRow
                label="상세 주소"
                htmlFor="addressDetail"
              >
                <input
                  id="addressDetail"
                  name="addressDetail"
                  type="text"
                  placeholder="상세 주소를 입력해주세요 (선택)"
                />
              </FormRow>
            </FormSection>

            <FormSection title="ADDITIONAL INFORMATION">
              <FormRow label="성별">
                <div className="gender-options">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="none"
                      defaultChecked
                    />
                    <span>선택 안 함</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                    />
                    <span>남성</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                    />
                    <span>여성</span>
                  </label>
                </div>
              </FormRow>

              <FormRow label="생년월일">
                <div className="birth-selects">
                  <select
                    name="birthYear"
                    defaultValue=""
                    aria-label="출생 연도"
                  >
                    <option value="" disabled>
                      년
                    </option>

                    {years.map((year) => (
                      <option
                        key={year}
                        value={year}
                      >
                        {year}
                      </option>
                    ))}
                  </select>

                  <select
                    name="birthMonth"
                    defaultValue=""
                    aria-label="출생 월"
                  >
                    <option value="" disabled>
                      월
                    </option>

                    {months.map((month) => (
                      <option
                        key={month}
                        value={month}
                      >
                        {month}
                      </option>
                    ))}
                  </select>

                  <select
                    name="birthDay"
                    defaultValue=""
                    aria-label="출생 일"
                  >
                    <option value="" disabled>
                      일
                    </option>

                    {days.map((day) => (
                      <option
                        key={day}
                        value={day}
                      >
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </FormRow>
            </FormSection>

            <FormSection title="AGREEMENT">
              <div className="agreement-list">
                <AgreementRow
                  id="allAgreement"
                  checked={allChecked}
                  onChange={handleAllAgreement}
                  strong
                >
                  전체 동의하기
                </AgreementRow>

                <AgreementRow
                  id="termsAgreement"
                  checked={agreements.terms}
                  onChange={handleAgreement("terms")}
                  view
                >
                  [필수] 이용약관에 동의합니다.
                </AgreementRow>

                <AgreementRow
                  id="privacyAgreement"
                  checked={agreements.privacy}
                  onChange={handleAgreement("privacy")}
                  view
                >
                  [필수] 개인정보 수집 및 이용에 동의합니다.
                </AgreementRow>

                <AgreementRow
                  id="marketingAgreement"
                  checked={agreements.marketing}
                  onChange={handleAgreement("marketing")}
                  view
                >
                  [선택] 마케팅 정보 수신에 동의합니다.
                </AgreementRow>
              </div>
            </FormSection>

            <button
              type="submit"
              className="signup-submit"
            >
              Create Account
            </button>
          </form>
        </div>
      </main>

    </div>
  );
}