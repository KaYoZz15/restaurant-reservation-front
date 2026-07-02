import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import FormField from '../components/FormField'
import { useAuth } from '../context/auth'

const initialFormData = {
  fname: '',
  lname: '',
  email: '',
  phone: '',
  password: '',
}

function SignupPage() {
  const { isAuthenticated, signup } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)
  const [error, setError] = useState('')
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

    if (isLoading) return

    setError('')

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }

    setIsLoading(true)

    try {
      const response = await signup(formData)

      if (response.token) {
        navigate('/profile', { replace: true })
        return
      }

      navigate('/login', {
        replace: true,
        state: {
          message: 'Votre compte a bien été créé. Vous pouvez vous connecter.',
        },
      })
    } catch (requestError) {
      setError(
        requestError.status === 409
          ? 'Un compte existe déjà avec cette adresse e-mail.'
          : requestError.message,
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card auth-card--wide">
        <div className="auth-card__heading">
          <p className="eyebrow">Rejoignez-nous</p>
          <h1>Créer un compte</h1>
          <p>Quelques informations suffisent pour préparer vos réservations.</p>
        </div>

        <Alert>{error}</Alert>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <FormField
              id="fname"
              label="Prénom"
              type="text"
              autoComplete="given-name"
              value={formData.fname}
              onChange={handleChange}
              required
            />
            <FormField
              id="lname"
              label="Nom"
              type="text"
              autoComplete="family-name"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>

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
            id="phone"
            label="Téléphone"
            type="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <FormField
            id="password"
            label="Mot de passe"
            type="password"
            autoComplete="new-password"
            minLength="6"
            placeholder="6 caractères minimum"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="button button--full" type="submit" disabled={isLoading}>
            {isLoading ? 'Création en cours...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="auth-card__footer">
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </section>
  )
}

export default SignupPage
