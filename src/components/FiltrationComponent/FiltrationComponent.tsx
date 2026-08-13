import styles from './FiltrationComponent.module.scss'

export const FiltrationComponent = () => {
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
          <label className={styles.checkboxLabel}>
            <input type='checkbox' /> Сырный соус
          </label>
          <label className={styles.checkboxLabel}>
            <input type='checkbox' /> Моцарелла
          </label>
          <label className={styles.checkboxLabel}>
            <input type='checkbox' /> Чеснок
          </label>
          <label className={styles.checkboxLabel}>
            <input type='checkbox' /> Солёные огурчики
          </label>
          <label className={styles.checkboxLabel}>
            <input type='checkbox' /> Красный лук
          </label>
          <label className={styles.checkboxLabel}>
            <input type='checkbox' /> Томаты
          </label>
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

      <button className={styles.applyBtn}>Применить</button>
    </aside>
  )
}
