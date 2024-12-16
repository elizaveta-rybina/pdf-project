import { saveAs } from 'file-saver'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { clearFiles } from 'app/store/slices/pdfSlice'
import { RootState } from 'app/store/store'
import { showToast } from 'entities/Toast'

import styles from 'shared/styles/Button.module.scss'


export const WatermarkButton = () => {
  const {t} = useTranslation();
  const files = useSelector((state: RootState) => state.pdf.files || []);
  const task = useSelector((state: RootState) => state.pdf.task); 
  const text = useSelector((state: RootState) => state.pdf.text);
  const dispatch = useDispatch();

  const handleWatermark = async (): Promise<void> => {
    if (files.length < 1) {
      showToast({
        title: t('notification.warning'),
        text: t('notification.oneCountFiles'),
        type: 'warning',
      });
      return;
    }

    if (!task) {
      alert('Задача не создана.');
      return;
    }

    if (!text) {
      showToast({
        title: t('notification.warning'),
        text: t('notification.textRequired'),
        type: 'warning',
      });
      return;
    }

    try {

      showToast({
        title: t('notification.info'),
        text: t('notification.startProcessWatermark'),
        type: 'info',
      });

      await task.process({ mode: 'text', text: text });

      const result = await task.download();
      
      showToast({
        title: t('notification.success'),
        text: t('notification.watermarkSuccess'),
        type: 'success',
      });

      const blob = new Blob([result], { type: 'application/pdf' });
      saveAs(blob, 'watermark_file.pdf');

      dispatch(clearFiles());
    } catch (error) {
      console.error('Ошибка при добавлении маркера:', error);
      showToast({
        title: t('notification.error'),
        text: t('notification.watermarkError'),
        type: 'error',
      });
    }
  };


  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleWatermark}>
        {t("watermarkPage.watermarkButtonText")}
      </button>
    </div>
  );
};