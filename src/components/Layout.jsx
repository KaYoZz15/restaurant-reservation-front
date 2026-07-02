import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import HomeFooter from './HomeFooter'
import HomeHeader from './HomeHeader'

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
      <HomeHeader
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />

      <main>
        <Outlet />
      </main>

      <HomeFooter />
    </div>
  )
}

export default Layout
