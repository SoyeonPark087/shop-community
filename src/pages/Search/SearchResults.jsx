import { Link, useSearchParams } from 'react-router-dom'
import { cleanSearchQuery, searchSite } from '../../utils/search.js'
import './SearchResults.css'

const won = new Intl.NumberFormat('ko-KR')

export default function SearchResults() {
  const [params] = useSearchParams()
  const query = cleanSearchQuery(params.get('q') || '')
  const { products } = searchSite(query)

  return (
    <main className="search-page" aria-label="상품 검색 결과">
      <p className="search-page__summary" role="status">
        {`"${query}" 검색 결과 ${products.length}개`}
      </p>
      {products.length > 0 && (
        <div className="search-page__grid">
          {products.map((product) => (
            <article className="search-page__card" key={product.id}>
              <Link to={`/shop/${product.id}`}>
                <img src={product.image} alt={product.name} loading="lazy" />
                <h2>{product.name}</h2>
                <p>₩ {won.format(product.price)}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
