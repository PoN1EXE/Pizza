import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPizzas } from '../../mocks/pizzas'
import { PizzaCard } from '../PizzaCard/PizzaCard'
import styles from './PizzaList.module.scss'

interface PizzaListProps {
  searchQuery: string
}

export const PizzaList = ({ searchQuery }: PizzaListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pizzas'],
    queryFn: fetchPizzas,
  })

  const filteredData =
    data?.filter((pizza) => pizza.name?.toLowerCase().includes(searchQuery.toLowerCase().trim())) ?? []

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  if (isLoading) return <div className={styles.loading}>Загрузка пицц...</div>
  if (error) return <div className={styles.error}>Ошибка: {error.message}</div>

  const totalPizzas = filteredData.length
  const totalPages = Math.ceil(totalPizzas / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPizzas = filteredData.slice(startIndex, endIndex)
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className={styles.pizzaList}>
      <h2 className={styles.pageTitle}>Все пиццы</h2>
      <div className={styles.filtersTabs}>
        <button className={`${styles.tab} ${styles.active}`}>Все</button>
        <button className={styles.tab}>Мясные</button>
        <button className={styles.tab}>Острые</button>
        <button className={styles.tab}>Сладкие</button>
        <button className={styles.tab}>Вегетарианские</button>
      </div>

      <ul className={styles.grid}>
        {currentPizzas?.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </ul>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type='button'
            className={`${styles.page} ${styles.arrow}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}>
            {'<'}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              type='button'
              key={page}
              className={`${styles.page} ${currentPage === page ? styles.active : ''}`}
              onClick={() => goToPage(page)}>
              {page}
            </button>
          ))}
          <button
            type='button'
            className={`${styles.page} ${styles.arrow}`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}>
            {'>'}
          </button>
        </div>
      )}
    </div>
  )
}
