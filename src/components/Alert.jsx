function Alert({ children, type = 'error' }) {
  if (!children) return null

  return (
    <div className={`alert alert--${type}`} role="alert">
      {children}
    </div>
  )
}

export default Alert

