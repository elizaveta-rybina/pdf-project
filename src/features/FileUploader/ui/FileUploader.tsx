import ILovePDFApi from '@ilovepdf/ilovepdf-js'
import MergeTask from '@ilovepdf/ilovepdf-js-core/tasks/MergeTask'
import ILovePDFFile from '@ilovepdf/ilovepdf-js/ILovePDFFile'
import { addFile, setTask } from 'app/store/slices/pdfSlice'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import styles from '../styles/FileUploader.module.scss'

const instance = new ILovePDFApi(process.env.REACT_APP_PUBLIC_KEY!);

export const FileUploader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]); // Состояние для имён загруженных файлов

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

  const fileArray = Array.from(files);

  try {
    // Ждём добавления всех файлов
    const uploaded = await Promise.all(
      fileArray.map(async (file) => {
        if (file.type !== 'application/pdf') {
          console.error(`Файл ${file.name} не является PDF.`);
          return null;
        }

        const fileURL = URL.createObjectURL(file);
        const ilovePDFFile = new ILovePDFFile(file);

        await task.addFile(ilovePDFFile);
        console.log(`Файл ${file.name} добавлен в задачу.`);

        const pdfFile = {
          name: file.name,
          file: file,
          url: fileURL,
        };

        dispatch(addFile(pdfFile));
        return file.name;
      })
    );

    // Обновляем состояние для успешно добавленных файлов
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      ...uploaded.filter((name): name is string => name !== null),
    ]);
  } catch (error) {
    console.error('Ошибка при добавлении файлов:', error);
  }
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

      <p className={styles.text}>
        {uploadedFiles.length === 0
          ? t('mergePage.notLoadedText')
          : t('mergePage.loadedText')}
      </p>

      {uploadedFiles.length > 0 && (
        <ul className={styles.list}>
          {uploadedFiles.map((fileName, index) => (
            <li key={index}>{fileName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};