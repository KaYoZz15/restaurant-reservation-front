import Categorie from './Categorie'

const CATEGORY_ORDER = ['starter', 'main', 'dessert', 'drink']

function Menu({ items }) {
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

    if (firstIndex === -1) return 1
    if (secondIndex === -1) return -1
    return firstIndex - secondIndex
  })

  return (
    <div className="restaurant-menu">
      {categories.map((category) => (
        <Categorie
          key={category}
          name={category}
          plats={groupedItems[category]}
        />
      ))}
    </div>
  )
}

export default Menu

