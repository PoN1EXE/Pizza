import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearCart, decreasePizzaQuantity, increasePizzaQuantity, removePizza } from '../store/orderSlice'

export const Order = () => {
  const cartItems = useAppSelector((state) => state.order.cartItems)
  const dispatch = useAppDispatch()

  if (cartItems.length === 0) {
    return <div>Корзина пуста</div>
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.pizzaPrice * item.pizzaQuantity, 0)

  return (
    <div>
      <h1>Ваш заказ</h1>

      {cartItems.map((item) => (
        <div key={item.pizzaId}>
          <h2>Название: {item.pizzaName}</h2>
          <p>Цена: {item.pizzaPrice} ₽</p>
          <button type='button' onClick={() => dispatch(decreasePizzaQuantity(item.pizzaId))}>
            -
          </button>
          <span>{item.pizzaQuantity}</span>
          <button type='button' onClick={() => dispatch(increasePizzaQuantity(item.pizzaId))}>
            +
          </button>

          <button type='button' onClick={() => dispatch(removePizza(item.pizzaId))}>
            Удалить
          </button>
        </div>
      ))}
      <h2>Итого: {totalPrice} ₽</h2>
      <button type='button' onClick={() => dispatch(clearCart())}>
        Очистить корзину
      </button>
    </div>
  )
}
