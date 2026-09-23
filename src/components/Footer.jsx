import "./Footer.css";

const footerLinks = [
  "Agreement",
  "Privacy",
  "Membership",
  "Order Tracking",
  "Instagram",
  "Customer Care",
  "Notice",
];

function Footer() {
  return (
    <footer className="footer">
      <div className="inner footer__top">
        <p className="footer__copyright">
          © Copyright ©2026 mooday All rights reserved.
        </p>

        <div className="footer__right">
          <nav
            className="footer__links"
            aria-label="Footer links"
          >
            {footerLinks.map((link) => (
              <a key={link} href="#">
                {link}
              </a>
            ))}
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
    </footer>
  );
}

export default Footer;