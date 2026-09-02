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
      const existingItem = state.cartItems.find((item) => item.pizzaId === action.payload.pizzaId)

      if (existingItem) {
        existingItem.pizzaQuantity += 1
      } else {
        state.cartItems.push({
          ...action.payload,
          pizzaQuantity: 1,
        })
      }
    },
  },
})

export const { addPizza } = orderSlice.actions

export default orderSlice.reducer
