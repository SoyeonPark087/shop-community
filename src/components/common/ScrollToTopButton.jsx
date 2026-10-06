import { useEffect, useState } from 'react'

import './ScrollToTopButton.css'


function ScrollToTopButton() {
  /*
    Top 버튼 표시 여부

    false
    → 페이지 상단 또는 400px 이하
    → 버튼 숨김

    true
    → 400px 초과 스크롤
    → 버튼 표시
  */
  const [isVisible, setIsVisible] = useState(false)


  useEffect(() => {
    /*
      현재 Scroll 위치에 따라
      버튼 표시 여부를 결정합니다.
    */
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }


    /*
      새로고침 / 뒤로가기 등으로
      Scroll 위치가 이미 내려가 있는 경우를 위해
      최초 1회 현재 위치를 확인합니다.
    */
    handleScroll()


    /*
      passive: true
      → Scroll 이벤트가 브라우저의 실제 스크롤 동작을
        불필요하게 막지 않도록 합니다.
    */
    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )


    /*
      컴포넌트가 사라질 경우
      등록한 Scroll Event를 제거합니다.
    */
    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )
    }
  }, [])


  /*
    Top 버튼 클릭

    일반 환경
    → smooth scroll

    사용자가 운영체제 또는 브라우저에서
    모션 감소 설정을 사용하고 있는 경우
    → 즉시 최상단으로 이동
  */
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