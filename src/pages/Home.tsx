import { useDebounce } from '../hooks/useDebounce'
import { PizzaList } from '../components/PizzaList/PizzaList'
import { FiltrationComponent } from '../components/FiltrationComponent/FiltrationComponent'
import styles from './styles/home.module.scss'

interface HomeProps {
  searchQuery: string
}

export const Home = ({ searchQuery }: HomeProps) => {
  const debouncedSearch = useDebounce(searchQuery, 300)

  return (
    <div className={styles.page}>
      <aside className={styles.filtersColumn}>
        <FiltrationComponent />
      </aside>
      <main className={styles.pizzaColumn}>
        <PizzaList searchQuery={debouncedSearch} />
      </main>
    </div>
  )
}
