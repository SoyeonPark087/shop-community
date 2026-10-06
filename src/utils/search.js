import { products } from '../data/Products.js'
import { editorials } from '../data/Editorial.js'
import { communityPosts, communityMainTags } from '../data/Community.js'

const HISTORY_KEY = 'mooday.recentSearches'
const HISTORY_LIMIT = 8

export const suggestedTags = communityMainTags
  .filter((tag) => tag !== 'All')
  .slice(0, 5)

export function cleanSearchQuery(value) {
  return value.normalize('NFKC').replace(/#/g, '').trim().replace(/\s+/g, ' ')
}

export function getRecentSearches() {
  try {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
    return Array.isArray(saved)
      ? saved.filter((item) => typeof item === 'string' && cleanSearchQuery(item)).slice(0, HISTORY_LIMIT)
      : []
  } catch {
    return []
  }
}

export function saveRecentSearch(query) {
  const value = cleanSearchQuery(query)
  if (!value) return

  const recent = getRecentSearches().filter(
    (item) => item.toLowerCase() !== value.toLowerCase()
  )

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify([value, ...recent].slice(0, HISTORY_LIMIT)))
  } catch {
    // Search remains available when browser storage is unavailable.
  }
}

export function clearRecentSearches() {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch {
    // Storage can be disabled by browser settings.
  }
}

export function searchSite(query) {
  const tokens = cleanSearchQuery(query).toLowerCase().split(' ').filter(Boolean)
  const matches = (fields) => {
    const text = fields.flat().filter(Boolean).join(' ').normalize('NFKC').toLowerCase()
    return tokens.length > 0 && tokens.every((token) => text.includes(token))
  }

  return {
    products: products.filter((product) => matches([
      product.name, product.category, product.description, product.material,
      product.colors?.map((color) => color.name),
    ])),
    editorials: editorials.filter((editorial) => matches([
      editorial.title, editorial.koreanTitle, editorial.subtitle,
      editorial.description, editorial.cardDescription, editorial.paragraphs,
    ])),
    community: communityPosts.filter((post) => matches([
      post.author, post.tags, post.excerpt,
    ])),
  }
}
