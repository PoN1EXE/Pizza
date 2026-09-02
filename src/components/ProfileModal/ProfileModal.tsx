import type { ProfileData } from '../../pages/Profile'
import { useRef, useState, type ChangeEvent, type SubmitEvent } from 'react'
import styles from './ProfileModal.module.scss'

export interface ProfileModalProps {
  onClose: () => void
  onSave: (updatedProfile: ProfileData) => void
  userProfile: ProfileData
}

export const ProfileModal = ({ onClose, userProfile, onSave }: ProfileModalProps) => {
  const [formData, setFormData] = useState<ProfileData>(userProfile)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const saveButtonRef = useRef<HTMLButtonElement>(null)

  const handleSaveData = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

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
        <form onSubmit={handleSaveData}>
          <div className={styles.fields}>
            <input
              autoFocus
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  emailInputRef.current?.focus()
                }
              }}
              className={styles.input}
              value={formData.fullName}
              onChange={handleChange}
              placeholder='Фамилия Имя Отчество'
              aria-label='Место ввода ФИО'
              name='fullName'
            />

            <input
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  phoneInputRef.current?.focus()
                }
              }}
              ref={emailInputRef}
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              placeholder='Электронная почта'
              aria-label='Место ввода почты'
              name='email'
              type='email'
            />

            <input
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  saveButtonRef.current?.focus()
                }
              }}
              ref={phoneInputRef}
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
              ref={saveButtonRef}
              className={`${styles.button} ${styles.saveButton}`}
              type='submit'
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
        </form>
      </div>
    </div>
  )
}
