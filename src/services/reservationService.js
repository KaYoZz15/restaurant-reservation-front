import { apiRequest } from './api'

export function getMyReservations() {
  return apiRequest('/my-reservations', {
    authenticated: true,
  })
}

export function createReservation(reservation) {
  return apiRequest('/reservations', {
    method: 'POST',
    authenticated: true,
    body: reservation,
  })
}

export function cancelReservation(id) {
  return apiRequest(`/reservations/${id}`, {
    method: 'DELETE',
    authenticated: true,
  })
}

export function getAllReservations() {
  return apiRequest('/reservations', {
    authenticated: true,
  })
}

export function validateReservation(id) {
  return apiRequest(`/reservations/${id}/validate`, {
    method: 'PATCH',
    authenticated: true,
  })
}
