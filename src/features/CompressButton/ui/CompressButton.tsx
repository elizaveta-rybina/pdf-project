import { clearFiles } from 'app/store/slices/pdfSlice'
import { RootState } from 'app/store/store'
import { saveAs } from 'file-saver'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/CompressButton.module.scss'

export const CompressButton = () => {
  const {t} = useTranslation();
  const files = useSelector((state: RootState) => state.pdf.files || []);
  const task = useSelector((state: RootState) => state.pdf.task); 
  const dispatch = useDispatch();

  const handleCompress = async (): Promise<void> => {
    if (files.length < 1) {
      alert('Загрузите хотя бы один файл для сжатия.');
      return;
    }

    if (!task) {
      alert('Задача не создана.');
      return;
    }

    try {
      console.log(task);

      await task.process({ compression_level: 'extreme' });

      const result = await task.download();

      saveAs(new Blob([result]), 'compress_file.pdf');

      alert('Файл успешно сжат и скачан!');
      dispatch(clearFiles());
    } catch (error) {
      console.error('Ошибка при сжатии файла:', error);
      alert('Не удалось сжать файлы. Попробуйте снова.');
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
