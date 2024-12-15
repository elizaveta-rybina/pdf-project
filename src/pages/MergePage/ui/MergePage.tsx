import { FileUploader } from 'features/FileUploader'
import { MergeButton } from 'features/MergeButton'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../styles/MergePage.module.scss'

export const MergePage = () => {
	const { t } = useTranslation();
	const [MergeTask, setMergeTask] = useState<new (...args: any[]) => any | null>();

	useEffect(() => {
		const loadMergeTask = async () => {
			const { default: TaskClass } = await import('@ilovepdf/ilovepdf-js-core/tasks/MergeTask');
			setMergeTask(() => TaskClass); // Устанавливаем класс задачи в состояние
		};

		loadMergeTask();
	}, []);

	return (
		<div>
			<h1 className={styles.title}>{t('mergePage.title')}</h1>
			<p className={styles.text}>{t('mergePage.text')}</p>
			{MergeTask && (
				<FileUploader
					taskType="merge"
					taskClass={MergeTask} // Передаём класс задачи
				/>
			)}
			<MergeButton />
		</div>
	);
};
