import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { key, pathname, search, hash } = useLocation()

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  useLayoutEffect(() => {
    // Keep in-page anchor navigation available.
    if (hash) return

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [key, pathname, search, hash])

  return null
}
