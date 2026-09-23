import MyPageNav from '../components/mypage/MyPageNav.jsx'
import ProfileForm from '../components/mypage/ProfileForm.jsx'
import '../styles/myPage.css'

/**
 * 이 파일은 My Page 본문만 담당합니다.
 * Header/Footer 및 App/Router 연결은 팀장 통합 단계에서 처리합니다.
 */
export default function MyPage() {
  return (
    <main className="mooday-mypage" id="mooday-profile-top">
      <div className="mooday-mypage__inner">
        <MyPageNav />

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