import { useState } from 'react'
import './CustomerService.css'


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


export default function CustomerService() {
  const [openIndex, setOpenIndex] = useState(null)

  const [inquiryForm, setInquiryForm] = useState({
    type: '',
    title: '',
    content: '',
    email: '',
  })

  const [inquirySubmitted, setInquirySubmitted] = useState(false)


  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }


  const handleInquiryChange = (event) => {
    const { name, value } = event.target

    setInquiryForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  const handleInquirySubmit = (event) => {
    event.preventDefault()

    if (
      !inquiryForm.type ||
      !inquiryForm.title.trim() ||
      !inquiryForm.content.trim() ||
      !inquiryForm.email.trim()
    ) {
      return
    }

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
              <div className="mooday-customer-service__inquiry-field">
                <label htmlFor="inquiry-type">
                  문의 유형
                </label>

                <select
                  id="inquiry-type"
                  name="type"
                  value={inquiryForm.type}
                  onChange={handleInquiryChange}
                  required
                >
                  <option value="">
                    문의 유형을 선택해 주세요
                  </option>

                  <option value="product">
                    상품 관련
                  </option>

                  <option value="order">
                    주문 및 배송
                  </option>

                  <option value="return">
                    교환 / 반품
                  </option>

                  <option value="account">
                    회원정보
                  </option>

                  <option value="editorial">
                    에디터 지원
                  </option>

                  <option value="community">
                    커뮤니티
                  </option>

                  <option value="etc">
                    기타
                  </option>
                </select>
              </div>


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


              <div className="mooday-customer-service__inquiry-note">
                <p>
                  주문 취소·반품은 My Page의 Order에서,
                  상품 기본 정보는 Product Detail에서 확인해 주세요.
                </p>
              </div>


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