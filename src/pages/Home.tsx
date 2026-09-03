import { useDebounce } from '../hooks/useDebounce'
import { PizzaList } from '../components/PizzaList/PizzaList'
import { FiltrationComponent } from '../components/FiltrationComponent/FiltrationComponent'
import { initialPizzaFilters, type PizzaFilters } from '../types/filters'
import { useState } from 'react'
import styles from './styles/Home.module.scss'

interface HomeProps {
  searchQuery: string
}

export const Home = ({ searchQuery }: HomeProps) => {
  const debouncedSearch = useDebounce(searchQuery, 300)
  const [filters, setFilters] = useState<PizzaFilters>(initialPizzaFilters)

  return (
    <div className={styles.page}>
      <aside className={styles.filtersColumn}>
        <FiltrationComponent filters={filters} onApply={setFilters} />
      </aside>
      <main className={styles.pizzaColumn}>
        <PizzaList searchQuery={debouncedSearch} filters={filters} />
      </main>
    </div>
  )
}
