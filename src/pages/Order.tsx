import { useAppSelector } from '../store/hooks'

export const Order = () => {
  const cartItems = useAppSelector((state) => state.order.cartItems)

  if (cartItems.length === 0) {
    return <div>Корзина пуста</div>
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.pizzaPrice * item.pizzaQuantity, 0)

  return (
    <div>
      <h1>Ваш заказ</h1>

      {cartItems.map((item) => (
        <div key={item.pizzaId}>
          <h2>Название :{item.pizzaName}</h2>
          <p>Цена: {item.pizzaPrice} ₽</p>
          <p>Количество: {item.pizzaQuantity}</p>
        </div>
      ))}
      <h2>Итого: {totalPrice} ₽</h2>
    </div>
  )
}
