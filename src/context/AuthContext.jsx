import { useEffect, useState } from 'react'
import {
  getCurrentUser,
  login as loginRequest,
  signup as signupRequest,
} from '../services/authService'
import { TOKEN_KEY } from '../services/api'
import { AuthContext } from './auth'

const USER_KEY = 'restaurant_user'

function readStoredUser() {
  const storedUser = localStorage.getItem(USER_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser)
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(readStoredUser)
  const [isInitializing, setIsInitializing] = useState(Boolean(token))

  function saveSession(newToken, newUser) {
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)

    if (newUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(newUser))
      setUser(newUser)
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    if (!token) {
      setIsInitializing(false)
      return
    }

    let isActive = true

    getCurrentUser()
      .then((response) => {
        if (!isActive) return

        const currentUser = response.data
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
        setUser(currentUser)
      })
      .catch(() => {
        if (isActive) logout()
      })
      .finally(() => {
        if (isActive) setIsInitializing(false)
      })

    return () => {
      isActive = false
    }
  }, [token])

  async function login(credentials) {
    const response = await loginRequest(credentials)

    if (!response.token) {
      throw new Error("L'API n'a pas retourné de token JWT.")
    }

    saveSession(response.token, response.data)
    return response
  }

  async function signup(credentials) {
    const response = await signupRequest(credentials)

    // Compatible avec une future version du back qui retournerait un token.
    if (response.token) {
      saveSession(response.token, response.data)
    }

    return response
  }

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    isInitializing,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
