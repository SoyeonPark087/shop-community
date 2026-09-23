
import { useState } from 'react'

export default function CommunityCard({ post }) {

  /*
    01. 게시글 상세페이지 주소

    기존 이동 구조를 유지합니다.
    실제 Detail 화면 연결은 팀장 Router 통합 후
    정상적으로 작동합니다.
  */

  const detailPath = `/community/${post.id}`


  /*
    02. 이미지 로딩 실패 상태

    false: 이미지 표시 시도
    true : 이미지 표시 실패 → 빈 슬롯 표시

    파일이 없거나 잘못된 경로인 경우
    깨진 이미지 아이콘 대신 플레이스홀더를 보여줍니다.
  */

  const [imageError, setImageError] = useState(false)


  /*
    03. 이미지 표시 가능 여부

    post.image에 유효한 문자열 경로가 있고
    아직 로딩 실패가 발생하지 않았을 때만
    실제 이미지 요소를 표시합니다.
  */

  const hasImage =
    typeof post.image === 'string' &&
    post.image.trim() !== '' &&
    !imageError


  return (
    <article className="mooday-community-card">

      <a
        className="mooday-community-card__link"
        href={detailPath}
        aria-label={`${post.author}님의 게시글 자세히 보기`}
      >

        {/* =================================
            04. COMMUNITY IMAGE
        ================================= */}

        {hasImage ? (

          /*
            실제 이미지

            - 이미지 경로는 community.js에서 가져옵니다.
            - loading="lazy"로 이미지 로딩을 지연합니다.
            - onError 발생 시 빈 슬롯으로 전환합니다.
          */

          <img
            className="mooday-community-card__image"
            src={post.image}
            alt={`${post.author}님의 스타일 사진`}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />

        ) : (

          /*
            이미지 플레이스홀더

            실제 이미지가 없거나 경로가 잘못된 경우
            기존 카드 이미지 영역을 그대로 유지합니다.

            이미지 파일을 추가하기 전에도
            전체 카드 레이아웃이 무너지지 않습니다.
          */

          <div
            className="
              mooday-community-card__image
              mooday-community-card__image--placeholder
            "
            role="img"
            aria-label="게시글 이미지가 아직 등록되지 않았습니다."
          />

        )}


        {/* =================================
            05. CARD INFORMATION
        ================================= */}

        <div className="mooday-community-card__body">

          {/* 작성자 / 연동 상품 수 */}

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


          {/* 게시글 해시태그 */}

          <p className="mooday-community-card__tags">

            {post.tags
              .map((tag) => `#${tag}`)
              .join(' ')}

          </p>


          {/* 게시글 미리보기 문구 */}

          <p className="mooday-community-card__excerpt">
            {post.excerpt}
          </p>

        </div>

      </a>

    </article>
  )
}