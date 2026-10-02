const TABS = [
  'PROFILE',
  'ORDER',
  'MY COLLECTION',
  'WISHLIST',
  'MY POST',
  'ACCOUNT',
]


/* ==================================================
   2. MY PAGE NAVIGATION
================================================== */

export default function MyPageNav() {
  return (
    <nav
      className="mooday-mypage-nav"
      aria-label="마이페이지 메뉴"
    >
      {/*
        작은 화면에서는 메뉴 영역만 가로 스크롤됩니다.

        기존에는 이 영역 오른쪽에 별도의 Sort UI가 있었지만,
        STEP 1 피드백 반영으로 Sort 요소를 완전히 제거했습니다.
      */}
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
                현재 Profile만 활성 메뉴입니다.

                나머지 메뉴는 추후 확장 가능성을 보여주기 위해
                시각적으로는 유지하되,
                현재는 링크 및 클릭 이벤트를 연결하지 않습니다.
              */}
              {tab === 'PROFILE' ? (
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
    </nav>
  )
}