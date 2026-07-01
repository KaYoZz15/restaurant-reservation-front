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
          Connectez-vous pour préparer votre venue et retrouver facilement vos
          informations.
        </p>
        <div className="hero__actions">
          <Link className="button" to={isAuthenticated ? '/profile' : '/signup'}>
            {isAuthenticated ? 'Voir mon profil' : 'Créer mon compte'}
          </Link>
          {!isAuthenticated && (
            <Link className="button button--outline" to="/login">
              Se connecter
            </Link>
          )}
        </div>
      </div>

      <aside className="hero__card" aria-label="Informations du restaurant">
        <span className="hero__card-label">Bienvenue</span>
        <h2>Une cuisine sincère, pensée pour être partagée.</h2>
        <p>
          L’authentification est prête. Le menu et les réservations viendront
          compléter cette première version.
        </p>
      </aside>
    </section>
  )
}

export default HomePage
