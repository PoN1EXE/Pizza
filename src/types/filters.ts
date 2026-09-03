export interface PizzaFilters {
  ingredients: string[]
  minPrice: number | null
  maxPrice: number | null
}

export const initialPizzaFilters: PizzaFilters = {
  ingredients: [],
  minPrice: null,
  maxPrice: null,
}
