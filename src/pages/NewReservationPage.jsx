import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import FormField from '../components/FormField'
import { useAuth } from '../context/auth'
import { getAvailability } from '../services/availabilityService'
import { createReservation } from '../services/reservationService'

function getToday() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function NewReservationPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const today = getToday()
  const [formData, setFormData] = useState({
    name: [user?.fname, user?.lname].filter(Boolean).join(' '),
    phone: user?.phone || '',
    number_of_people: '2',
    reservation_date: '',
    reservation_time: '',
    note: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [availableSlots, setAvailableSlots] = useState([])
  const [availabilityMessage, setAvailabilityMessage] = useState('')
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)

  useEffect(() => {
    const selectedDate = formData.reservation_date

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(selectedDate) ||
      selectedDate < today
    ) {
      setAvailableSlots([])
      setAvailabilityMessage('')
      return
    }

    let isActive = true
    setIsLoadingAvailability(true)
    setAvailableSlots([])
    setAvailabilityMessage('')

    getAvailability(selectedDate)
      .then((response) => {
        if (!isActive) return

        const slots = Array.isArray(response.slots)
          ? response.slots
              .filter((slot) => slot.available)
              .map((slot) => String(slot.time).slice(0, 5))
          : []

        setAvailableSlots(slots)

        if (slots.length === 0) {
          setAvailabilityMessage(
            response.is_closed
              ? response.reason || 'Le restaurant est fermé à cette date.'
              : 'Aucun créneau n’est disponible pour cette date.',
          )
        }
      })
      .catch((requestError) => {
        if (isActive) {
          setAvailabilityMessage(
            requestError.message ||
              'Impossible de charger les créneaux disponibles.',
          )
        }
      })
      .finally(() => {
        if (isActive) setIsLoadingAvailability(false)
      })

    return () => {
      isActive = false
    }
  }, [formData.reservation_date, today])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === 'reservation_date' ? { reservation_time: '' } : {}),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.reservation_date ||
      !formData.reservation_time
    ) {
      setError('Veuillez remplir tous les champs obligatoires.')
      return
    }

    if (formData.reservation_date < today) {
      setError('La date de réservation ne peut pas être antérieure à aujourd’hui.')
      return
    }

    const numberOfPeople = Number(formData.number_of_people)

    if (!Number.isInteger(numberOfPeople) || numberOfPeople < 1) {
      setError('Le nombre de personnes doit être un entier positif.')
      return
    }

    setIsLoading(true)

    try {
      await createReservation({
        ...formData,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        number_of_people: numberOfPeople,
        note: formData.note.trim(),
      })
      navigate('/my-reservations', {
        replace: true,
        state: { message: 'Votre réservation a bien été créée.' },
      })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="booking-page">
      <div className="booking-page__intro">
        <p className="eyebrow">Votre prochaine table</p>
        <h1>Réserver</h1>
        <p>
          Indiquez-nous quand vous souhaitez venir. La réservation sera placée
          en attente jusqu’à sa validation.
        </p>
        <Link to="/my-reservations">← Retour à mes réservations</Link>
      </div>

      <div className="booking-card">
        <Alert>{error}</Alert>

        <form onSubmit={handleSubmit}>
          <FormField
            id="name"
            label="Nom de la réservation *"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="form-grid">
            <FormField
              id="phone"
              label="Téléphone *"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <FormField
              id="number_of_people"
              label="Nombre de personnes *"
              type="number"
              min="1"
              max="30"
              step="1"
              value={formData.number_of_people}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-grid">
            <FormField
              id="reservation_date"
              label="Date *"
              type="date"
              min={today}
              value={formData.reservation_date}
              onChange={handleChange}
              required
            />
            <div className="form-field">
              <label htmlFor="reservation_time">Heure *</label>
              <select
                id="reservation_time"
                name="reservation_time"
                value={formData.reservation_time}
                onChange={handleChange}
                disabled={
                  !formData.reservation_date ||
                  isLoadingAvailability ||
                  availableSlots.length === 0
                }
                required
              >
                <option value="">
                  {isLoadingAvailability
                    ? 'Chargement des créneaux...'
                    : formData.reservation_date
                      ? 'Choisir un créneau'
                      : 'Choisissez d’abord une date'}
                </option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {isLoadingAvailability && (
                <p className="availability-message" role="status">
                  Recherche des créneaux disponibles...
                </p>
              )}
              {!isLoadingAvailability && availabilityMessage && (
                <p
                  className="availability-message availability-message--error"
                  role="alert"
                >
                  {availabilityMessage}
                </p>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="note">Note (facultatif)</label>
            <textarea
              id="note"
              name="note"
              rows="4"
              placeholder="Allergies, emplacement souhaité..."
              value={formData.note}
              onChange={handleChange}
            />
          </div>

          <button className="button button--full" type="submit" disabled={isLoading}>
            {isLoading ? 'Réservation en cours...' : 'Confirmer la réservation'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default NewReservationPage

