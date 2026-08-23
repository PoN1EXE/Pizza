import { useState } from 'react'
import { ProfileModal } from '../components/ProfileModal/ProfileModal'
import styles from './styles/Profile.module.scss'

export interface ProfileData {
  fullName: string
  email: string
  phoneNumber: string
  profileIcon: string
}

export const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [userProfile, setUserProfile] = useState<ProfileData>({
    fullName: 'Иван Иванов',
    email: 'Ivan123@gmail.com',
    phoneNumber: '+7(999)999-99-99',
    profileIcon: '/profileIcon.svg',
  })

  return (
    <div className={styles.profile}>
      <section className={styles.profileCard}>
        <h2 className={styles.title}>Профиль</h2>

        <div className={styles.avatarWrapper}>
          <img className={styles.avatar} src={userProfile.profileIcon} alt='Иконка профиля' />
        </div>

        <div className={styles.profileInfo}>
          <span className={styles.fullName}>{userProfile.fullName}</span>
          <span className={styles.infoItem}>{userProfile.email}</span>
          <span className={styles.infoItem}>{userProfile.phoneNumber}</span>
        </div>

        <button className={styles.editButton} type='button' onClick={() => setIsEditModalOpen(true)}>
          Редактировать
        </button>
      </section>

      <section className={styles.orderHistory}>
        <h2 className={styles.title}>История заказов</h2>

        <div className={styles.emptyHistory}>
          <p className={styles.emptyText}>У вас пока нет заказов</p>
        </div>
      </section>

      {isEditModalOpen && (
        <ProfileModal userProfile={userProfile} onSave={setUserProfile} onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  )
}
