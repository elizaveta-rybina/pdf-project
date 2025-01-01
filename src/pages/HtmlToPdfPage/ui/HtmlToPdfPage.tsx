import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { HtmlIput } from 'features/HtmlIput'

import { HtmlToPdfButton } from 'features/HtmlToPdfButton'
import styles from 'shared/styles/Pages.module.scss'


export const HtmlToPdfPage = () => {
	const { t } = useTranslation();
	const [HtmlPdfTask, setHtmlPdfTask] = useState<new (...args: any[]) => any | null>();

	useEffect(() => {
		const loadConvertTask = async () => {
			const { default: TaskClass } = await import('@ilovepdf/ilovepdf-js-core/tasks/HtmlPdfTask');
			setHtmlPdfTask(() => TaskClass);
		};

		loadConvertTask();
	}, []);

	return (
		<div>
			<h1 className={styles.title}>{t('htmlToPdfPage.title')}</h1>
			<p className={styles.text}>{t('htmlToPdfPage.text')}</p>
			<HtmlIput />
			{HtmlPdfTask && (
				<HtmlToPdfButton taskType="htmlpdf"
					taskClass={HtmlPdfTask}/>
			)}
		</div>
	);
};
