import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { Header } from '../components/Header/Header'
import { PizzaList } from '../components/PizzaList/PizzaList'
import { FiltrationComponent } from '../components/FiltrationComponent/FiltrationComponent'
import styles from './styles/home.module.scss'

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className={styles.page}>
        <aside className={styles.filtersColumn}>
          <FiltrationComponent />
        </aside>
        <main className={styles.pizzaColumn}>
          <PizzaList searchQuery={debouncedSearch} />
        </main>
      </div>
    </>
  )
}
