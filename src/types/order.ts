import type { Ingredient } from '../mocks/pizzas'

export interface CartItem {
  cartItemId: string
  pizzaId: string
  pizzaName: string
  pizzaPrice: number
  pizzaImage: string
  pizzaAdditions: Ingredient[]
  pizzaQuantity: number
}

export interface Order {
  orderId: string
  ordersList: CartItem[]
  totalPrice: number
  orderDate: string
  orderStatus: OrderStatus
}

export type OrderStatus = 'created' | 'cooking' | 'delivering' | 'completed'

export interface OrderState {
  cartItems: CartItem[]
  orders: Order[]
}
