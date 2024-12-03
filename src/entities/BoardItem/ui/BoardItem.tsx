import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/BoardItem.module.scss'
import { IconType } from 'react-icons'

interface BoardItemProps {
  title: string
  description: string
  active: boolean
  navigationValue: string
  icon: IconType  // Тип компонента для иконки
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
      {Icon && <div className={styles.icon}><Icon size={40}/></div>}  {/* Правильный рендер компонента иконки */}
      <h3 className={styles.boardTitle}>{title}</h3>
      <p className={styles.boardDescription}>{description}</p>
    </button>
  )
}
