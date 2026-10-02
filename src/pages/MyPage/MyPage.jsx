import MyPageNav from '../../components/mypage/MyPageNav.jsx'
import ProfileForm from '../../components/mypage/ProfileForm.jsx'

import './MyPage.css'


export default function MyPage() {
  return (
    <main
      className="mooday-mypage"
      id="mooday-profile-top"
    >
      <div className="mooday-mypage__nav-inner">
        <MyPageNav />
      </div>

      <div className="mooday-mypage__content-inner">
        <section
          className="mooday-mypage__content"
          aria-labelledby="mooday-profile-heading"
        >
          <ProfileForm />
        </section>
      </div>
    </main>
  )
}