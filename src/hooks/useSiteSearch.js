import { useNavigate } from 'react-router-dom'
import { cleanSearchQuery, saveRecentSearch } from '../utils/search.js'

export default function useSiteSearch(onSearch) {
  const navigate = useNavigate()

  return (query) => {
    const value = cleanSearchQuery(query)
    if (!value) return

    saveRecentSearch(value)
    navigate(`/search?${new URLSearchParams({ q: value })}`)
    onSearch?.()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
}
