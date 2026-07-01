import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="eyebrow">Erreur 404</p>
      <h1>Cette table n’existe pas.</h1>
      <p>La page demandée est introuvable.</p>
      <Link className="button" to="/">
        Retour à l’accueil
      </Link>
    </section>
  )
}

export default NotFoundPage

