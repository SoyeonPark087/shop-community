import { useState } from 'react'
import { Link } from "react-router-dom";
export default function CommunityCard({ post }) {

  const detailPath = `/community/${post.id}`

  const [imageError, setImageError] = useState(false)

  const hasImage = typeof post.image === 'string' && post.image.trim() !== '' && !imageError

  return (
    <article className="mooday-community-card">

      <Link
        className="mooday-community-card__link"
        to={detailPath}
        aria-label={`${post.author}님의 게시글 자세히 보기`}
      >

        {hasImage ? (

          <img
            className="mooday-community-card__image"
            src={post.image}
            alt={`${post.author}님의 스타일 사진`}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />

        ) : (

          <div
            className="
              mooday-community-card__image
              mooday-community-card__image--placeholder
            "
            role="img"
            aria-label="게시글 이미지가 아직 등록되지 않았습니다."
          />

        )}

        <div className="mooday-community-card__body">

          <div className="mooday-community-card__meta">

            <span className="mooday-community-card__author">
              @{post.author}
            </span>

            <span className="mooday-community-card__items">

              {post.productCount}{' '}

              {post.productCount === 1 ? 'item' : 'items'}

              <span aria-hidden="true">
                ›
              </span>

            </span>

          </div>

          <p className="mooday-community-card__tags">

            {post.tags
              .map((tag) => `#${tag}`)
              .join(' ')}

          </p>

          <p className="mooday-community-card__excerpt">
            {post.excerpt}
          </p>

        </div>

      </Link>

    </article>
  )
}
