import { Link } from 'react-router-dom'

function UnauthorizedPage() {
  return (
    <section className="not-found">
      <p className="eyebrow">Accès refusé</p>
      <h1>Cette page est réservée aux administrateurs.</h1>
      <p>Votre compte ne possède pas les droits nécessaires.</p>
      <Link className="button" to="/">
        Retour à l’accueil
      </Link>
    </section>
  )
}

export default UnauthorizedPage

