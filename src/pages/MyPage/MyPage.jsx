import ProfileForm from '../../components/mypage/ProfileForm.jsx'

import './MyPage.css'

const TABS = ['PROFILE', 'ORDER', 'COLLECTION', 'WISHLIST', 'MY POST', 'ACCOUNT']

export default function MyPage() {
  return (
    <main className="mooday-mypage" id="mooday-profile-top">
      <div className="mooday-mypage__nav-inner">
        <nav className="mooday-mypage-nav" aria-label="마이페이지 메뉴">
          <ul className="mooday-mypage-nav__list">
            {TABS.map((tab) => (
              <li className="mooday-mypage-nav__item" key={tab}>
                <span
                  className={`
                    mooday-mypage-nav__tab
                    ${
                      tab === 'PROFILE'
                        ? 'mooday-mypage-nav__tab--active'
                        : 'mooday-mypage-nav__tab--inactive'
                    }
                  `}
                  aria-current={tab === 'PROFILE' ? 'page' : undefined}
                >
                  {tab}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mooday-mypage__content-inner">
        <section className="mooday-mypage__content" aria-labelledby="mooday-profile-heading">
          <ProfileForm />
        </section>
      </div>
    </main>
  )
}
