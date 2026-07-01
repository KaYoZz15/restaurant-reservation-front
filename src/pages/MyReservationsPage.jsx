import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Alert from '../components/Alert'
import ReservationCard from '../components/ReservationCard'
import {
  cancelReservation,
  getMyReservations,
} from '../services/reservationService'

function MyReservationsPage() {
  const location = useLocation()
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState(location.state?.message || '')

  useEffect(() => {
    let isActive = true

    getMyReservations()
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

  async function handleCancel(reservation) {
    const shouldCancel = window.confirm(
      `Voulez-vous vraiment annuler la réservation du ${String(
        reservation.reservation_date,
      ).slice(0, 10)} ?`,
    )

    if (!shouldCancel) return

    setError('')
    setMessage('')
    setCancellingId(reservation.id)

    try {
      await cancelReservation(reservation.id)
      setReservations((currentReservations) =>
        currentReservations.map((currentReservation) =>
          currentReservation.id === reservation.id
            ? { ...currentReservation, status: 'cancelled' }
            : currentReservation,
        ),
      )
      setMessage('La réservation a bien été annulée.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setCancellingId(null)
    }
  }

  return (
    <section className="reservations-page">
      <header className="page-heading page-heading--actions">
        <div>
          <p className="eyebrow">Espace client</p>
          <h1>Mes réservations</h1>
          <p>Retrouvez ici vos prochaines tables et votre historique.</p>
        </div>
        <Link className="button" to="/reservations/new">
          Nouvelle réservation
        </Link>
      </header>

      <Alert type="success">{message}</Alert>
      <Alert>{error}</Alert>

      {isLoading && (
        <p className="page-status">Chargement de vos réservations...</p>
      )}

      {!isLoading && !error && reservations.length === 0 && (
        <div className="empty-state">
          <h2>Vous n’avez pas encore de réservation.</h2>
          <p>Choisissez votre date et réservez votre prochaine table.</p>
          <Link className="button" to="/reservations/new">
            Réserver une table
          </Link>
        </div>
      )}

      {!isLoading && reservations.length > 0 && (
        <div className="reservation-list">
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              cancellingId={cancellingId}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default MyReservationsPage

