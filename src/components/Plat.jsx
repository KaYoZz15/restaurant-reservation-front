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
    <article
      className={`dish-card ${plat.image ? 'dish-card--with-image' : ''}`}
    >
      {plat.image && (
        <img src={plat.image} alt="" className="dish-card__image" loading="lazy" />
      )}
      <div className="dish-card__content">
        <div className="dish-card__heading">
          <h3>{plat.name}</h3>
          {price && <span>{price}</span>}
        </div>
        <p>{plat.description || 'Description à venir.'}</p>
      </div>
    </article>
  )
}

export default Plat
