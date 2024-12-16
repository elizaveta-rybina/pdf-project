import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CustomInput } from 'entities/CustomInput'
import { FileUploader } from 'features/FileUploader'

import { WatermarkButton } from 'features/WatermarkButton'
import styles from 'shared/styles/Pages.module.scss'


export const WatermarkPage = () => {
	const { t } = useTranslation();
	const [WatermarkTask, setWatermarkTask] = useState<new (...args: any[]) => any | null>();

	useEffect(() => {
		const loadConvertTask = async () => {
			const { default: TaskClass } = await import('@ilovepdf/ilovepdf-js-core/tasks/WatermarkTask');
			setWatermarkTask(() => TaskClass);
		};

		loadConvertTask();
	}, []);

	return (
		<div>
			<h1 className={styles.title}>{t('watermarkPage.title')}</h1>
			<p className={styles.text}>{t('watermarkPage.text')}</p>
			{WatermarkTask && (
				<FileUploader
					taskType="watermark"
					taskClass={WatermarkTask}
					acceptedFileType="application/pdf"
				/>
			)}
			<CustomInput placeholder={t('watermarkPage.placeholder')}/>
			<WatermarkButton />
		</div>
	);
};
