import { Link } from 'react-router-dom'

function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="home-footer__content">
        <div className="home-footer__brand">
          <Link to="/" className="home-footer__logo">
            <span>
              <img src="/images/lf-logo.png" alt="" />
            </span>
            <strong>La Fourchette</strong>
          </Link>
          <p>Une cuisine sincère, pensée pour être partagée.</p>
          <div className="home-footer__socials" aria-label="Réseaux sociaux">
            <a href="#instagram" aria-label="Instagram">
              ig
            </a>
            <a href="#facebook" aria-label="Facebook">
              f
            </a>
            <a href="#pinterest" aria-label="Pinterest">
              p
            </a>
          </div>
        </div>

        <div>
          <h2>Informations</h2>
          <a href="#about">À propos</a>
          <a href="#values">Nos engagements</a>
          <a href="#events">Évènements</a>
          <a href="#contact">Contact</a>
        </div>

        <div>
          <h2>Horaires</h2>
          <p>Lun – Ven : 12h00 – 14h30</p>
          <p>19h00 – 22h30</p>
          <p>Sam – Dim : 12h00 – 15h00</p>
          <p>19h00 – 23h00</p>
        </div>

        <div id="contact">
          <h2>Nous trouver</h2>
          <p>12 Rue des Saveurs</p>
          <p>69000 Lyon</p>
          <a href="tel:+33400000000">04 00 00 00 00</a>
        </div>
      </div>

      <p className="home-footer__copyright">
        © 2026 La Fourchette – Tous droits réservés
      </p>
    </footer>
  )
}

export default HomeFooter
