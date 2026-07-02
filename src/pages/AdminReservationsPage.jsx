import { useEffect, useMemo, useState } from 'react'
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

function AdminIcon({ type }) {
  const paths = {
    calendar: (
      <>
        <path d="M6 2v4M18 2v4M3 9h18" />
        <rect x="3" y="4" width="18" height="18" rx="3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6l4 2" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    reset: (
      <>
        <path d="M4 4v6h6" />
        <path d="M5.5 15a8 8 0 1 0 1.8-8.4L4 10" />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[type]}
    </svg>
  )
}

function AdminReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentAction, setCurrentAction] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

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

  const statistics = useMemo(
    () => ({
      total: reservations.length,
      pending: reservations.filter(
        (reservation) => reservation.status === 'pending',
      ).length,
      confirmed: reservations.filter(
        (reservation) => reservation.status === 'confirmed',
      ).length,
    }),
    [reservations],
  )

  const filteredReservations = useMemo(() => {
    const search = searchFilter.trim().toLocaleLowerCase('fr-FR')

    return reservations.filter((reservation) => {
      const matchesStatus =
        statusFilter === 'all' || reservation.status === statusFilter
      const matchesDate =
        !dateFilter ||
        String(reservation.reservation_date).slice(0, 10) === dateFilter
      const searchableContent = [
        reservation.name,
        reservation.phone,
        reservation.note,
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('fr-FR')

      return (
        matchesStatus &&
        matchesDate &&
        (!search || searchableContent.includes(search))
      )
    })
  }, [dateFilter, reservations, searchFilter, statusFilter])

  function resetFilters() {
    setStatusFilter('all')
    setDateFilter('')
    setSearchFilter('')
  }

  return (
    <section className="admin-page">
      <header className="admin-hero">
        <div className="admin-hero__intro">
          <p className="eyebrow">Administration</p>
          <h1>Toutes les réservations</h1>
          <p>
            Consultez les demandes des clients et mettez à jour leur statut.
          </p>
        </div>

        <div className="admin-statistics" aria-label="Statistiques">
          <article className="admin-statistic">
            <span className="admin-statistic__icon">
              <AdminIcon type="calendar" />
            </span>
            <div>
              <strong>{statistics.total}</strong>
              <p>Réservations au total</p>
            </div>
          </article>
          <article className="admin-statistic">
            <span className="admin-statistic__icon">
              <AdminIcon type="clock" />
            </span>
            <div>
              <strong>{statistics.pending}</strong>
              <p>En attente à valider</p>
            </div>
          </article>
          <article className="admin-statistic admin-statistic--confirmed">
            <span className="admin-statistic__icon">
              <AdminIcon type="check" />
            </span>
            <div>
              <strong>{statistics.confirmed}</strong>
              <p>Réservations confirmées</p>
            </div>
          </article>
        </div>
      </header>

      <div className="admin-feedback" aria-live="polite">
        <Alert type="success">{message}</Alert>
        <Alert>{error}</Alert>
      </div>

      {isLoading && (
        <div className="admin-state">
          <span className="admin-state__loader" aria-hidden="true" />
          <p>Chargement des réservations...</p>
        </div>
      )}

      {!isLoading && !error && reservations.length === 0 && (
        <div className="empty-state admin-empty-state">
          <h2>Aucune réservation pour le moment.</h2>
          <p>Les nouvelles demandes apparaîtront automatiquement ici.</p>
        </div>
      )}

      {!isLoading && reservations.length > 0 && (
        <>
          <form
            className="admin-filters"
            onSubmit={(event) => event.preventDefault()}
          >
            <label>
              <span>Statut</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmées</option>
                <option value="cancelled">Annulées</option>
              </select>
            </label>

            <label>
              <span>Date</span>
              <input
                type="date"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
              />
            </label>

            <label className="admin-filters__search">
              <span>Recherche client</span>
              <span className="admin-filters__input">
                <AdminIcon type="search" />
                <input
                  type="search"
                  placeholder="Nom, téléphone ou note"
                  value={searchFilter}
                  onChange={(event) => setSearchFilter(event.target.value)}
                />
              </span>
            </label>

            <button
              className="admin-filters__reset"
              type="button"
              onClick={resetFilters}
            >
              <AdminIcon type="reset" />
              Réinitialiser
            </button>
          </form>

          {filteredReservations.length === 0 ? (
            <div className="empty-state admin-empty-state">
              <h2>Aucune réservation ne correspond aux filtres.</h2>
              <p>Modifiez les critères ou réinitialisez la recherche.</p>
            </div>
          ) : (
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
                  {filteredReservations.map((reservation) => {
                    const isPending = reservation.status === 'pending'
                    const isCancelled = reservation.status === 'cancelled'

                    return (
                      <tr key={reservation.id}>
                        <td data-label="Client">
                          <strong>{reservation.name}</strong>
                        </td>
                        <td data-label="Téléphone">
                          {reservation.phone || '—'}
                        </td>
                        <td data-label="Date">
                          {formatDate(reservation.reservation_date)}
                        </td>
                        <td data-label="Heure">
                          {String(
                            reservation.reservation_time || '',
                          ).slice(0, 5) || '—'}
                        </td>
                        <td data-label="Personnes">
                          {reservation.number_of_people}
                        </td>
                        <td className="admin-table__note" data-label="Note">
                          {reservation.note || '—'}
                        </td>
                        <td data-label="Statut">
                          <span
                            className={`status status--${reservation.status}`}
                          >
                            {STATUS_LABELS[reservation.status] ||
                              reservation.status}
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
                              <span className="admin-actions__empty">
                                Aucune
                              </span>
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
        </>
      )}
    </section>
  )
}

export default AdminReservationsPage

