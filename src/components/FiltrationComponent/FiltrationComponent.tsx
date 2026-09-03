import { useState, type ChangeEvent } from 'react'
import { pizzas } from './../../mocks/pizzas'
import type { PizzaFilters } from '../../types/filters'
import styles from './FiltrationComponent.module.scss'

interface FiltrationComponentProps {
  filters: PizzaFilters
  onApply: (filters: PizzaFilters) => void
}

const uniqueIngredientNames = [
  ...new Set(pizzas.flatMap((pizza) => pizza.ingredients.map((ingredient) => ingredient.name))),
]

export const FiltrationComponent = ({ onApply, filters }: FiltrationComponentProps) => {
  const [draftFilters, setDraftFilters] = useState<PizzaFilters>(filters)
  const [showAllIngredients, setShowAllIngredients] = useState(false)

  const handleApply = () => {
    if (hasInvalidPriceRange) {
      return
    }

    onApply(draftFilters)
  }

  const handleIngredientChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target

    setDraftFilters((currentFilters) => ({
      ...currentFilters,
      ingredients: checked
        ? [...currentFilters.ingredients, value]
        : currentFilters.ingredients.filter((ingredient) => ingredient !== value),
    }))
  }

  const visibleIngredients = showAllIngredients ? uniqueIngredientNames : uniqueIngredientNames.slice(0, 6)

  const hasInvalidPriceRange =
    draftFilters.minPrice !== null && draftFilters.maxPrice !== null && draftFilters.minPrice > draftFilters.maxPrice

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
          <input
            type='number'
            min='0'
            placeholder='От'
            value={draftFilters.minPrice ?? ''}
            onChange={(event) => {
              const value = event.target.value

              setDraftFilters((currentFilters) => ({
                ...currentFilters,
                minPrice: value === '' ? null : Number(value),
              }))
            }}
          />

          <input
            type='number'
            min='0'
            placeholder='До'
            value={draftFilters.maxPrice ?? ''}
            onChange={(event) => {
              const value = event.target.value

              setDraftFilters((currentFilters) => ({
                ...currentFilters,
                maxPrice: value === '' ? null : Number(value),
              }))
            }}
          />
          {hasInvalidPriceRange && <p>Минимальная цена не может быть больше максимальной</p>}
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
                checked={draftFilters.ingredients.includes(ingredientName)}
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

      <button type='button' className={styles.applyBtn} onClick={handleApply} disabled={hasInvalidPriceRange}>
        Применить
      </button>
    </aside>
  )
}
