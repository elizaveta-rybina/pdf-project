import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FileUploader } from 'features/FileUploader'
import { PdfToImageButton } from 'features/PdfToImageButton'

import styles from 'shared/styles/Pages.module.scss'


export const PdfToImagePage = () => {
	const { t } = useTranslation();
	const [PdfJpgTask, setPdfJpgTask] = useState<new (...args: any[]) => any | null>();

	useEffect(() => {
		const loadConvertTask = async () => {
			const { default: TaskClass } = await import('@ilovepdf/ilovepdf-js-core/tasks/PdfJpgTask');
			setPdfJpgTask(() => TaskClass);
		};

		loadConvertTask();
	}, []);

	return (
		<div>
			<h1 className={styles.title}>{t('imageToPDFPage.title')}</h1>
			<p className={styles.text}>{t('imageToPDFPage.text')}</p>
			{PdfJpgTask && (
				<FileUploader
					taskType="pdfjpg"
					taskClass={PdfJpgTask}
					acceptedFileType="application/pdf"
				/>
			)}
			<PdfToImageButton />
		</div>
	);
};
