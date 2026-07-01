function formatPrice(price) {
  const numericPrice = Number(price)

  if (!Number.isFinite(numericPrice)) {
    return null
  }

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(numericPrice)
}

function Plat({ plat }) {
  const price = formatPrice(plat.price)

  return (
    <article className="dish-card">
      <div className="dish-card__heading">
        <h3>{plat.name}</h3>
        {price && <span>{price}</span>}
      </div>
      <p>{plat.description || 'Description à venir.'}</p>
    </article>
  )
}

export default Plat

