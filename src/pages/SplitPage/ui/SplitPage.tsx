import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FileUploader } from 'features/FileUploader'
import { CustomInput } from 'entities/CustomInput'

import { SplitButton } from 'features/SplitButton'
import styles from 'shared/styles/Pages.module.scss'


export const SplitPage = () => {
	const { t } = useTranslation();
	const [SplitTask, setSplitTask] = useState<new (...args: any[]) => any | null>();

	useEffect(() => {
		const loadConvertTask = async () => {
			const { default: TaskClass } = await import('@ilovepdf/ilovepdf-js-core/tasks/SplitTask');
			setSplitTask(() => TaskClass);
		};

		loadConvertTask();
	}, []);

	return (
		<div>
			<h1 className={styles.title}>{t('splitPage.title')}</h1>
			<p className={styles.text}>{t('splitPage.text')}</p>
			{SplitTask && (
				<FileUploader
					taskType="split"
					taskClass={SplitTask}
					acceptedFileType="application/pdf"
				/>
			)}
			<CustomInput />
			<SplitButton />
		</div>
	);
};
