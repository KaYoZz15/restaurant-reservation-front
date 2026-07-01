import { useAuth } from '../context/auth'

function ProfilePage() {
  const { user } = useAuth()

  return (
    <section className="content-page">
      <div>
        <p className="eyebrow">Espace personnel</p>
        <h1>Mon profil</h1>
        <p>Votre session JWT est active et conservée après rechargement.</p>
      </div>

      <dl className="profile-card">
        <div>
          <dt>Nom complet</dt>
          <dd>
            {user?.fname} {user?.lname}
          </dd>
        </div>
        <div>
          <dt>Adresse e-mail</dt>
          <dd>{user?.email || 'Non renseignée'}</dd>
        </div>
        <div>
          <dt>Téléphone</dt>
          <dd>{user?.phone || 'Non renseigné'}</dd>
        </div>
        <div>
          <dt>Rôle</dt>
          <dd>{user?.role === 'admin' ? 'Administrateur' : 'Client'}</dd>
        </div>
      </dl>
    </section>
  )
}

export default ProfilePage
