// 메뉴 이름과 순서는 최종 시안 기준입니다.
// Profile 외 탭은 아직 페이지가 없습니다.
const TABS = [
  'Profile',
  'Order',
  'My Collection',
  'Wishlist',
  'My Post',
  'Account',
]

export default function MyPageNav() {
  return (
    <nav
      className="mooday-mypage-nav"
      aria-label="마이페이지 메뉴"
    >
      {/* 작은 화면에서는 메뉴만 가로 스크롤됩니다. */}
      <div
        className="mooday-mypage-nav__scroll"
        tabIndex={0}
        aria-label="마이페이지 메뉴, 좌우로 스크롤 가능"
      >
        <ul className="mooday-mypage-nav__list">
          {TABS.map((tab) => (
            <li
              className="mooday-mypage-nav__item"
              key={tab}
            >
              {/*
                활성 탭과 미구현 탭 모두 span을 사용합니다.
                현재는 링크 및 클릭 이벤트가 없습니다.
              */}
              {tab === 'Profile' ? (
                <span
                  className="
                    mooday-mypage-nav__tab
                    mooday-mypage-nav__tab--active
                  "
                  aria-current="page"
                >
                  {tab}
                </span>
              ) : (
                <span
                  className="
                    mooday-mypage-nav__tab
                    mooday-mypage-nav__tab--inactive
                  "
                  aria-disabled="true"
                >
                  {tab}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Sort는 시안 외형만 표시하는 비작동 요소입니다. */}
      <span
        className="mooday-mypage-nav__sort"
        aria-disabled="true"
      >
        Sort

        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="m3 4.5 3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </nav>
  )
}