
import { useEffect, useRef, useState } from 'react'
import './CustomerService.css'


// =========================================================
// FAQ DATA
// =========================================================

const faqItems = [
  {
    category: 'ORDER',
    question: '주문 일부를 취소하려면 어떻게 해야 하나요?',
    answer:
      'My Page의 주문 내역에서 신청할 수 있습니다. 주문 진행 상태에 따라 취소가 제한될 수 있습니다.',
  },
  {
    category: 'RETURN',
    question: '불량으로 인한 교환/환불은 어디에서 신청하나요?',
    answer:
      '모든 교환/환불 및 반품 접수는 My Page의 주문 내역에서 신청할 수 있습니다.',
  },
  {
    category: 'ACCOUNT',
    question: '회원정보나 작성한 글은 어디에서 수정할 수 있나요?',
    answer:
      '로그인 후 My Page 메뉴에서 회원정보 및 작성글, 위시리스트 등을 확인하고 수정할 수 있습니다.',
  },
  {
    category: 'CONTACT',
    question: 'FAQ에서 원하는 답변을 찾지 못했어요.',
    answer:
      'FAQ에서 해결되지 않는 서비스 이용 문의는 Customer Care 이메일 또는 고객센터를 이용해 주세요.',
  },
]


// =========================================================
// INQUIRY TYPE OPTIONS
// 기존 option의 value와 표시 문구 유지
// =========================================================

const inquiryTypeOptions = [
  { value: 'product', label: '상품 관련' },
  { value: 'order', label: '주문 및 배송' },
  { value: 'return', label: '교환 / 반품' },
  { value: 'account', label: '회원정보' },
  { value: 'editorial', label: '에디터 지원' },
  { value: 'community', label: '커뮤니티' },
  { value: 'etc', label: '기타' },
]


// =========================================================
// CUSTOMER SERVICE COMPONENT
// =========================================================

export default function CustomerService() {
  // FAQ 열림 상태
  const [openIndex, setOpenIndex] = useState(null)

  // 문의 폼 데이터
  const [inquiryForm, setInquiryForm] = useState({
    type: '',
    title: '',
    content: '',
    email: '',
  })

  const [inquirySubmitted, setInquirySubmitted] = useState(false)

  // =======================================================
  // CUSTOM DROPDOWN STATE
  // =======================================================

  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [activeTypeIndex, setActiveTypeIndex] = useState(0)
  const [typeError, setTypeError] = useState(false)

  const typeDropdownRef = useRef(null)
  const typeButtonRef = useRef(null)
  const typeListRef = useRef(null)
  const typeOptionRefs = useRef([])

  const typeListId = 'inquiry-type-listbox'

  const selectedType = inquiryTypeOptions.find(
    (option) => option.value === inquiryForm.type
  )

  // =======================================================
  // FAQ TOGGLE
  // =======================================================

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  // =======================================================
  // COMMON FORM CHANGE
  // =======================================================

  const handleInquiryChange = (event) => {
    const { name, value } = event.target

    setInquiryForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setInquirySubmitted(false)
  }

  // =======================================================
  // CUSTOM DROPDOWN FUNCTIONS
  // =======================================================

  // 드롭다운 열기
  const openTypeDropdown = (focusIndex = 0) => {
    setActiveTypeIndex(focusIndex)
    setIsTypeOpen(true)
  }

  // 드롭다운 닫기
  const closeTypeDropdown = (restoreFocus = false) => {
    setIsTypeOpen(false)

    if (restoreFocus) {
      typeButtonRef.current?.focus()
    }
  }

  // 문의 유형 선택
  const handleTypeSelect = (option) => {
    setInquiryForm((prev) => ({
      ...prev,
      type: option.value,
    }))

    setTypeError(false)
    setInquirySubmitted(false)
    closeTypeDropdown(true)
  }

  // 드롭다운 버튼 클릭
  const handleTypeToggle = () => {
    if (isTypeOpen) {
      closeTypeDropdown()
      return
    }

    const selectedIndex = inquiryTypeOptions.findIndex(
      (option) => option.value === inquiryForm.type
    )

    openTypeDropdown(
      selectedIndex >= 0 ? selectedIndex : 0
    )
  }

  // 버튼 키보드 조작
  const handleTypeButtonKeyDown = (event) => {
    const selectedIndex = inquiryTypeOptions.findIndex(
      (option) => option.value === inquiryForm.type
    )

    if (
      event.key === 'ArrowDown' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault()

      if (!isTypeOpen) {
        openTypeDropdown(
          selectedIndex >= 0 ? selectedIndex : 0
        )
      } else if (
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        handleTypeSelect(inquiryTypeOptions[activeTypeIndex])
      }

      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()

      if (!isTypeOpen) {
        openTypeDropdown(
          selectedIndex >= 0
            ? selectedIndex
            : inquiryTypeOptions.length - 1
        )
      }

      return
    }

    if (event.key === 'Escape' && isTypeOpen) {
      event.preventDefault()
      closeTypeDropdown(true)
    }
  }

  // 목록 키보드 조작
  const handleTypeListKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveTypeIndex((prev) =>
        Math.min(prev + 1, inquiryTypeOptions.length - 1)
      )
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveTypeIndex((prev) =>
        Math.max(prev - 1, 0)
      )
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setActiveTypeIndex(0)
    }

    if (event.key === 'End') {
      event.preventDefault()
      setActiveTypeIndex(inquiryTypeOptions.length - 1)
    }

    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault()
      handleTypeSelect(inquiryTypeOptions[activeTypeIndex])
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      closeTypeDropdown(true)
    }

    if (event.key === 'Tab') {
      closeTypeDropdown()
    }
  }

  // 드롭다운 외부 클릭 / 포커스 이탈 감지
  useEffect(() => {
    if (!isTypeOpen) return undefined

    const handleOutsidePointer = (event) => {
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target)
      ) {
        setIsTypeOpen(false)
      }
    }

    const handleFocusOutside = (event) => {
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target)
      ) {
        setIsTypeOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsidePointer)
    document.addEventListener('focusin', handleFocusOutside)

    return () => {
      document.removeEventListener(
        'pointerdown',
        handleOutsidePointer
      )
      document.removeEventListener(
        'focusin',
        handleFocusOutside
      )
    }
  }, [isTypeOpen])

  // 목록 열림 시 선택 항목으로 키보드 포커스 이동
  useEffect(() => {
    if (!isTypeOpen) return

    typeOptionRefs.current[activeTypeIndex]?.focus()
  }, [isTypeOpen, activeTypeIndex])

  // =======================================================
  // INQUIRY SUBMIT
  // =======================================================

  const handleInquirySubmit = (event) => {
    event.preventDefault()

    if (!inquiryForm.type) {
      setTypeError(true)
      typeButtonRef.current?.focus()
      return
    }

    if (
      !inquiryForm.title.trim() ||
      !inquiryForm.content.trim() ||
      !inquiryForm.email.trim()
    ) {
      return
    }

    setTypeError(false)
    setIsTypeOpen(false)
    setInquirySubmitted(true)

    setInquiryForm({
      type: '',
      title: '',
      content: '',
      email: '',
    })

    window.setTimeout(() => {
      setInquirySubmitted(false)
    }, 2500)
  }

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <main className="mooday-customer-service">
      <div className="mooday-customer-service__inner">

        {/* HEADER */}
        <header className="mooday-customer-service__header">
          <p className="mooday-customer-service__eyebrow">
            CUSTOMER SERVICE
          </p>

          <h1 className="mooday-customer-service__title">
            How can we help?
          </h1>

          <p className="mooday-customer-service__description">
            MOODAY 이용 중 궁금한 내용을 확인해 주세요.
          </p>
        </header>


        {/* CUSTOMER CARE */}
        <section
          className="mooday-customer-service__section"
          aria-labelledby="customer-care-title"
        >
          <div className="mooday-customer-service__section-label">
            <span>01</span>
            <span>CUSTOMER CARE</span>
          </div>

          <div className="mooday-customer-service__section-content">
            <h2 id="customer-care-title">
              Before you contact us
            </h2>

            <div className="mooday-customer-service__care">
              <p>
                상품 정보는 각 Product Detail의
                Size & Fit, Materials & Care,
                Shipping & Returns에서 확인할 수 있습니다.
              </p>

              <p>
                주문 취소 및 반품 접수는
                My Page의 Order에서 신청할 수 있습니다.
              </p>

              <p>
                배송 현황은 Order Tracking 또는
                My Page의 Order에서 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </section>


        {/* FAQ */}
        <section
          className="mooday-customer-service__section"
          aria-labelledby="customer-faq-title"
        >
          <div className="mooday-customer-service__section-label">
            <span>02</span>
            <span>FAQ</span>
          </div>

          <div className="mooday-customer-service__section-content">
            <h2 id="customer-faq-title">
              Frequently Asked Questions
            </h2>

            <div className="mooday-customer-service__faq-list">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const answerId = `customer-faq-answer-${index}`
                const buttonId = `customer-faq-button-${index}`

                return (
                  <article
                    key={`${item.category}-${item.question}`}
                    className={`mooday-customer-service__faq-item ${
                      isOpen
                        ? 'mooday-customer-service__faq-item--open'
                        : ''
                    }`}
                  >
                    <button
                      id={buttonId}
                      type="button"
                      className="mooday-customer-service__faq-button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => handleToggle(index)}
                    >
                      <span className="mooday-customer-service__faq-category">
                        {item.category}
                      </span>

                      <span className="mooday-customer-service__faq-question">
                        {item.question}
                      </span>

                      <span
                        className="mooday-customer-service__faq-icon"
                        aria-hidden="true"
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={answerId}
                        className="mooday-customer-service__faq-answer"
                        role="region"
                        aria-labelledby={buttonId}
                      >
                        <p>
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>


        {/* 1:1 INQUIRY */}
        <section
          className="mooday-customer-service__section"
          aria-labelledby="customer-inquiry-title"
        >
          <div className="mooday-customer-service__section-label">
            <span>03</span>
            <span>1:1 INQUIRY</span>
          </div>

          <div className="mooday-customer-service__section-content">
            <h2 id="customer-inquiry-title">
              Send us a message
            </h2>

            <p className="mooday-customer-service__inquiry-description">
              FAQ에서 해결되지 않은 문의사항을 남겨주세요.
              확인 후 입력하신 이메일로 답변드립니다.
            </p>

            <form
              className="mooday-customer-service__inquiry-form"
              onSubmit={handleInquirySubmit}
            >
              {/* CUSTOM INQUIRY TYPE DROPDOWN */}
              <div className="mooday-customer-service__inquiry-field">
                <label id="inquiry-type-label">
                  문의 유형
                </label>

                <div
                  ref={typeDropdownRef}
                  className={`mooday-customer-service__type-dropdown ${
                    isTypeOpen
                      ? 'mooday-customer-service__type-dropdown--open'
                      : ''
                  }`}
                >
                  <button
                    ref={typeButtonRef}
                    id="inquiry-type"
                    type="button"
                    className="mooday-customer-service__type-trigger"
                    aria-labelledby="inquiry-type-label inquiry-type"
                    aria-haspopup="listbox"
                    aria-expanded={isTypeOpen}
                    aria-controls={
                      isTypeOpen ? typeListId : undefined
                    }
                    aria-required="true"
                    aria-invalid={typeError}
                    aria-describedby={
                      typeError ? 'inquiry-type-error' : undefined
                    }
                    onClick={handleTypeToggle}
                    onKeyDown={handleTypeButtonKeyDown}
                  >
                    <span
                      className={`mooday-customer-service__type-value ${
                        !selectedType
                          ? 'mooday-customer-service__type-value--placeholder'
                          : ''
                      }`}
                    >
                      {selectedType
                        ? selectedType.label
                        : '문의 유형을 선택해 주세요'}
                    </span>

                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      className="mooday-customer-service__type-caret"
                    >
                      <path
                        d="M2.5 4.5 6 8l3.5-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {isTypeOpen && (
                    <div
                      ref={typeListRef}
                      id={typeListId}
                      role="listbox"
                      aria-labelledby="inquiry-type-label"
                      className="mooday-customer-service__type-list"
                      onKeyDown={handleTypeListKeyDown}
                    >
                      {inquiryTypeOptions.map((option, index) => (
                        <div
                          key={option.value}
                          ref={(element) => {
                            typeOptionRefs.current[index] = element
                          }}
                          id={`inquiry-type-option-${index}`}
                          role="option"
                          aria-selected={
                            inquiryForm.type === option.value
                          }
                          tabIndex={index === activeTypeIndex ? 0 : -1}
                          className={`mooday-customer-service__type-option ${
                            index === activeTypeIndex
                              ? 'mooday-customer-service__type-option--active'
                              : ''
                          }`}
                          onMouseEnter={() => {
                            setActiveTypeIndex(index)
                          }}
                          onClick={() => handleTypeSelect(option)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}

                  {typeError && (
                    <p
                      id="inquiry-type-error"
                      className="mooday-customer-service__type-error"
                      role="alert"
                    >
                      문의 유형을 선택해 주세요.
                    </p>
                  )}
                </div>
              </div>


              {/* INQUIRY TITLE */}
              <div className="mooday-customer-service__inquiry-field">
                <label htmlFor="inquiry-title">
                  제목
                </label>

                <input
                  id="inquiry-title"
                  type="text"
                  name="title"
                  value={inquiryForm.title}
                  onChange={handleInquiryChange}
                  placeholder="문의 제목을 입력해 주세요"
                  required
                />
              </div>


              {/* INQUIRY EMAIL */}
              <div className="mooday-customer-service__inquiry-field">
                <label htmlFor="inquiry-email">
                  이메일
                </label>

                <input
                  id="inquiry-email"
                  type="email"
                  name="email"
                  value={inquiryForm.email}
                  onChange={handleInquiryChange}
                  placeholder="답변 받을 이메일을 입력해 주세요"
                  required
                />
              </div>


              {/* INQUIRY CONTENT */}
              <div className="mooday-customer-service__inquiry-field mooday-customer-service__inquiry-field--textarea">
                <label htmlFor="inquiry-content">
                  문의 내용
                </label>

                <textarea
                  id="inquiry-content"
                  name="content"
                  value={inquiryForm.content}
                  onChange={handleInquiryChange}
                  placeholder="문의 내용을 입력해 주세요"
                  rows="8"
                  required
                />
              </div>


              {/* INQUIRY NOTE */}
              <div className="mooday-customer-service__inquiry-note">
                <p>
                  주문 취소·반품은 My Page의 Order에서,
                  상품 기본 정보는 Product Detail에서 확인해 주세요.
                </p>
              </div>


              {/* SUBMIT */}
              <button
                type="submit"
                className="mooday-customer-service__inquiry-submit"
              >
                Submit Inquiry
              </button>


              {inquirySubmitted && (
                <p
                  className="mooday-customer-service__inquiry-success"
                  role="status"
                >
                  문의가 접수되었습니다.
                </p>
              )}
            </form>
          </div>
        </section>


        {/* CONTACT */}
        <section
          className="mooday-customer-service__section"
          aria-labelledby="customer-contact-title"
        >
          <div className="mooday-customer-service__section-label">
            <span>04</span>
            <span>CONTACT</span>
          </div>

          <div className="mooday-customer-service__section-content">
            <h2 id="customer-contact-title">
              Other ways to contact us
            </h2>

            <div className="mooday-customer-service__contact">
              <div className="mooday-customer-service__contact-row">
                <span>EMAIL</span>

                <a href="mailto:customer@mooday.com">
                  customer@mooday.com
                </a>
              </div>

              <div className="mooday-customer-service__contact-row">
                <span>TEL</span>

                <a href="tel:07000000000">
                  070-0000-0000
                </a>
              </div>

              <div className="mooday-customer-service__contact-row">
                <span>HOURS</span>

                <p>
                  Monday - Friday / 10:00 - 17:00
                  <br />
                  Lunch / 12:00 - 13:00
                  <br />
                  Weekend & Holiday Closed
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
