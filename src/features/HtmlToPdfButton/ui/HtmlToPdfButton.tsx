import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import ILovePDFApi from '@ilovepdf/ilovepdf-js'
import ILovePDFTool from '@ilovepdf/ilovepdf-js-core/types/ILovePDFTool'

import { clearFiles } from 'app/store/slices/pdfSlice'
import { RootState } from 'app/store/store'
import { showToast } from 'entities/Toast'
import { saveAs } from 'file-saver'

import styles from 'shared/styles/Button.module.scss'

interface HtmlToPdfButtonProps {
  taskType: ILovePDFTool;
  taskClass: new (...args: any[]) => any;
}


const instance = new ILovePDFApi(process.env.REACT_APP_PUBLIC_KEY!);

export const HtmlToPdfButton = ({ taskType, taskClass }: HtmlToPdfButtonProps) => {
  
  const { t } = useTranslation();
  const url = useSelector((state: RootState) => state.pdf.url);
  
  const task = instance.newTask(taskType) as InstanceType<typeof taskClass>;

  const dispatch = useDispatch();

  const handleConvert = async (): Promise<void> => {
    if (!url) {
      showToast({
        title: t('notification.warning'),
        text: t('notification.oneCountFiles'),
        type: 'warning',
      });
      return;
    }

    await task.start();

    console.log(task);

    if (!task) {
      console.error('Задача не создана.');
      return;
    }

    try {
      showToast({
        title: t('notification.info'),
        text: t('notification.startProcessConvert'),
        type: 'info',
      });

      await task.addFile(url);

      await task.process({ single_page: true });

      const result = await task.download();

      showToast({
        title: t('notification.success'),
        text: t('notification.convertSuccess'),
        type: 'success',
      });

      saveAs(new Blob([result]), 'convert_file.pdf');

      dispatch(clearFiles());
    } catch (error) {
      console.error('Ошибка при конвертации файлов:', error);
      showToast({
        title: t('notification.error'),
        text: t('notification.convertError'),
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleConvert}>
        {t("htmlToPdfPage.htmlToPdfPageButtonText")}
      </button>
    </div>
  );
};
