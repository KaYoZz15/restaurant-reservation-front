import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'

function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="hero">
      <div className="hero__content">
        <p className="eyebrow">Cuisine de saison · Ambiance chaleureuse</p>
        <h1>Votre prochaine table vous attend.</h1>
        <p className="hero__description">
          Découvrez notre carte et réservez votre prochaine table en quelques
          instants.
        </p>
        <div className="hero__actions">
          <Link
            className="button"
            to={isAuthenticated ? '/reservations/new' : '/signup'}
          >
            {isAuthenticated ? 'Réserver une table' : 'Créer mon compte'}
          </Link>
          <Link className="button button--outline" to="/menu">
            Découvrir le menu
          </Link>
        </div>
      </div>

      <aside className="hero__card" aria-label="Informations du restaurant">
        <span className="hero__card-label">Bienvenue</span>
        <h2>Une cuisine sincère, pensée pour être partagée.</h2>
        <p>
          Découvrez notre menu puis choisissez le moment qui vous ressemble
          pour partager une table.
        </p>
      </aside>
    </section>
  )
}

export default HomePage
