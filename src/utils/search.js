import { products } from '../data/Products.js'
import { editorials } from '../data/Editorial.js'
import { communityPosts } from '../data/Community.js'

const HISTORY_KEY = 'mooday.recentSearches'
const HISTORY_LIMIT = 8

const productTagKeywords = ['가디건', '롱슬리브', '후드', '셔츠', '니트']

export const suggestedTags = productTagKeywords.filter(
  (tag) => products.some((product) => product.name.includes(tag))
)

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
    // 저장소 접근이 제한되어도 검색은 계속 사용할 수 있습니다.
  }
}

export function clearRecentSearches() {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch {
    // 저장소 접근이 제한되면 기록 삭제를 건너뜁니다.
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
