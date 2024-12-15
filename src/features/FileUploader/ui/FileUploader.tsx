import ILovePDFApi from '@ilovepdf/ilovepdf-js'
import ILovePDFTool from '@ilovepdf/ilovepdf-js-core/types/ILovePDFTool'
import ILovePDFFile from 'app/api/ILovePDFFile'
import { addFile, setTask } from 'app/store/slices/pdfSlice'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import styles from '../styles/FileUploader.module.scss'

interface FileUploaderProps {
  taskType: ILovePDFTool;
  taskClass: new (...args: any[]) => any;
}

const instance = new ILovePDFApi(process.env.REACT_APP_PUBLIC_KEY!);

export const FileUploader = ({ taskType, taskClass }: FileUploaderProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const task = instance.newTask(taskType) as InstanceType<typeof taskClass>;

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (!files) return;

  const fileArray = Array.from(files);

  try {
    const uploaded = await Promise.all(
      fileArray.map(async (file) => {
        if (file.type !== 'application/pdf') {
          console.error(`Файл ${file.name} не является PDF.`);
          return null;
        }

        const fileURL = URL.createObjectURL(file);
        const ilovePDFFile = new ILovePDFFile(file);

        // Добавляем файл в задачу
        await task.addFile(ilovePDFFile);
        console.log(`Файл ${file.name} добавлен в задачу.`);

        const pdfFile = {
          name: file.name,
          file: file,
          url: fileURL,
        };

        // Добавляем файл в Redux
        dispatch(addFile(pdfFile));
        return file.name;
      })
    );

    const filteredUploaded = uploaded.filter((name): name is string => name !== null);

    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      ...filteredUploaded,
    ]);
  } catch (error) {
    console.error('Ошибка при добавлении файлов:', error);
  }
};

useEffect(() => {
    const startTask = async () => {
      try {
        await task.start();
        dispatch(setTask(task));
      } catch (error) {
        console.error('Ошибка при запуске задачи:', error);
      }
    };

    startTask();
  }, [dispatch, task]);

  console.log(task);


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
      <label className={styles.button} htmlFor="upload">
        {t('uploadButton.buttonText')}
      </label>

      <p className={styles.text}>
        {uploadedFiles.length === 0
          ? t('uploadButton.notLoadedText')
          : t('uploadButton.loadedText')}
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
