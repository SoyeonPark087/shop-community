import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Drawer from './Drawer'
import useSiteSearch from '../../hooks/useSiteSearch.js'
import { clearRecentSearches, getRecentSearches, suggestedTags } from '../../utils/search.js'
import './Search.css'

const suggested = [
  { label: 'Editorials', path: '/editorial' },
  { label: 'Community Looks', path: '/community' },
  { label: 'Shop All', path: '/shop' },
]

export default function Search({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState(getRecentSearches)
  const inputRef = useRef(null)
  const search = useSiteSearch(onClose)

  useEffect(() => {
    if (!open) return
    const trigger = document.activeElement
    inputRef.current?.focus({ preventScroll: true })
    return () => trigger?.focus({ preventScroll: true })
  }, [open])

  return (
    <Drawer open={open} onClose={onClose} title="Search">
      <div className="search-content">
        <form
          role="search"
          className="search-content__input-wrap"
          onSubmit={(event) => {
            event.preventDefault()
            search(query)
          }}
        >
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="검색어를 입력하세요."
            aria-label="검색어"
          />
          <button type="submit" className="search-content__submit" aria-label="검색">
            <span className="search-content__icon" aria-hidden="true" />
          </button>
        </form>

        <section className="search-content__section">
          <h3>Explore Tags</h3>
          <div className="search-content__tags">
            {suggestedTags.map((tag) => (
              <button type="button" key={tag} onClick={() => search(tag)}>#{tag}</button>
            ))}
          </div>
        </section>

        <section className="search-content__section">
          <div className="search-content__heading">
            <h3>Recent Search</h3>
            {recentSearches.length > 0 && (
              <button type="button" onClick={() => {
                clearRecentSearches()
                setRecentSearches([])
              }}>전체 삭제</button>
            )}
          </div>
          {recentSearches.length ? (
            <ul className="search-content__list">
              {recentSearches.map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => search(item)}>{item}</button>
                </li>
              ))}
            </ul>
          ) : <p className="search-content__empty">최근 검색어가 없습니다.</p>}
        </section>

        <section className="search-content__section">
          <h3>Suggested</h3>
          <ul className="search-content__list">
            {suggested.map((item) => (
              <li key={item.path}>
                <Link to={item.path} onClick={onClose}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Drawer>
  )
}
