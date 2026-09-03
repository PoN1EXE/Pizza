import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, OrderState } from '../types/order'

type NewCartItem = Omit<CartItem, 'pizzaQuantity'>

const initialState: OrderState = {
  cartItems: [],
  orders: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<NewCartItem>) {
      const existingItem = state.cartItems.find((item) => item.cartItemId === action.payload.cartItemId)

      if (existingItem) {
        existingItem.pizzaQuantity += 1
      } else {
        state.cartItems.push({
          ...action.payload,
          pizzaQuantity: 1,
        })
      }
    },
    increasePizzaQuantity(state, action: PayloadAction<string>) {
      const existingItem = state.cartItems.find((item) => item.cartItemId === action.payload)

      if (existingItem) {
        existingItem.pizzaQuantity += 1
      }
    },
    decreasePizzaQuantity(state, action: PayloadAction<string>) {
      const existingItem = state.cartItems.find((item) => item.cartItemId === action.payload)

      if (existingItem) {
        if (existingItem.pizzaQuantity > 1) {
          existingItem.pizzaQuantity -= 1
        } else {
          state.cartItems = state.cartItems.filter((item) => item.cartItemId !== action.payload)
        }
      }
    },
    removePizza(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter((item) => item.cartItemId !== action.payload)
    },
    clearCart(state) {
      state.cartItems = []
    },
  },
})

export const { addPizza, increasePizzaQuantity, decreasePizzaQuantity, removePizza, clearCart } = orderSlice.actions

export default orderSlice.reducer
