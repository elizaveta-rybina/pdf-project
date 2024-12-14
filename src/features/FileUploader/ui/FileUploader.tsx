import ILovePDFApi from '@ilovepdf/ilovepdf-js'
import MergeTask from '@ilovepdf/ilovepdf-js-core/tasks/MergeTask'
import ILovePDFFile from '@ilovepdf/ilovepdf-js/ILovePDFFile'
import { addFile, setTask } from 'app/store/slices/pdfSlice'
import { ChangeEvent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import styles from '../styles/FileUploader.module.scss'

const instance = new ILovePDFApi(process.env.REACT_APP_PUBLIC_KEY!);

//TODO: Переделать под более абстрактный компонент

export const FileUploader = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const task = instance.newTask('merge') as MergeTask;

  useEffect(() => {
    const startTask = async () => {
      try {
        await task.start();
        console.log('Задача успешно создана и запущена.');
        dispatch(setTask(task));
      } catch (error) {
        console.error('Ошибка при запуске задачи:', error);
      }
    };

    startTask();
  }, [dispatch, task]);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(async (file) => {
      const fileURL = URL.createObjectURL(file);

      const ilovePDFFile = new ILovePDFFile(file);

      try {
        await task.addFile(ilovePDFFile);
        console.log(`Файл ${file.name} добавлен в задачу.`);

        const pdfFile = {
          name: file.name,
          file: file,
          url: fileURL,
        };

        dispatch(addFile(pdfFile));
      } catch (error) {
        console.error(`Ошибка при добавлении файла ${file.name}:`, error);
      }
    });
  };

  return (
    <div className={styles.container}>
      
      <input
        id="upload"
        type="file"
        accept=".pdf"
        multiple
        hidden
        onChange={handleFileUpload}
      />
      <label className={styles.button} htmlFor="upload">{t('mergePage.buttonText')}</label>
    </div>
  );
};
