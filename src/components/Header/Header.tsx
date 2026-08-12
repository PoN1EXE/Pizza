import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to='/'>
          <img className={styles.logoIcon} src='/pizzaIcon.png' alt='Логотип' />
        </Link>
        <div className={styles.logoText}>
          <h1>NEXT PIZZA</h1>
          <h2>Вкусней уже некуда</h2>
        </div>
      </div>

      <div className={styles.search}>
        <input type='text' placeholder='Поиск...' value={searchQuery} onChange={handleSearchChange} />
      </div>

      <nav className={styles.nav}>
        <Link to='/profile'>Профиль</Link>
        <Link to='/order'>Заказ</Link>
      </nav>
    </header>
  )
}
