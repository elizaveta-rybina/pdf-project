import { useNavigate } from 'react-router-dom'

import { IconType } from 'react-icons'

import styles from '../styles/BoardItem.module.scss'


interface BoardItemProps {
  title: string
  description: string
  active: boolean
  navigationValue: string
  icon: IconType
}

export const BoardItem = ({ title, description, active, navigationValue, icon: Icon }: BoardItemProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(navigationValue)
  }

  return (
    <button
      onClick={handleClick}
      className={active ? styles.boardContainer : styles.boardContainerInactive}
    >
      {Icon && <div className={styles.icon}><Icon size={40}/></div>}
      <h3 className={styles.boardTitle}>{title}</h3>
      <p className={styles.boardDescription}>{description}</p>
    </button>
  )
}
