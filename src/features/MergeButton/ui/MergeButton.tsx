import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { clearFiles } from 'app/store/slices/pdfSlice'
import { RootState } from 'app/store/store'
import { showToast } from 'entities/Toast'
import { saveAs } from 'file-saver'

import styles from 'shared/styles/Button.module.scss'


export const MergeButton = () => {
  const {t} = useTranslation();
  const files = useSelector((state: RootState) => state.pdf.files || []);
  const task = useSelector((state: RootState) => state.pdf.task);
  const dispatch = useDispatch();

  const handleMerge = async (): Promise<void> => {
    if (files.length < 2) {
      showToast({
        title: t('notification.warning'),
        text: t('notification.twoCountFiles'),
        type: 'warning',
      });
      return;
    }

    console.log(task);

    if (!task) {
      console.error('Задача не создана.');
      return;
    }

    try {

      showToast({
        title: t('notification.info'),
        text: t('notification.startProcessMerge'),
        type: 'info',
      });
      
      await task.process();

      const result = await task.download();

      showToast({
        title: t('notification.success'),
        text: t('notification.mergeSuccess'),
        type: 'success',
      });

      saveAs(new Blob([result]), 'merged_file.pdf');

      dispatch(clearFiles());
    } catch (error) {
      console.error('Ошибка при объединении файлов:', error);
      showToast({
        title: t('notification.error'),
        text: t('notification.mergeError'),
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleMerge}>
        {t("mergePage.mergeButtonText")}
      </button>
    </div>
  );
};

