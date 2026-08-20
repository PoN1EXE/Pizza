import { useDebounce } from '../hooks/useDebounce'
import { PizzaList } from '../components/PizzaList/PizzaList'
import { FiltrationComponent } from '../components/FiltrationComponent/FiltrationComponent'
import { useState } from 'react'
import styles from './styles/home.module.scss'

interface HomeProps {
  searchQuery: string
}

export const Home = ({ searchQuery }: HomeProps) => {
  const debouncedSearch = useDebounce(searchQuery, 300)
  const [appliedIngredients, setAppliedIngredients] = useState<string[]>([])

  const handleApply = (ingredients: string[]) => {
    setAppliedIngredients(ingredients)
  }

  return (
    <div className={styles.page}>
      <aside className={styles.filtersColumn}>
        <FiltrationComponent onApply={handleApply} />
      </aside>
      <main className={styles.pizzaColumn}>
        <PizzaList searchQuery={debouncedSearch} selectedIngredients={appliedIngredients} />
      </main>
    </div>
  )
}
