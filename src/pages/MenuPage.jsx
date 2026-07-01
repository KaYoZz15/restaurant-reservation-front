import { useEffect, useState } from 'react'
import Alert from '../components/Alert'
import Menu from '../components/Menu'
import { getMenu } from '../services/menuService'

function MenuPage() {
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
    <section className="menu-page">
      <header className="page-heading page-heading--center">
        <p className="eyebrow">La carte</p>
        <h1>Une cuisine au rythme des saisons.</h1>
        <p>
          Des produits choisis avec soin, cuisinés simplement et généreusement.
        </p>
      </header>

      {isLoading && <p className="page-status">Chargement du menu...</p>}
      {!isLoading && <Alert>{error}</Alert>}
      {!isLoading && !error && items.length === 0 && (
        <div className="empty-state">
          <h2>Le menu est en préparation.</h2>
          <p>Revenez bientôt pour découvrir notre carte.</p>
        </div>
      )}
      {!isLoading && !error && items.length > 0 && <Menu items={items} />}
    </section>
  )
}

export default MenuPage

