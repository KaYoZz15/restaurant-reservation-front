import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function HomeHeader({ isAuthenticated, user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="home-header">
      <NavLink
        className="home-brand"
        to="/"
        aria-label="Retour à l’accueil"
        onClick={closeMenu}
      >
        <span className="home-brand__mark" aria-hidden="true">
          <img src="/images/lf-logo.png" alt="" />
        </span>
        <strong>La Fourchette</strong>
      </NavLink>

      <button
        className="home-menu-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="home-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
        <span className="sr-only">Ouvrir le menu</span>
      </button>

      <nav
        id="home-navigation"
        className={`home-navigation ${isMenuOpen ? 'home-navigation--open' : ''}`}
        aria-label="Navigation de l’accueil"
      >
        <NavLink to="/" onClick={closeMenu}>
          Accueil
        </NavLink>
        <NavLink to="/menu" onClick={closeMenu}>
          Menu
        </NavLink>

        {isAuthenticated ? (
          <>
            {user?.role === 'admin' ? (
              <NavLink to="/reservations" onClick={closeMenu}>
                Admin
              </NavLink>
            ) : (
              <NavLink to="/my-reservations" onClick={closeMenu}>
                Mes réservations
              </NavLink>
            )}
            <NavLink to="/profile" onClick={closeMenu}>
              Mon profil
            </NavLink>
            <button
              className="button button--small home-navigation__button"
              type="button"
              onClick={() => {
                closeMenu()
                onLogout()
              }}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={closeMenu}>
              Connexion
            </NavLink>
            <NavLink
              className="button button--small home-navigation__button"
              to="/signup"
              onClick={closeMenu}
            >
              Créer un compte
            </NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

export default HomeHeader
