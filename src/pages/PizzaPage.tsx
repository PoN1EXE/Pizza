import { useParams } from 'react-router-dom'
import { pizzas, type Ingredient } from '../mocks/pizzas'
import { additions } from '../mocks/additions'
import { useState } from 'react'
import { AdditionsList } from '../components/AdditionsList/AdditionsList'
import { useAppDispatch } from '../store/hooks'
import { addPizza } from '../store/orderSlice'
import styles from './styles/PizzaPage.module.scss'

export const PizzaPage = () => {
  const dispatch = useAppDispatch()
  const [selectedAdditions, setSelectedAdditions] = useState<Ingredient[]>([])
  const { id } = useParams()
  const pizza = pizzas.find((pizza) => String(pizza.id) === id)

  const handleAdditionClick = (addition: Ingredient) => {
    const isSelected = selectedAdditions.some((selectedAddition) => selectedAddition.id === addition.id)

    if (isSelected) {
      setSelectedAdditions((current) => current.filter((item) => item.id !== addition.id))
    } else {
      setSelectedAdditions((current) => [...current, addition])
    }
  }

  if (!pizza) {
    return (
      <main className={styles.pizzaPage}>
        <div className={styles.pizzaNotFound}>Пицца не найдена</div>
      </main>
    )
  }

  const handleAddPizza = () => {
    const additionIds = selectedAdditions.map((addition) => addition.id).sort().join('-')
    const cartItemId = additionIds ? `${pizza.id}-${additionIds}` : pizza.id

    dispatch(
      addPizza({
        cartItemId,
        pizzaId: pizza.id,
        pizzaName: pizza.name,
        pizzaPrice: totalPrice,
        pizzaImage: pizza.imageUrl,
        pizzaAdditions: selectedAdditions,
      })
    )
  }

  const additionsPrice = selectedAdditions.reduce((total, addition) => total + addition.price, 0)

  const totalPrice = pizza.price + additionsPrice

  return (
    <main className={styles.pizzaPage}>
      <div className={styles.pizzaPageContainer}>
        <section className={styles.pizzaInformation}>
          <div className={styles.pizzaImageContainer}>
            <img className={styles.pizzaImage} src={pizza.imageUrl} alt={pizza.name} />
          </div>

          <div className={styles.pizzaDetails}>
            <p className={styles.pizzaEyebrow}>Ваша пицца</p>
            <h1 className={styles.pizzaName}>{pizza.name}</h1>
            <p className={styles.pizzaDescription}>{pizza.description}</p>
            <h2 className={styles.ingredientsTitle}>Ингредиенты</h2>
            <ul className={styles.ingredientsList}>
          {pizza.ingredients.map((ingredient) => (
                <li className={styles.ingredientItem} key={ingredient.id}>
                  {ingredient.name}
                </li>
          ))}
            </ul>
            <p className={styles.basePrice}>
              Базовая цена: <strong>{pizza.price} ₽</strong>
            </p>
          </div>
        </section>

        <section className={styles.additionsSection}>
          <div className={styles.additionsHeading}>
            <div>
              <p className={styles.additionsEyebrow}>Конструктор</p>
              <h2 className={styles.additionsTitle}>Добавки</h2>
            </div>
            <span className={styles.selectedAdditionsCount}>Выбрано: {selectedAdditions.length}</span>
          </div>

          <AdditionsList
            additions={additions}
            selectedAdditions={selectedAdditions}
            onAdditionClick={handleAdditionClick}
          />
        </section>

        <div className={styles.orderSummary}>
          <div className={styles.totalPriceContainer}>
            <span className={styles.totalPriceLabel}>Итого</span>
            <strong className={styles.totalPrice}>{totalPrice} ₽</strong>
          </div>
          <button className={styles.addToCartButton} type='button' onClick={handleAddPizza}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </main>
  )
}
