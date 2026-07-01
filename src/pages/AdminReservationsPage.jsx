import { useEffect, useState } from 'react'
import Alert from '../components/Alert'
import {
  cancelReservation,
  getAllReservations,
  validateReservation,
} from '../services/reservationService'

const STATUS_LABELS = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
}

function formatDate(value) {
  if (!value) return '—'

  const datePart = String(value).slice(0, 10)
  const [year, month, day] = datePart.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  if (Number.isNaN(date.getTime())) return datePart

  return new Intl.DateTimeFormat('fr-FR').format(date)
}

function AdminReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentAction, setCurrentAction] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let isActive = true

    getAllReservations()
      .then((response) => {
        if (isActive) {
          setReservations(Array.isArray(response.data) ? response.data : [])
        }
      })
      .catch((requestError) => {
        if (isActive) setError(requestError.message)
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [])

  function startAction(id, type) {
    setError('')
    setMessage('')
    setCurrentAction({ id, type })
  }

  function updateReservationStatus(id, status) {
    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation,
      ),
    )
  }

  async function handleValidate(reservation) {
    startAction(reservation.id, 'validate')

    try {
      await validateReservation(reservation.id)
      updateReservationStatus(reservation.id, 'confirmed')
      setMessage(`La réservation de ${reservation.name} a été validée.`)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setCurrentAction(null)
    }
  }

  async function handleCancel(reservation) {
    const shouldCancel = window.confirm(
      `Voulez-vous vraiment annuler la réservation de ${reservation.name} ?`,
    )

    if (!shouldCancel) return

    startAction(reservation.id, 'cancel')

    try {
      await cancelReservation(reservation.id)
      updateReservationStatus(reservation.id, 'cancelled')
      setMessage(`La réservation de ${reservation.name} a été annulée.`)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setCurrentAction(null)
    }
  }

  function isActionRunning(id, type) {
    return currentAction?.id === id && currentAction?.type === type
  }

  return (
    <section className="admin-page">
      <header className="page-heading page-heading--actions">
        <div>
          <p className="eyebrow">Administration</p>
          <h1>Toutes les réservations</h1>
          <p>
            Consultez les demandes des clients et mettez à jour leur statut.
          </p>
        </div>
        {!isLoading && (
          <div className="admin-summary">
            <strong>{reservations.length}</strong>
            <span>réservation{reservations.length > 1 ? 's' : ''}</span>
          </div>
        )}
      </header>

      <Alert type="success">{message}</Alert>
      <Alert>{error}</Alert>

      {isLoading && (
        <p className="page-status">Chargement des réservations...</p>
      )}

      {!isLoading && !error && reservations.length === 0 && (
        <div className="empty-state">
          <h2>Aucune réservation pour le moment.</h2>
          <p>Les nouvelles demandes apparaîtront automatiquement ici.</p>
        </div>
      )}

      {!isLoading && reservations.length > 0 && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Téléphone</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Personnes</th>
                <th>Note</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => {
                const isPending = reservation.status === 'pending'
                const isCancelled = reservation.status === 'cancelled'

                return (
                  <tr key={reservation.id}>
                    <td data-label="Client">
                      <strong>{reservation.name}</strong>
                    </td>
                    <td data-label="Téléphone">{reservation.phone || '—'}</td>
                    <td data-label="Date">
                      {formatDate(reservation.reservation_date)}
                    </td>
                    <td data-label="Heure">
                      {String(reservation.reservation_time || '').slice(0, 5) ||
                        '—'}
                    </td>
                    <td data-label="Personnes">
                      {reservation.number_of_people}
                    </td>
                    <td className="admin-table__note" data-label="Note">
                      {reservation.note || '—'}
                    </td>
                    <td data-label="Statut">
                      <span className={`status status--${reservation.status}`}>
                        {STATUS_LABELS[reservation.status] || reservation.status}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <div className="admin-actions">
                        {isPending && (
                          <button
                            className="button button--small"
                            type="button"
                            disabled={Boolean(currentAction)}
                            onClick={() => handleValidate(reservation)}
                          >
                            {isActionRunning(reservation.id, 'validate')
                              ? 'Validation...'
                              : 'Valider'}
                          </button>
                        )}
                        {!isCancelled && (
                          <button
                            className="button button--danger button--small"
                            type="button"
                            disabled={Boolean(currentAction)}
                            onClick={() => handleCancel(reservation)}
                          >
                            {isActionRunning(reservation.id, 'cancel')
                              ? 'Annulation...'
                              : 'Annuler'}
                          </button>
                        )}
                        {isCancelled && (
                          <span className="admin-actions__empty">Aucune</span>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default AdminReservationsPage

