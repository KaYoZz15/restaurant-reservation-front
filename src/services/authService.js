import { apiRequest } from './api'

export function signup(credentials) {
  return apiRequest('/signup', {
    method: 'POST',
    body: credentials,
  })
}

export function login(credentials) {
  return apiRequest('/login', {
    method: 'POST',
    body: credentials,
  })
}

export function getCurrentUser() {
  return apiRequest('/me', {
    authenticated: true,
  })
}

