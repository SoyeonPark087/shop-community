
import { Link } from 'react-router-dom'
import './Footer.css'


// =========================================================
// FOOTER LINK DATA
// 기존 링크와 라우팅 유지
// =========================================================

const footerLinks = [
  {
    label: 'About',
    to: '/about',
    type: 'route',
  },
  {
    label: 'Agreement',
    href: '#',
    type: 'placeholder',
  },
  {
    label: 'Privacy',
    href: '#',
    type: 'placeholder',
  },
  {
    label: 'Order Tracking',
    href: '#',
    type: 'placeholder',
  },
  {
    label: 'Customer Care',
    to: '/customer-service',
    type: 'route',
  },
  {
    label: 'Instagram',
    href: '#',
    type: 'placeholder',
  },
]


// =========================================================
// FOOTER COMPONENT
// LEFT   : MOODAY LOGO
// CENTER : LINKS + BUSINESS INFORMATION
// RIGHT  : COPYRIGHT
// =========================================================

function Footer() {
  // 아직 구현되지 않은 메뉴의 이동 방지
  const handlePlaceholderClick = (event) => {
    event.preventDefault()
  }

  // public/icons/Logo.svg
  // Vite base 경로에 대응
  const logoSrc = `${import.meta.env.BASE_URL}icons/Logo.svg`

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">

          {/* ==========================================
              LEFT — MOODAY BRAND LOGO
              기존 Header와 동일한 로고 자산 사용
          ========================================== */}
          <div className="footer__brand">
            <Link
              to="/"
              className="footer__brand-link"
              aria-label="mooday 홈으로 이동"
            >
              <img
                src={logoSrc}
                alt="mooday"
                className="footer__logo"
              />
            </Link>
          </div>


          {/* ==========================================
              CENTER — LINKS + BUSINESS DETAILS
              기존 데이터와 연결 기능 유지
          ========================================== */}
          <div className="footer__content">
            <nav
              className="footer__links"
              aria-label="Footer links"
            >
              {footerLinks.map((link) => {
                if (link.type === 'route') {
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                    >
                      {link.label}
                    </Link>
                  )
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handlePlaceholderClick}
                  >
                    {link.label}
                  </a>
                )
              })}
            </nav>

            <div className="footer__details">
              <p>
                대표 | 기획브랜드&nbsp;&nbsp;
                사업자등록번호 | 000-00-00000
              </p>

              <p>
                통신판매업신고 | 제0000-서울-0000호
              </p>

              <p>
                주소 | 서울특별시 000구 00로 00&nbsp;&nbsp;
                고객센터 | 070-0000-0000&nbsp;&nbsp;
                E-mail | customer@mooday.com
              </p>
            </div>
          </div>


          {/* ==========================================
              RIGHT — COPYRIGHT
              기존 문구 그대로 유지
          ========================================== */}
          <p className="footer__copyright">
            © Copyright ©2026 mooday All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  )
}

export default Footer
