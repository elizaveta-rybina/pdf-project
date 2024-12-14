import { clearFiles } from 'app/store/slices/pdfSlice'
import { RootState } from 'app/store/store'
import { saveAs } from 'file-saver'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/MergeButton.module.scss'

export const MergeButton = () => {
  const {t} = useTranslation();
  const files = useSelector((state: RootState) => state.pdf.files || []);
  const task = useSelector((state: RootState) => state.pdf.task); 
  const dispatch = useDispatch();

  const handleMerge = async (): Promise<void> => {
    if (files.length < 2) {
      alert('Загрузите хотя бы два файла для объединения.');
      return;
    }

    if (!task) {
      alert('Задача не создана.');
      return;
    }

    try {
      console.log('Задача перед процессингом:', task);

      await task.process(); // Обрабатываем задачу
      console.log('Задача успешно обработана.');

      const result = await task.download();
      console.log('Результат загрузки:', result);

      saveAs(new Blob([result]), 'merged_file.pdf');

      alert('Файл успешно объединён и скачан!');
      dispatch(clearFiles()); // Очищаем файлы и задачу
    } catch (error) {
      console.error('Ошибка при объединении файлов:', error);
      alert('Не удалось объединить файлы. Попробуйте снова.');
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
