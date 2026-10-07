import { useEffect, useState } from 'react'

import './ScrollToTopButton.css'


function ScrollToTopButton() {

  const [isVisible, setIsVisible] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    handleScroll()

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )
    }
  }, [])


  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }


  return (
    <button
      type="button"
      className={
        isVisible
          ? 'scroll-to-top scroll-to-top--visible'
          : 'scroll-to-top'
      }
      aria-label="페이지 최상단으로 이동"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={handleScrollToTop}
    >
      <span
        className="scroll-to-top__icon"
        aria-hidden="true"
      >
        ↑
      </span>
    </button>
  )
}


export default ScrollToTopButton