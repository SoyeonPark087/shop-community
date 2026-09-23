
import CommunityCard from './CommunityCard.jsx'

export default function CommunityGrid({ posts }) {
  return (
    <div className="mooday-community-grid">
      {posts.map((post) => (
        <CommunityCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  )
}