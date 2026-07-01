import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth'

function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth()
  const location = useLocation()

  if (isInitializing) {
    return <p className="page-status">Vérification de votre session...</p>
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          error: 'Vous devez être connecté pour accéder à cette page.',
        }}
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
