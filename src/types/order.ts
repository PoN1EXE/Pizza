export interface CartItem {
  pizzaId: string
  pizzaName: string
  pizzaPrice: number
  pizzaImage: string
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
