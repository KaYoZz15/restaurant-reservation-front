import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

function Layout() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', {
      replace: true,
      state: { message: 'Vous avez bien été déconnecté.' },
    })
  }

  return (
    <div className="app">
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Retour à l'accueil">
          <span className="brand__mark" aria-hidden="true">
            LF
          </span>
          <span>
            <strong>La Fourchette</strong>
            <small>Restaurant & réservations</small>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Navigation principale">
          <NavLink className="nav-home" to="/">
            Accueil
          </NavLink>
          <NavLink to="/menu">Menu</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/my-reservations">Mes réservations</NavLink>
              <NavLink className="nav-profile" to="/profile">
                {user?.fname ? `Bonjour ${user.fname}` : 'Mon profil'}
              </NavLink>
              <button
                className="button button--small button--outline"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Connexion</NavLink>
              <NavLink className="button button--small" to="/signup">
                Créer un compte
              </NavLink>
            </>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>La Fourchette · Une table, un moment à partager.</p>
      </footer>
    </div>
  )
}

export default Layout
