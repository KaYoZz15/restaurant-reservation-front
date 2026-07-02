import Plat from './Plat'

const CATEGORY_LABELS = {
  starter: 'Entrées',
  main: 'Plats',
  dessert: 'Desserts',
  drink: 'Boissons',
}

const CATEGORY_DETAILS = {
  starter: {
    label: 'À découvrir',
    description: 'Des entrées fraîches et savoureuses pour bien commencer.',
  },
  main: {
    label: 'Nos plats',
    description: 'Des plats faits maison, préparés avec des produits de saison.',
  },
  dessert: {
    label: 'Douceur sucrée',
    description: 'Des desserts gourmands pour finir sur une note sucrée.',
  },
  drink: {
    label: 'À votre santé',
    description: 'Une sélection de boissons pour accompagner votre repas.',
  },
}

function Categorie({ name, plats }) {
  const details = CATEGORY_DETAILS[name] || {
    label: 'À découvrir',
    description: 'Une sélection préparée avec soin par notre équipe.',
  }

  return (
    <section className="menu-category">
      <div className="menu-category__heading">
        <p className="eyebrow">{details.label}</p>
        <h2>{CATEGORY_LABELS[name] || name}</h2>
        <span className="menu-category__line" aria-hidden="true" />
        <p>{details.description}</p>
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
