import Plat from './Plat'

const CATEGORY_LABELS = {
  starter: 'Entrées',
  main: 'Plats',
  dessert: 'Desserts',
  drink: 'Boissons',
}

function Categorie({ name, plats }) {
  return (
    <section className="menu-category">
      <div className="menu-category__heading">
        <p className="eyebrow">À découvrir</p>
        <h2>{CATEGORY_LABELS[name] || name}</h2>
      </div>

      <div className="dish-list">
        {plats.map((plat) => (
          <Plat key={plat.id} plat={plat} />
        ))}
      </div>
    </section>
  )
}

export default Categorie

