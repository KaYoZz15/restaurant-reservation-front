import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import FormField from '../components/FormField'
import { useAuth } from '../context/auth'

function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState(location.state?.error || '')
  const [isLoading, setIsLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(formData)
      navigate(location.state?.from || '/profile', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__heading">
          <p className="eyebrow">Heureux de vous revoir</p>
          <h1>Connexion</h1>
          <p>Accédez à votre espace personnel.</p>
        </div>

        <Alert type="success">{location.state?.message}</Alert>
        <Alert>{error}</Alert>

        <form onSubmit={handleSubmit}>
          <FormField
            id="email"
            label="Adresse e-mail"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.fr"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormField
            id="password"
            label="Mot de passe"
            type="password"
            autoComplete="current-password"
            placeholder="Votre mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="button button--full" type="submit" disabled={isLoading}>
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <p className="auth-card__footer">
          Pas encore de compte ? <Link to="/signup">S’inscrire</Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage
