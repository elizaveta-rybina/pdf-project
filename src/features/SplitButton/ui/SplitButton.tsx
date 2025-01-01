import { saveAs } from 'file-saver'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { clearFiles } from 'app/store/slices/pdfSlice'
import { RootState } from 'app/store/store'
import { showToast } from 'entities/Toast'

import styles from 'shared/styles/Button.module.scss'


export const SplitButton = () => {
  const {t} = useTranslation();
  const files = useSelector((state: RootState) => state.pdf.files || []);
  const task = useSelector((state: RootState) => state.pdf.task); 
  const range = useSelector((state: RootState) => state.pdf.text); // Получаем range из redux
  const dispatch = useDispatch();

  const handleSplit = async (): Promise<void> => {
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

    if (!range) {
      showToast({
        title: t('notification.warning'),
        text: t('notification.rangeRequired'),
        type: 'warning',
      });
      return;
    }

    try {
      

      showToast({
        title: t('notification.info'),
        text: t('notification.startProcessSplit'),
        type: 'info',
      });

      await task.process({ split_mode: 'ranges', ranges: range });
      const pdfjpgTask = await task.connect('pdfjpg');
      await pdfjpgTask.process();

      const result = await task.download();
      
      showToast({
        title: t('notification.success'),
        text: t('notification.splitSuccess'),
        type: 'success',
      });

      const blob = new Blob([result], { type: 'application/pdf' });
      saveAs(blob, 'split_file.pdf');

      dispatch(clearFiles());
    } catch (error) {
      console.error('Ошибка при разделении файла:', error);
      showToast({
        title: t('notification.error'),
        text: t('notification.splitError'),
        type: 'error',
      });
    }
  };


  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleSplit}>
        {t("splitPage.splitButtonText")}
      </button>
    </div>
  );
};