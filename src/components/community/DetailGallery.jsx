import { useEffect, useRef, useState } from 'react'

function GalleryImage({ src, alt }) {

  const [failedSrc, setFailedSrc] = useState(null)

  if (!src || failedSrc === src) {

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

    <img src={src} alt={alt} onError={() => setFailedSrc(src)} decoding="async" />

  )

}

export default function DetailGallery({ images = [], author = '' }) {

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollState, setScrollState] = useState({
    hasOverflow: false,
    canPrevious: false,
    canNext: false,
  })

  const trackRef = useRef(null)

  const selectedImage = images[selectedIndex]

  useEffect(() => {

    const track = trackRef.current

    if (!track) {
      return
    }

    function updateScrollState() {

      const maxScroll = track.scrollWidth - track.clientWidth

      const hasOverflow = maxScroll > 1

      setScrollState({

        hasOverflow,

        canPrevious: hasOverflow && track.scrollLeft > 1,

        canNext: hasOverflow &&
          track.scrollLeft < maxScroll - 1,

      })

    }

    updateScrollState()

    track.addEventListener('scroll', updateScrollState)

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateScrollState)
        : null

    if (observer) {
      observer.observe(track)
    }

    const frame = window.requestAnimationFrame(updateScrollState)

    return () => {

      track.removeEventListener('scroll', updateScrollState)

      observer?.disconnect()

      window.cancelAnimationFrame(frame)

    }

  }, [images.length])

  function moveThumbnails(direction) {

    const track = trackRef.current

    if (!track) {
      return
    }

    const firstThumbnail = track.querySelector('.mooday-detail-gallery__thumbnail')

    if (!firstThumbnail) {
      return
    }

    const style = window.getComputedStyle(track)

    const gap = parseFloat(style.columnGap) || 0

    const moveDistance = firstThumbnail.getBoundingClientRect().width + gap

    track.scrollBy({ left: moveDistance * direction, behavior: 'smooth' })

  }

  function selectImage(index) {
    setSelectedIndex(index)
  }

  if (images.length === 0) {
    return null
  }

  return (

    <div className="mooday-detail-gallery">

      <div className="mooday-detail-gallery__main">

        <GalleryImage
          src={selectedImage}
          alt={`${author}님의 스타일 사진 ${
            selectedIndex + 1
          }`}
        />

      </div>

      <div className="mooday-detail-gallery__navigation">

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

        <div className="mooday-detail-gallery__track" ref={trackRef}>

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
