import { clearFiles } from 'app/store/slices/pdfSlice'
import { RootState } from 'app/store/store'
import { showToast } from 'entities/Toast'
import { saveAs } from 'file-saver'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styles from 'shared/styles/Button.module.scss'


export const OfficeToPdfButton = () => {
  const {t} = useTranslation();
  const files = useSelector((state: RootState) => state.pdf.files || []);
	console.log(files);
  const task = useSelector((state: RootState) => state.pdf.task);
  const dispatch = useDispatch();

  const handleConvert = async (): Promise<void> => {
		console.log(task);
    if (files.length < 1) {
      showToast({
        title: t('notification.warning'),
        text: t('notification.oneCountFiles'),
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
        text: t('notification.startProcessConvert'),
        type: 'info',
      });
      
      await task.process();

      const result = await task.download();

      showToast({
        title: t('notification.success'),
        text: t('notification.convertSuccess'),
        type: 'success',
      });

      saveAs(new Blob([result]), 'convert_file.pdf');

      dispatch(clearFiles());
    } catch (error) {
      console.error('Ошибка при объединении файлов:', error);
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
        {t("officeToPdfPage.officeToPdfButtonText")}
      </button>
    </div>
  );
};

