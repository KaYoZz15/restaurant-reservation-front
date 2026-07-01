import { apiRequest } from './api'

export function getMenu() {
  return apiRequest('/menu')
}

