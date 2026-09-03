import { useAppDispatch } from '../../store/hooks'
import { addPizza } from '../../store/orderSlice'
import type { Pizza } from '../../mocks/pizzas'
import { useNavigate } from 'react-router-dom'
import styles from './PizzaCard.module.scss'

export interface PizzaCardProps {
  pizza: Pizza
}

export const PizzaCard = ({ pizza }: PizzaCardProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleAddPizza = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    dispatch(
      addPizza({
        cartItemId: pizza.id,
        pizzaId: pizza.id,
        pizzaName: pizza.name,
        pizzaPrice: pizza.price,
        pizzaImage: pizza.imageUrl,
        pizzaAdditions: [],
      })
    )
  }

  return (
    <div onClick={() => navigate(`/pizza/${pizza.id}`)} className={styles.card}>
      <img className={styles.image} src={pizza.imageUrl} alt={pizza.name} />
      <div className={styles.content}>
        <h3 className={styles.name}>{pizza.name}</h3>
        <p className={styles.description}>{pizza.description}</p>
        <div className={styles.bottom}>
          <span className={styles.price}>от {pizza.price} ₽</span>
          <button className={styles.addButton} onClick={handleAddPizza}>
            + Добавить
          </button>
        </div>
      </div>
    </div>
  )
}
