import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearCart, decreasePizzaQuantity, increasePizzaQuantity, removePizza } from '../store/orderSlice'
import styles from './styles/Order.module.scss'

export const Order = () => {
  const cartItems = useAppSelector((state) => state.order.cartItems)
  const dispatch = useAppDispatch()

  if (cartItems.length === 0) {
    return (
      <main className={styles.orderPage}>
        <section className={styles.emptyCart}>
          <span className={styles.emptyCartIcon} aria-hidden='true'>
            🍕
          </span>
          <h1 className={styles.emptyCartTitle}>Корзина пуста</h1>
          <p className={styles.emptyCartText}>Добавьте пиццу, и она появится здесь.</p>
        </section>
      </main>
    )
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.pizzaPrice * item.pizzaQuantity, 0)

  return (
    <main className={styles.orderPage}>
      <div className={styles.orderContainer}>
        <div className={styles.orderHeader}>
          <div>
            <p className={styles.orderEyebrow}>Корзина</p>
            <h1 className={styles.orderTitle}>Ваш заказ</h1>
          </div>
          <span className={styles.itemsCount}>Позиций: {cartItems.length}</span>
        </div>

        <div className={styles.orderContent}>
          <section className={styles.itemsList} aria-label='Товары в корзине'>
            {cartItems.map((item) => (
              <article className={styles.orderItem} key={item.cartItemId}>
                <img className={styles.pizzaImage} src={item.pizzaImage} alt={item.pizzaName} />

                <div className={styles.itemInformation}>
                  <h2 className={styles.pizzaName}>{item.pizzaName}</h2>
                  {item.pizzaAdditions.length > 0 && (
                    <p className={styles.pizzaAdditions}>
                      Добавки: {item.pizzaAdditions.map((addition) => addition.name).join(', ')}
                    </p>
                  )}
                  <p className={styles.pizzaPrice}>{item.pizzaPrice} ₽ за штуку</p>
                </div>

                <div className={styles.quantityControl} aria-label={`Количество пиццы ${item.pizzaName}`}>
                  <button
                    className={styles.quantityButton}
                    type='button'
                    aria-label={`Уменьшить количество ${item.pizzaName}`}
                    onClick={() => dispatch(decreasePizzaQuantity(item.cartItemId))}>
                    −
                  </button>
                  <span className={styles.quantity}>{item.pizzaQuantity}</span>
                  <button
                    className={styles.quantityButton}
                    type='button'
                    aria-label={`Увеличить количество ${item.pizzaName}`}
                    onClick={() => dispatch(increasePizzaQuantity(item.cartItemId))}>
                    +
                  </button>
                </div>

                <p className={styles.itemTotal}>{item.pizzaPrice * item.pizzaQuantity} ₽</p>

                <button
                  className={styles.removeButton}
                  type='button'
                  aria-label={`Удалить ${item.pizzaName} из корзины`}
                  onClick={() => dispatch(removePizza(item.cartItemId))}>
                  Удалить
                </button>
              </article>
            ))}
          </section>

          <aside className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Итого</h2>
            <div className={styles.summaryRow}>
              <span>Количество</span>
              <span>{cartItems.reduce((total, item) => total + item.pizzaQuantity, 0)} шт.</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>К оплате</span>
              <span>{totalPrice} ₽</span>
            </div>
            <button className={styles.checkoutButton} type='button'>
              Оформить заказ
            </button>
            <button className={styles.clearButton} type='button' onClick={() => dispatch(clearCart())}>
              Очистить корзину
            </button>
          </aside>
        </div>
      </div>
    </main>
  )
}
