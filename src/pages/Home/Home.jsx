import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { products } from "../../data/Products.js";

const newArrivals = products.slice(0, 4);

const editorialCards = [
  {
    eyebrow: "EDITORIAL",
    title: "Soft\nStructures",
    description: "Relaxed shapes for a more\ngrounded you.",
    image: `${import.meta.env.BASE_URL}images/home/edit1.png`,
  },
  {
    eyebrow: "STYLE GUIDE",
    title: "Weekend\nLayers",
    description: "Pieces that move with you",
    image: `${import.meta.env.BASE_URL}images/home/edit2.png`,
  },
];

const communityLooks = [
  {
    id: 1,
    user: "@dosik8789",
    count: "3 items",
    tags: "#mood  #homewear",
    text: "Some mood, different day.",
    image: `${import.meta.env.BASE_URL}images/home/look1.png`,
  },
  {
    id: 2,
    user: "@sumi.day",
    count: "2 items",
    tags: "#daily  #outside",
    text: "오늘도 좋은 하루 :)",
    image: `${import.meta.env.BASE_URL}images/home/look2.png`,
  },
  {
    id: 3,
    user: "@hyejinee",
    count: "2 items",
    tags: "#daily  #sweater",
    text: "A slow morning, a better day!",
    image: `${import.meta.env.BASE_URL}images/home/look3.png`,
  },
  {
    id: 4,
    user: "@seo_yoon",
    count: "2 items",
    tags: "#yoga  #outfit",
    text: "Everyday pieces, new perspective.",
    image: `${import.meta.env.BASE_URL}images/home/look4.png`,
  },
];

const moodCards = [
  {
    title: "City Ease",
    description: "Modern pieces for your rhythm.",
    image: `${import.meta.env.BASE_URL}images/home/edit3.png`,
    tone: "light",
  },
  {
    title: "Soft Neutral",
    description: "Calm essentials for everyday",
    image: `${import.meta.env.BASE_URL}images/home/edit4.png`,
    tone: "dark",
  },
  {
    title: "Weekend Calm",
    description: "A little white for your tone",
    image: `${import.meta.env.BASE_URL}images/home/edit5.png`,
    tone: "light",
  },
];

function ArrowLink({ children, to, className = "" }) {
  return (
    <Link
      className={`arrow-link ${className}`}
      to={to}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <img
        className="hero__image"
        src={`${import.meta.env.BASE_URL}images/home/herobanner.png`}
        alt=""
      />

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

          <ArrowLink className="hero__cta">
            지금, 만나보기
          </ArrowLink>
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
          <ArrowLink to="/shop">View All</ArrowLink>
        </div>

        <div className="product-grid">
          {newArrivals.map((product) => (
            <article className="product-card" key={product.id}>
              <a className="product-card__image" href={`#/shop/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="product-card__body">
                <h3>{product.name}</h3>
                <p>₩ {product.price.toLocaleString("ko-KR")}</p>
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
    <section id="editorial" className="home-editorial-grid">
      {editorialCards.map((card, index) => (
        <article
          className={`home-editorial-card home-editorial-card--${index + 1}`}
          key={card.title}
        >
          <img src={card.image} alt="" />
          <div className="home-editorial-card__shade" />
          <div className="home-editorial-card__content">
            <span className="home-editorial-card__eyebrow">{card.eyebrow}</span>
            <h2>{card.title.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</h2>
            <p>
              {card.description.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
            </p>
            <ArrowLink to="/editorial">Read More</ArrowLink>
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
          <ArrowLink to="/community">View All</ArrowLink>
        </div>

        <div className="community-grid">
          {communityLooks.map((look) => (
            <article className="community-card" key={look.id}>
              <div className="community-card__image">
                <img src={look.image} alt="" />
              </div>
              <div className="community-card__meta">
                <div className="community-card__row">
                  <strong>{look.user}</strong>
                  <span className="community-card__count">{look.count} <span aria-hidden="true">›</span></span>
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
          {moodCards.map((mood, index) => (
            <article
              className={`
                mood-card
                mood-card--${mood.tone}
                ${index === 0 ? "mood-card--large" : "mood-card--small"}
              `}
              key={mood.title}
            >
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

export default function Home() {
  return (
    <main className="mooday-home">
      <Hero />
      <NewArrivals />
      <Editorial />
      <Community />
      <ShopByMood />
    </main>
  );
}
