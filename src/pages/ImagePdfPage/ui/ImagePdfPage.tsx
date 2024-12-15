import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FileUploader } from 'features/FileUploader'
import { ImageToPdfButton } from 'features/ImageToPdfButton'

import styles from 'shared/styles/Pages.module.scss'


export const ImagePdfPage = () => {
	const { t } = useTranslation();
	const [ImagePdf, setImagePdfTask] = useState<new (...args: any[]) => any | null>();

	useEffect(() => {
		const loadConvertTask = async () => {
			const { default: TaskClass } = await import('@ilovepdf/ilovepdf-js-core/tasks/ImagePdfTask');
			setImagePdfTask(() => TaskClass);
		};

		loadConvertTask();
	}, []);

	return (
		<div>
			<h1 className={styles.title}>{t('imageToPDFPage.title')}</h1>
			<p className={styles.text}>{t('imageToPDFPage.text')}</p>
			{ImagePdf && (
				<FileUploader
					taskType="imagepdf"
					taskClass={ImagePdf}
					acceptedFileType="image/jpeg, image/jpg"
				/>
			)}
			<ImageToPdfButton />
		</div>
	);
};
