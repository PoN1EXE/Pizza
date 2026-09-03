import { useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPizzas } from '../../mocks/pizzas'
import { PizzaCard } from '../PizzaCard/PizzaCard'
import type { PizzaFilters } from '../../types/filters'
import styles from './PizzaList.module.scss'

interface PizzaListProps {
  searchQuery: string
  sidebar?: ReactNode
  filters: PizzaFilters
}

const sortedOptions = ['popular', 'price-asc', 'price-desc', 'name-asc', 'name-desc'] as const

type SortOption = (typeof sortedOptions)[number]

const isSortOption = (value: string): value is SortOption => {
  return sortedOptions.some((option) => option === value)
}

export const PizzaList = ({ searchQuery, sidebar, filters }: PizzaListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pizzas'],
    queryFn: fetchPizzas,
  })

  const [activeCategory, setActiveCategory] = useState(`all`)
  const filteredByCategory = data?.filter((pizza) => {
    if (activeCategory === `all`) return true
    return pizza.category === activeCategory
  })

  const filteredData =
    filteredByCategory
      ?.filter((pizza) => pizza.name.toLowerCase().includes(searchQuery.toLowerCase().trim()))
      .filter((pizza) => {
        if (filters.minPrice !== null && pizza.price < filters.minPrice) {
          return false
        }

        if (filters.maxPrice !== null && pizza.price > filters.maxPrice) {
          return false
        }

        return filters.ingredients.every((selectedIngredient) =>
          pizza.ingredients.some((pizzaIngredient) => pizzaIngredient.name === selectedIngredient)
        )
      }) ?? []

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [sortOption, setSortOption] = useState<SortOption>('popular')

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (isSortOption(value)) {
      setSortOption(value)
      setCurrentPage(1)
    }
  }

  const sortedData = [...(filteredData || [])].sort((a, b) => {
    switch (sortOption) {
      case 'popular':
        return (b.rating ?? 0) - (a.rating ?? 0)
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  if (isLoading) return <div className={styles.loading}>Загрузка пицц...</div>
  if (error) return <div className={styles.error}>Ошибка: {error.message}</div>

  const totalPizzas = sortedData.length
  const totalPages = Math.ceil(totalPizzas / itemsPerPage)

  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1))

  const startIndex = (safeCurrentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPizzas = sortedData.slice(startIndex, endIndex)
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className={styles.pageLayout}>
      {sidebar && <div className={styles.sidebar}>{sidebar}</div>}
      <div className={styles.pizzaListWrapper}>
        <h2 className={styles.pageTitle}>Все пиццы</h2>

        <div className={styles.filtersTabs}>
          <button
            onClick={() => {
              setActiveCategory('all')
              setCurrentPage(1)
            }}
            className={`${styles.tab} ${activeCategory === 'all' ? styles.active : ''}`}>
            Все
          </button>
          <button
            onClick={() => {
              setActiveCategory('meat')
              setCurrentPage(1)
            }}
            className={`${styles.tab} ${activeCategory === 'meat' ? styles.active : ''}`}>
            Мясные
          </button>
          <button
            onClick={() => {
              setActiveCategory('spicy')
              setCurrentPage(1)
            }}
            className={`${styles.tab} ${activeCategory === 'spicy' ? styles.active : ''}`}>
            Острые
          </button>
          <button
            onClick={() => {
              setActiveCategory('sweet')
              setCurrentPage(1)
            }}
            className={`${styles.tab} ${activeCategory === 'sweet' ? styles.active : ''}`}>
            Сладкие
          </button>
          <button
            onClick={() => {
              setActiveCategory('vegetarian')
              setCurrentPage(1)
            }}
            className={`${styles.tab} ${activeCategory === 'vegetarian' ? styles.active : ''}`}>
            Вегетарианские
          </button>
          <div className={styles.sortContainer}>
            <h2 className={styles.sortLabel}>
              Сортировать:
              <select className={styles.sortSelect} value={sortOption} onChange={handleSortChange}>
                <option value='popular'>Сначала популярные</option>
                <option value='price-asc'>Сначала дешёвые</option>
                <option value='price-desc'>Сначала дорогие</option>
                <option value='name-asc'>По алфавиту (А–Я)</option>
                <option value='name-desc'>По алфавиту (Я–А)</option>
              </select>
            </h2>
          </div>
        </div>

        {currentPizzas.length > 0 ? (
          <ul className={styles.grid}>
            {currentPizzas?.map((pizza) => (
              <li key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </li>
            ))}
          </ul>
        ) : (
          <div> По вашему запросу ничего не найдено!</div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              type='button'
              className={`${styles.page} ${styles.arrow}`}
              onClick={() => goToPage(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}>
              {'<'}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                type='button'
                key={page}
                className={`${styles.page} ${safeCurrentPage === page ? styles.active : ''}`}
                onClick={() => goToPage(page)}>
                {page}
              </button>
            ))}
            <button
              type='button'
              className={`${styles.page} ${styles.arrow}`}
              onClick={() => goToPage(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}>
              {'>'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
