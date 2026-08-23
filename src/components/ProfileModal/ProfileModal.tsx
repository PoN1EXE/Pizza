import type { ProfileData } from '../../pages/Profile'
import { useState, type ChangeEvent } from 'react'
import styles from './ProfileModal.module.scss'

export interface ProfileModalProps {
  onClose: () => void
  onSave: (updatedProfile: ProfileData) => void
  userProfile: ProfileData
}

export const ProfileModal = ({ onClose, userProfile, onSave }: ProfileModalProps) => {
  const [formData, setFormData] = useState<ProfileData>(userProfile)

  const handleSaveData = () => {
    onSave(formData)
    onClose()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Редактирование профиля</h2>

        <div className={styles.fields}>
          <input
            className={styles.input}
            value={formData.fullName}
            onChange={handleChange}
            placeholder='Фамилия Имя Отчество'
            aria-label='Место ввода ФИО'
            name='fullName'
          />

          <input
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            placeholder='Электронная почта'
            aria-label='Место ввода почты'
            name='email'
            type='email'
          />

          <input
            className={styles.input}
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder='Номер телефона'
            aria-label='Место ввода телефона'
            name='phoneNumber'
            type='tel'
          />
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.saveButton}`}
            type='button'
            onClick={handleSaveData}
            aria-label='Сохранить изменения'>
            Сохранить
          </button>

          <button
            className={`${styles.button} ${styles.closeButton}`}
            type='button'
            onClick={onClose}
            aria-label='Закрыть окно'>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
