import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'

function HomeIcon({ name }) {
  const icons = {
    leaf: (
      <>
        <path d="M20 4C12 5 7 10 7 17c5 1 10-1 13-13Z" />
        <path d="M6 21c2-6 6-9 11-12" />
      </>
    ),
    dish: (
      <>
        <path d="M4 17h16" />
        <path d="M6 17a6 6 0 0 1 12 0" />
        <path d="M12 9V6" />
        <path d="M10 6h4" />
        <path d="M3 20h18" />
      </>
    ),
    heart: (
      <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
        <path d="M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    star: (
      <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      {icons[name]}
    </svg>
  )
}

function ReservationIllustration() {
  return (
    <svg
      className="home-booking__illustration"
      viewBox="0 0 190 300"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M66 31v81c0 16 10 27 24 27s24-11 24-27V31" />
      <path d="M78 31v74M90 31v74M102 31v74" />
      <path d="M90 139v132" />
      <path d="M119 270c7-75 14-137 47-213" />
      <path d="M147 102c-21-7-31 1-34 25 21 6 31-2 34-25Z" />
      <path d="M165 57c-21-2-29 9-27 31 20 2 29-9 27-31Z" />
      <path d="M135 163c22-8 34 1 38 25-21 8-34-1-38-25Z" />
      <path d="M126 217c19-4 30 5 33 25-20 5-30-4-33-25Z" />
    </svg>
  )
}

const quickBenefits = [
  {
    icon: 'leaf',
    title: 'Produits frais',
    text: 'et de saison',
  },
  {
    icon: 'dish',
    title: 'Cuisine maison',
    text: 'et généreuse',
  },
  {
    icon: 'heart',
    title: 'Ambiance',
    text: 'chaleureuse',
  },
]

const values = [
  {
    icon: 'leaf',
    title: 'Cuisine de saison',
    text: 'Des plats préparés avec des produits frais sélectionnés avec soin.',
  },
  {
    icon: 'users',
    title: 'Pour tous',
    text: 'Un lieu convivial pour partager de bons moments.',
  },
  {
    icon: 'star',
    title: 'Qualité & passion',
    text: 'Une équipe passionnée pour vous offrir le meilleur.',
  },
]

function HomePage() {
  const { isAuthenticated, user } = useAuth()
  const reservationPath = isAuthenticated
    ? user?.role === 'admin'
      ? '/reservations'
      : '/reservations/new'
    : '/login'

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__content">
          <p className="home-label">
            Cuisine de saison · Ambiance chaleureuse
          </p>
          <h1 id="home-title">Votre prochaine table vous attend.</h1>
          <p className="home-hero__description">
            Découvrez notre carte et réservez votre prochaine table en quelques
            instants.
          </p>

          <div className="home-hero__actions">
            <Link className="button" to={reservationPath}>
              Réserver une table
            </Link>
            <Link className="button button--outline" to="/menu">
              Découvrir le menu
            </Link>
          </div>

          <div className="home-benefits" aria-label="Nos points forts">
            {quickBenefits.map((benefit) => (
              <div key={benefit.title}>
                <span className="home-benefits__icon">
                  <HomeIcon name={benefit.icon} />
                </span>
                <p>
                  <strong>{benefit.title}</strong>
                  <span>{benefit.text}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="home-hero__visual">
          <img
            src="/images/restaurant-hero.png"
            alt="Salle chaleureuse du restaurant La Fourchette"
          />
          <Link className="home-reservation-card" to={reservationPath}>
            <span className="home-reservation-card__icon">
              <HomeIcon name="calendar" />
            </span>
            <span>
              <strong>Réservez votre table</strong>
              <small>En quelques clics, à tout moment.</small>
            </span>
            <span className="home-reservation-card__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="home-values" id="values" aria-label="Nos valeurs">
        {values.map((value) => (
          <article key={value.title}>
            <span className="home-values__icon">
              <HomeIcon name={value.icon} />
            </span>
            <h2>{value.title}</h2>
            <p>{value.text}</p>
          </article>
        ))}
      </section>

      <section className="home-showcase" id="about">
        <div className="home-menu-intro">
          <p className="home-label">Notre carte</p>
          <h2>Des saveurs à découvrir</h2>
          <p>
            Entrées gourmandes, plats savoureux, desserts faits maison...
            Laissez-vous tenter par notre carte.
          </p>
          <Link className="button button--outline" to="/menu">
            Découvrir le menu
          </Link>
        </div>

        <div className="home-food-grid" aria-label="Quelques plats de la carte">
          <img
            className="home-food-grid__main"
            src="/images/dish-main.png"
            alt="Poisson rôti et légumes de saison"
            loading="lazy"
          />
          <img
            src="/images/dish-starter.png"
            alt="Salade fraîche aux poires et noisettes"
            loading="lazy"
          />
          <img
            src="/images/dish-dessert.png"
            alt="Fondant au chocolat et glace vanille"
            loading="lazy"
          />
        </div>

        <div className="home-booking">
          <div>
            <p className="home-label">Réservation</p>
            <h2>Votre table, quand vous le souhaitez</h2>
            <p>
              Consultez les disponibilités et réservez facilement en ligne.
            </p>
            <Link className="button home-booking__button" to={reservationPath}>
              Réserver maintenant <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ReservationIllustration />
        </div>
      </section>
    </div>
  )
}

export default HomePage
