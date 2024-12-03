import { BoardItem } from 'entities/BoardItem'
import { useTranslation } from 'react-i18next'
import { boardsData } from '../cfg/boardsData'
import styles from '../styles/BoardsList.module.scss'

export const BoardsList = () => {
	const { t } = useTranslation()

	return (
		<div className={styles.container}>
			{boardsData.map((board, index) => (
				<div key={index}>
					<BoardItem
						icon={board.icon}
						title={t(board.title)}
						description={t(board.description)}
						active={board.active}
						navigationValue={board.link}
					/>
				</div>
			))}
		</div>
	)
}
