import { FileUploader } from 'features/FileUploader'
import { OfficeToPdfButton } from 'features/OfficeToPdfButton'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from 'shared/styles/Pages.module.scss'


export const OfficeToPdfPage = () => {
	const { t } = useTranslation();
	const [OfficeToPdf, setOfficeToPdfTask] = useState<new (...args: any[]) => any | null>();

	useEffect(() => {
		const loadMergeTask = async () => {
			const { default: TaskClass } = await import('@ilovepdf/ilovepdf-js-core/tasks/OfficePdfTask');
			setOfficeToPdfTask(() => TaskClass); // Устанавливаем класс задачи в состояние
		};

		loadMergeTask();
	}, []);

	return (
		<div>
			<h1 className={styles.title}>{t('officeToPdfPage.title')}</h1>
			<p className={styles.text}>{t('officeToPdfPage.text')}</p>
			{OfficeToPdf && (
				<FileUploader
					taskType="officepdf"
					taskClass={OfficeToPdf} // Передаём класс задачи
					acceptedFileType="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
				/>
			)}
			<OfficeToPdfButton />
		</div>
	);
};
