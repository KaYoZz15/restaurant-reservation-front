function FormField({ label, id, ...inputProps }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...inputProps} />
    </div>
  )
}

export default FormField

