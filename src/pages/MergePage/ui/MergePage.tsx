import { FileUploader } from 'features/FileUploader'
import { MergeButton } from 'features/MergeButton'
import { useTranslation } from 'react-i18next'

import styles from '../styles/MergePage.module.scss'

export const MergePage = () => {
	const { t } = useTranslation()
	return(
		<>
			<h1 className={styles.title}>{t('mergePage.title')}</h1>
			<p className={styles.text}>{t('mergePage.text')}</p>
			<MergeButton/>
			<FileUploader/>
		</>
	);
}
