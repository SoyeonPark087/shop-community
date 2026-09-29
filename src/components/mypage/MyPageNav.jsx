/**
 * ==================================================
 * mooday My Page Navigation
 * STEP 1 - Sort 제거
 * ==================================================
 *
 * 현재 정책
 * --------------------------------------------------
 * - 메뉴 이름과 순서는 기존 시안 유지
 * - Profile만 활성 상태
 * - 나머지 메뉴는 아직 비활성 상태
 * - 기존 우측 Sort UI는 완전히 제거
 * - 작은 화면에서는 메뉴 영역만 가로 스크롤
 *
 * 중요
 * --------------------------------------------------
 * 이번 STEP에서는 메뉴 기능이나 Route를 추가하지 않습니다.
 * Profile 외 탭은 여전히 비동작 상태입니다.
 */


/* ==================================================
   1. MY PAGE TAB DATA
================================================== */

// 메뉴 이름과 순서는 현재 시안 기준을 유지합니다.
// Profile 외 메뉴는 아직 실제 페이지 / Route가 없습니다.
const TABS = [
  'Profile',
  'Order',
  'My Collection',
  'Wishlist',
  'My Post',
  'Account',
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
    </nav>
  )
}