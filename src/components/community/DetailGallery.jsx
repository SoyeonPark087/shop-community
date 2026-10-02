
import { useEffect, useRef, useState } from 'react'


/*
  =========================================
  DETAIL IMAGE COMPONENT
  =========================================

  이미지 파일이 아직 없는 경우
  브라우저의 깨진 이미지 아이콘 대신
  빈 이미지 슬롯을 표시합니다.
*/

function GalleryImage({ src, alt }) {

  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)
  }, [src])


  if (!src || hasError) {

    return (

      <div
        className="mooday-detail-gallery__placeholder"
        role="img"
        aria-label={`${alt} - 이미지 준비 중`}
      >

        <span>IMAGE COMING SOON</span>

      </div>

    )

  }


  return (

    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      decoding="async"
    />

  )

}


/*
  =========================================
  DETAIL GALLERY
  =========================================
*/

export default function DetailGallery({
  images = [],
  author = '',
}) {

  /*
    현재 큰 이미지로 표시할 이미지 번호
  */

  const [selectedIndex, setSelectedIndex] = useState(0)


  /*
    화살표 표시 여부 및 양 끝 상태
  */

  const [scrollState, setScrollState] = useState({
    hasOverflow: false,
    canPrevious: false,
    canNext: false,
  })


  const trackRef = useRef(null)


  /*
    실제 이미지 배열에서 첫 번째 이미지를
    초기 메인 이미지로 사용합니다.
  */

  const selectedImage = images[selectedIndex]


  /* =================================
     01. SCROLL STATUS
  ================================= */

  useEffect(() => {

    const track = trackRef.current

    if (!track) {
      return
    }


    function updateScrollState() {

      const maxScroll =
        track.scrollWidth - track.clientWidth

      const hasOverflow = maxScroll > 1

      setScrollState({

        hasOverflow,

        canPrevious:
          hasOverflow && track.scrollLeft > 1,

        canNext:
          hasOverflow &&
          track.scrollLeft < maxScroll - 1,

      })

    }


    /*
      이미지 개수나 컨테이너 너비가 변경되면
      넘침 여부를 다시 계산합니다.
    */

    updateScrollState()

    track.addEventListener('scroll', updateScrollState)


    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateScrollState)
        : null


    if (observer) {
      observer.observe(track)
    }


    /*
      초기 레이아웃 계산 이후에도 상태를 확인
    */

    const frame = window.requestAnimationFrame(
      updateScrollState
    )


    return () => {

      track.removeEventListener(
        'scroll',
        updateScrollState
      )

      observer?.disconnect()

      window.cancelAnimationFrame(frame)

    }

  }, [images.length])


  /* =================================
     02. THUMBNAIL SCROLL
  ================================= */

  function moveThumbnails(direction) {

    const track = trackRef.current

    if (!track) {
      return
    }

    const firstThumbnail =
      track.querySelector(
        '.mooday-detail-gallery__thumbnail'
      )

    if (!firstThumbnail) {
      return
    }


    /*
      썸네일 1개 너비 + 실제 CSS gap
    */

    const style = window.getComputedStyle(track)

    const gap = parseFloat(style.columnGap) || 0

    const moveDistance =
      firstThumbnail.getBoundingClientRect().width
      + gap


    track.scrollBy({

      left: moveDistance * direction,

      behavior: 'smooth',

    })

  }


  /* =================================
     03. SELECT IMAGE
  ================================= */

  function selectImage(index) {
    setSelectedIndex(index)
  }


  if (images.length === 0) {
    return null
  }


  return (

    <div className="mooday-detail-gallery">


      {/* =================================
          MAIN IMAGE
      ================================= */}

      <div className="mooday-detail-gallery__main">

        <GalleryImage
          src={selectedImage}
          alt={`${author}님의 스타일 사진 ${
            selectedIndex + 1
          }`}
        />

      </div>


      {/* =================================
          THUMBNAILS
      ================================= */}

      <div className="mooday-detail-gallery__navigation">


        {/*
          표시 영역보다 이미지가 많은 경우에만
          화살표를 표시합니다.
        */}

        {scrollState.hasOverflow && (

          <button
            type="button"
            className="
              mooday-detail-gallery__arrow
              mooday-detail-gallery__arrow--previous
            "
            onClick={() => moveThumbnails(-1)}
            disabled={!scrollState.canPrevious}
            aria-label="이전 썸네일 보기"
          >

            ←

          </button>

        )}


        <div
          className="mooday-detail-gallery__track"
          ref={trackRef}
        >

          {images.map((image, index) => (

            <button
              key={`${image}-${index}`}
              type="button"
              className={
                `mooday-detail-gallery__thumbnail${
                  index === selectedIndex
                    ? ' mooday-detail-gallery__thumbnail--selected'
                    : ''
                }`
              }
              onClick={() => selectImage(index)}
              aria-label={`이미지 ${index + 1} 보기`}
              aria-pressed={index === selectedIndex}
            >

              <GalleryImage
                src={image}
                alt={`스타일 썸네일 ${index + 1}`}
              />

            </button>

          ))}

        </div>


        {scrollState.hasOverflow && (

          <button
            type="button"
            className="
              mooday-detail-gallery__arrow
              mooday-detail-gallery__arrow--next
            "
            onClick={() => moveThumbnails(1)}
            disabled={!scrollState.canNext}
            aria-label="다음 썸네일 보기"
          >

            →

          </button>

        )}


      </div>

    </div>

  )

}