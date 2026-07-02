import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import Menu from '../components/Menu'
import { useAuth } from '../context/auth'
import { getMenu } from '../services/menuService'

function MenuPage() {
  const { isAuthenticated } = useAuth()
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    getMenu()
      .then((response) => {
        if (isActive) {
          setItems(Array.isArray(response.data) ? response.data : [])
        }
      })
      .catch((requestError) => {
        if (isActive) setError(requestError.message)
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [])

  return (
    <section className="menu-page menu-page--premium">
      <header className="menu-page__heading">
        <p className="home-label">La carte</p>
        <h1>Une cuisine au rythme des saisons.</h1>
        <p>
          Des produits choisis avec soin, cuisinés simplement et généreusement.
        </p>
        <svg
          className="menu-page__botanical"
          viewBox="0 0 180 220"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 205c52-63 90-116 140-183" />
          <path d="M67 149c-35-5-48 12-44 47 34 4 48-13 44-47Z" />
          <path d="M108 101c-30-9-45 3-47 34 30 9 45-4 47-34Z" />
          <path d="M139 60c26 0 37-14 32-40-26 0-37 14-32 40Z" />
          <path d="M124 80c-4-25 7-38 32-39 4 25-7 38-32 39Z" />
          <circle cx="156" cy="13" r="4" />
          <circle cx="171" cy="25" r="3" />
        </svg>
      </header>

      {isLoading && <p className="page-status">Chargement du menu...</p>}
      {!isLoading && <Alert>{error}</Alert>}
      {!isLoading && !error && items.length === 0 && (
        <div className="empty-state">
          <h2>Le menu est en préparation.</h2>
          <p>Revenez bientôt pour découvrir notre carte.</p>
        </div>
      )}
      {!isLoading && !error && items.length > 0 && (
        <>
          <Menu items={items} />
          <aside className="menu-reservation-cta">
            <span className="menu-reservation-cta__icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 10h18" />
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
              </svg>
            </span>
            <div>
              <p className="home-label">Réservation</p>
              <h2>Une table vous attend.</h2>
              <p>
                Consultez les disponibilités et réservez facilement en quelques
                clics.
              </p>
            </div>
            <Link
              className="button menu-reservation-cta__button"
              to={isAuthenticated ? '/reservations/new' : '/login'}
            >
              Réserver une table <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </>
      )}
    </section>
  )
}

export default MenuPage
