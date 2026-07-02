import { useState } from 'react'
import Categorie from './Categorie'

const CATEGORY_ORDER = ['starter', 'main', 'dessert', 'drink']
const CATEGORY_LABELS = {
  starter: 'Entrées',
  main: 'Plats',
  dessert: 'Desserts',
  drink: 'Boissons',
}

function Menu({ items }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const groupedItems = items.reduce((categories, item) => {
    const category = item.category || 'other'

    if (!categories[category]) {
      categories[category] = []
    }

    categories[category].push(item)
    return categories
  }, {})

  const categories = Object.keys(groupedItems).sort((first, second) => {
    const firstIndex = CATEGORY_ORDER.indexOf(first)
    const secondIndex = CATEGORY_ORDER.indexOf(second)

    if (firstIndex === -1 && secondIndex === -1) {
      return first.localeCompare(second)
    }
    if (firstIndex === -1) return 1
    if (secondIndex === -1) return -1
    return firstIndex - secondIndex
  })
  const visibleCategories =
    selectedCategory === 'all' ? categories : [selectedCategory]

  return (
    <>
      <nav className="menu-filters" aria-label="Filtrer le menu par catégorie">
        <button
          type="button"
          className={selectedCategory === 'all' ? 'is-active' : ''}
          aria-pressed={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        >
          Toutes
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={selectedCategory === category ? 'is-active' : ''}
            aria-pressed={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {CATEGORY_LABELS[category] || category}
          </button>
        ))}
      </nav>

      <div className="restaurant-menu">
        {visibleCategories.map((category) => (
          <Categorie
            key={category}
            name={category}
            plats={groupedItems[category]}
          />
        ))}
      </div>
    </>
  )
}

export default Menu
