import { useState, type ChangeEvent } from 'react'
import { pizzas } from './../../mocks/pizzas'
import styles from './FiltrationComponent.module.scss'

interface FiltrationComponentProps {
  onApply: (ingredients: string[]) => void
}

const uniqueIngredientNames = [
  ...new Set(pizzas.flatMap((pizza) => pizza.ingredients.map((ingredient) => ingredient.name))),
]

export const FiltrationComponent = ({ onApply }: FiltrationComponentProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [showAllIngredients, setShowAllIngredients] = useState(false)

  const handleApply = () => {
    onApply(selectedIngredients)
  }

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target

    setSelectedIngredients((prev) => {
      if (checked) {
        return [...prev, value]
      }

      return prev.filter((ingredient) => ingredient !== value)
    })
  }

  const visibleIngredients = showAllIngredients ? uniqueIngredientNames : uniqueIngredientNames.slice(0, 6)

  return (
    <aside className={styles.filters}>
      <h3 className={styles.title}>Фильтрация</h3>

      <div className={styles.group}>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input type='checkbox' /> Можно собирать
          </label>
          <label className={styles.checkboxLabel}>
            <input type='checkbox' /> Новинки
          </label>
        </div>
      </div>

      <div className={styles.group}>
        <h4 className={styles.groupTitle}>Цена от и до:</h4>
        <div className={styles.priceRange}>
          <input />
          <input />
        </div>
      </div>

      <div className={styles.group}>
        <h4 className={styles.groupTitle}>Ингредиенты:</h4>
        <div className={styles.checkboxGroup}>
          {visibleIngredients.map((ingredientName) => (
            <label className={styles.checkboxLabel} key={ingredientName}>
              <input
                type='checkbox'
                value={ingredientName}
                onChange={handleIngredientChange}
              />
              {ingredientName}
            </label>
          ))}
          <button type='button' onClick={() => setShowAllIngredients(!showAllIngredients)}>
            {showAllIngredients ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
      </div>

      <div className={styles.group}>
        <h4 className={styles.groupTitle}>Тип теста:</h4>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input type='radio' name='dough' defaultChecked /> Традиционное
          </label>
          <label className={styles.radioLabel}>
            <input type='radio' name='dough' /> Тонкое
          </label>
        </div>
      </div>

      <button className={styles.applyBtn} onClick={handleApply}>
        Применить
      </button>
    </aside>
  )
}
