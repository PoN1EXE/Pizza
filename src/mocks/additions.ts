import { pizzas, type Ingredient } from './pizzas'

export const additions: Ingredient[] = Array.from(
  new Map(pizzas.flatMap((pizza) => pizza.ingredients).map((ingredient) => [ingredient.name, ingredient])).values()
)
