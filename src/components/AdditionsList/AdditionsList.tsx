import type { Ingredient } from '../../mocks/pizzas'
import styles from './AdditionsList.module.scss'

export interface AdditionsListProps {
  additions: Ingredient[]
  selectedAdditions: Ingredient[]
  onAdditionClick: (addition: Ingredient) => void
}

export const AdditionsList = ({ additions, selectedAdditions, onAdditionClick }: AdditionsListProps) => {
  return (
    <ul className={styles.additionsList}>
      {additions.map((addition) => {
        const isSelected = selectedAdditions.some((selectedAddition) => selectedAddition.id === addition.id)

        return (
          <li className={styles.additionItem} key={addition.id}>
            <button
              className={styles.additionButton}
              type='button'
              aria-pressed={isSelected}
              onClick={() => onAdditionClick(addition)}>
              <span className={styles.additionName}>{addition.name}</span>
              <span className={styles.additionPrice}>+{addition.price} ₽</span>
              <span className={styles.selectionIndicator} aria-hidden='true'>
                ✓
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
