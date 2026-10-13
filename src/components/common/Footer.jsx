import { Link } from 'react-router-dom'
import './Footer.css'


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


function Footer() {
  const handlePlaceholderClick = (event) => {
    event.preventDefault()
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">

          <p className="footer__copyright">
            © Copyright ©2026 mooday All rights reserved.
          </p>

          <div className="footer__right">
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

        </div>
      </div>
    </footer>
  )
}

export default Footer