import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { saveAs } from 'file-saver';

import { clearFiles } from 'app/store/slices/pdfSlice';
import { RootState } from 'app/store/store';
import { showToast } from 'entities/Toast';

import styles from 'shared/styles/Button.module.scss';


export const CompressButton = () => {
  const {t} = useTranslation();
  const files = useSelector((state: RootState) => state.pdf.files || []);
  const task = useSelector((state: RootState) => state.pdf.task); 
  const dispatch = useDispatch();

  const handleCompress = async (): Promise<void> => {
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

    try {

      showToast({
        title: t('notification.info'),
        text: t('notification.startProcessCompress'),
        type: 'info',
      });

      await task.process({ compression_level: 'extreme' });

      const result = await task.download();
      
      showToast({
        title: t('notification.success'),
        text: t('notification.compressSuccess'),
        type: 'success',
      });

      saveAs(new Blob([result]), 'compress_file.pdf');

      dispatch(clearFiles());
    } catch (error) {
      console.error('Ошибка при сжатии файла:', error);
      showToast({
        title: t('notification.error'),
        text: t('notification.compressError'),
        type: 'error',
      });
    }
  };


  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleCompress}>
        {t("compressPage.compressButtonText")}
      </button>
    </div>
  );
};
