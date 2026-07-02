import { apiRequest } from './api'

export function getAvailability(date) {
  const searchParams = new URLSearchParams({ date })

  return apiRequest(`/availability?${searchParams.toString()}`)
}
