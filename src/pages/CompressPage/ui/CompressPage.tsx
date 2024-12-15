import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CompressButton } from 'features/CompressButton'
import { FileUploader } from 'features/FileUploader'

import styles from '../style/CompressPage.module.scss'


export const CompressPage = () => {
	const { t } = useTranslation();
	const [CompressTask, setCompressTask] = useState<new (...args: any[]) => any | null>();

	useEffect(() => {
		const loadCompressTask = async () => {
			const { default: TaskClass } = await import('@ilovepdf/ilovepdf-js-core/tasks/CompressTask');
			setCompressTask(() => TaskClass);
		};

		loadCompressTask();
	}, []);

	return (
		<div>
			<h1 className={styles.title}>{t('compressPage.title')}</h1>
			<p className={styles.text}>{t('compressPage.text')}</p>
			{CompressTask && (
				<FileUploader
					taskType="compress"
					taskClass={CompressTask}
					acceptedFileType="application/pdf"
				/>
			)}
			<CompressButton />
		</div>
	);
};
