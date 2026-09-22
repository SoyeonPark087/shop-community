import React from "react";
import "./Home.css";

const newArrivals = [
  {
    id: 1,
    name: "Ribbed Tank Top",
    price: "₩ 49,000",
    image: "/images/new1.png",
  },
  {
    id: 2,
    name: "Wide Nylon Pants",
    price: "₩ 89,000",
    image: "/images/new2.png",
  },
  {
    id: 3,
    name: "Back Tie Long Sleeve",
    price: "₩ 56,000",
    image: "/images/new3.png",
  },
  {
    id: 4,
    name: "Relaxed Knit Tee",
    price: "₩ 62,000",
    image: "/images/new4.png",
  },
];

const editorialCards = [
  {
    eyebrow: "EDITORIAL",
    title: "Soft\nStructures",
    description: "Relaxed shapes for a more\ngrounded you.",
    image: "/images/edit1.png",
  },
  {
    eyebrow: "STYLE GUIDE",
    title: "Weekend\nLayers",
    description: "Pieces that move with you",
    image: "/images/edit2.png",
  },
];

const communityLooks = [
  {
    id: 1,
    user: "@dosik8789",
    count: "3 items",
    tags: "#mood  #homewear",
    text: "Some mood, different day.",
    image: "/images/look1.png",
  },
  {
    id: 2,
    user: "@sumi.day",
    count: "2 items",
    tags: "#daily  #outside",
    text: "오늘도 좋은 하루 :)",
    image: "/images/look2.png",
  },
  {
    id: 3,
    user: "@hyejinee",
    count: "2 items",
    tags: "#daily  #sweater",
    text: "A slow morning, a better day!",
    image: "/images/look3.png",
  },
  {
    id: 4,
    user: "@seo_yoon",
    count: "2 items",
    tags: "#yoga  #outfit",
    text: "Everyday pieces, new perspective.",
    image: "/images/look4.png",
  },
];

const moodCards = [
  {
    title: "City Ease",
    description: "Modern pieces for your rhythm.",
    image: "/images/edit3.png",
    tone: "light",
  },
  {
    title: "Soft Neutral",
    description: "Calm essentials for everyday",
    image: "/images/edit4.png",
    tone: "dark",
  },
  {
    title: "Weekend Calm",
    description: "A little white for your tone",
    image: "/images/edit5.png",
    tone: "light",
  },
];

const footerLinks = [
  "Agreement",
  "Privacy",
  "Membership",
  "Order Tracking",
  "Instagram",
  "Customer Care",
  "Notice",
];

function ArrowLink({ children, className = "" }) {
  return (
    <a className={`arrow-link ${className}`} href="#">
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <nav className="site-header__nav site-header__nav--left" aria-label="Primary">
          <a href="#shop">Shop</a>
          <a href="#editorial">Editorial</a>
          <a href="#community">Community</a>
        </nav>

        <a className="site-header__logo" href="#top" aria-label="Mooday home">
          <img src="/images/Logo.svg" alt="Mooday" />
        </a>

        <nav className="site-header__nav site-header__nav--right" aria-label="Utilities">
          <button type="button">Search</button>
          <button type="button">Cart</button>
          <button type="button">Account</button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <Header />
      <img className="hero__image" src="/images/homebanner1.png" alt="" />
      <div className="hero__overlay" />

      <div className="hero__content">
        <div className="hero__copy">
          <h1>
            오늘도,
            <br />
            좋은 무드를 입다
          </h1>
          <p>
            일상의 순간이 더 특별해지는
            <br />
            MOODAY의 새로운 컬렉션을 만나보세요.
          </p>
          <ArrowLink className="hero__cta">지금, 만나보기</ArrowLink>
        </div>

        <div className="hero__pagination" aria-label="Hero slide 1 of 3">
          <span className="hero__pagination-current">01</span>
          <span className="hero__pagination-line">
            <span />
          </span>
          <span className="hero__pagination-total">03</span>
        </div>
      </div>
    </section>
  );
}

function NewArrivals() {
  return (
    <section id="shop" className="section new-arrivals">
      <div className="inner">
        <div className="section-heading">
          <h2>New Arrivals</h2>
          <ArrowLink>View All</ArrowLink>
        </div>

        <div className="product-grid">
          {newArrivals.map((product) => (
            <article className="product-card" key={product.id}>
              <a className="product-card__image" href="#">
                <img src={product.image} alt={product.name} />
              </a>
              <div className="product-card__body">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Editorial() {
  return (
    <section id="editorial" className="editorial-grid">
      {editorialCards.map((card, index) => (
        <article className={`editorial-card editorial-card--${index + 1}`} key={card.title}>
          <img src={card.image} alt="" />
          <div className="editorial-card__shade" />
          <div className="editorial-card__content">
            <span className="editorial-card__eyebrow">{card.eyebrow}</span>
            <h2>{card.title.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</h2>
            <p>
              {card.description.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
            </p>
            <ArrowLink>Read More</ArrowLink>
          </div>
        </article>
      ))}
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="section community">
      <div className="inner">
        <div className="section-heading">
          <h2>Community Looks</h2>
          <ArrowLink>View All</ArrowLink>
        </div>

        <div className="community-grid">
          {communityLooks.map((look) => (
            <article className="community-card" key={look.id}>
              <a className="community-card__image" href="#">
                <img src={look.image} alt="" />
              </a>
              <div className="community-card__meta">
                <div className="community-card__row">
                  <strong>{look.user}</strong>
                  <a href="#">{look.count} <span aria-hidden="true">›</span></a>
                </div>
                <p className="community-card__tags">{look.tags}</p>
                <p className="community-card__text">{look.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopByMood() {
  return (
    <section className="section shop-by-mood">
      <div className="inner">
        <div className="section-heading section-heading--simple">
          <h2>Shop by mood</h2>
        </div>

        <div className="mood-grid">
          {moodCards.map((mood) => (
            <article className={`mood-card mood-card--${mood.tone}`} key={mood.title}>
              <img src={mood.image} alt="" />
              <div className="mood-card__shade" />
              <div className="mood-card__content">
                <h3>{mood.title}</h3>
                <p>{mood.description}</p>
                <ArrowLink>Shop</ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandBanner() {
  return (
    <section className="brand-banner">
      <img src="/images/homebanner2.png" alt="" />
      <div className="brand-banner__content inner">
        <p>
          A New Perspective
          <br />
          for a Better Day.
        </p>
        <img className="brand-banner__logo" src="/images/Logo.svg" alt="Mooday" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="inner footer__top">
        <p className="footer__copyright">© Copyright ©2026 mooday All rights reserved.</p>
        <nav className="footer__links" aria-label="Footer links">
          {footerLinks.map((link) => <a key={link} href="#">{link}</a>)}
        </nav>
      </div>

      <div className="inner footer__details">
        <p>대표 | 기획브랜드&nbsp;&nbsp; 사업자등록번호 | 000-00-00000</p>
        <p>통신판매업신고 | 제0000-서울-0000호</p>
        <p>주소 | 서울특별시 000구 00로 00&nbsp;&nbsp; 고객센터 | 070-0000-0000&nbsp;&nbsp; E-mail | customer@mooday.com</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="mooday-home">
      <Hero />
      <NewArrivals />
      <Editorial />
      <Community />
      <ShopByMood />
      <BrandBanner />
      <Footer />
    </main>
  );
}
