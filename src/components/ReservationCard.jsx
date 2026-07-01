const STATUS_LABELS = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
}

function formatDate(value) {
  if (!value) return 'Date inconnue'

  const datePart = String(value).slice(0, 10)
  const [year, month, day] = datePart.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  if (Number.isNaN(date.getTime())) {
    return datePart
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function ReservationCard({
  reservation,
  cancellingId,
  onCancel,
}) {
  const isCancelled = reservation.status === 'cancelled'
  const time = String(reservation.reservation_time || '').slice(0, 5)

  return (
    <article className="reservation-card">
      <div className="reservation-card__top">
        <div>
          <p className="reservation-card__date">
            {formatDate(reservation.reservation_date)}
          </p>
          <h2>{reservation.name}</h2>
        </div>
        <span className={`status status--${reservation.status}`}>
          {STATUS_LABELS[reservation.status] || reservation.status}
        </span>
      </div>

      <div className="reservation-card__details">
        <p>
          <span>Heure</span>
          <strong>{time || 'Non précisée'}</strong>
        </p>
        <p>
          <span>Nombre de personnes</span>
          <strong>{reservation.number_of_people}</strong>
        </p>
        {reservation.note && (
          <p>
            <span>Note</span>
            <strong>{reservation.note}</strong>
          </p>
        )}
      </div>

      {!isCancelled && (
        <button
          className="button button--danger button--small"
          type="button"
          disabled={cancellingId === reservation.id}
          onClick={() => onCancel(reservation)}
        >
          {cancellingId === reservation.id
            ? 'Annulation...'
            : 'Annuler la réservation'}
        </button>
      )}
    </article>
  )
}

export default ReservationCard

