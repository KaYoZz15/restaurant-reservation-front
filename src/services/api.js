const API_URL = import.meta.env.VITE_API_URL || '/api'
const TOKEN_KEY = 'restaurant_token'

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

function buildUrl(endpoint) {
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

  return `${baseUrl}${path}`
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return response.json()
  }

  const text = await response.text()
  return text ? { message: text } : null
}

export async function apiRequest(endpoint, options = {}) {
  const {
    authenticated = false,
    body,
    headers: customHeaders,
    ...fetchOptions
  } = options
  const headers = new Headers(customHeaders)

  if (body !== undefined && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  if (authenticated) {
    const token = localStorage.getItem(TOKEN_KEY)

    if (!token) {
      throw new ApiError(
        'Vous devez être connecté pour effectuer cette action.',
        401,
      )
    }

    headers.set('Authorization', `Bearer ${token}`)
  }

  let response

  try {
    response = await fetch(buildUrl(endpoint), {
      ...fetchOptions,
      headers,
      body:
        body instanceof FormData || typeof body === 'string'
          ? body
          : body !== undefined
            ? JSON.stringify(body)
            : undefined,
    })
  } catch {
    throw new ApiError(
      "Impossible de joindre l'API. Vérifiez que le serveur est démarré.",
    )
  }

  const data = await parseResponse(response)

  if (!response.ok) {
    const details = Array.isArray(data?.errors)
      ? ` ${data.errors.join(', ')}`
      : ''
    const fallbackMessage =
      response.status >= 500
        ? 'Le service est momentanément indisponible.'
        : 'Une erreur est survenue.'

    throw new ApiError(
      `${data?.message || fallbackMessage}${details}`,
      response.status,
      data,
    )
  }

  return data
}

export { API_URL, TOKEN_KEY }
