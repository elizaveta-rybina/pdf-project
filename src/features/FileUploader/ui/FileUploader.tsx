import ILovePDFApi from '@ilovepdf/ilovepdf-js';
import ILovePDFTool from '@ilovepdf/ilovepdf-js-core/types/ILovePDFTool';
import ILovePDFFile from 'app/api/ILovePDFFile';
import { addFile, setTask } from 'app/store/slices/pdfSlice';
import { showToast } from 'entities/Toast';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styles from '../styles/FileUploader.module.scss';

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

  const addTaskToRedux = () => {
    dispatch(setTask(task));
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const uploaded = await uploadFiles(fileArray);

    if (uploaded.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...uploaded]);
      addTaskToRedux();
    }
  };

  const uploadFiles = async (files: File[]) => {
    await task.start();
    const uploadedFiles: string[] = [];

    for (const file of files) {
      if (file.type !== 'application/pdf') {
        showToast({
          title: t('notification.error'),
          text: t('notification.notPDF'),
          type: 'error',
        });
        continue;
      }

      try {
        const fileURL = URL.createObjectURL(file);
        const ilovePDFFile = new ILovePDFFile(file);

        await task.addFile(ilovePDFFile);

        showToast({
          title: t('notification.success'),
          text: t('notification.fileAddSuccess'),
          type: 'success',
        });

        const pdfFile = {
          name: file.name,
          file: file,
          url: fileURL,
        };

        dispatch(addFile(pdfFile));
        uploadedFiles.push(file.name);
      } catch (error) {
        console.error('Ошибка при добавлении файлов:', error);
        showToast({
          title: t('notification.error'),
          text: t('notification.fileAddError'),
          type: 'error',
        });
      }
    }

    return uploadedFiles;
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
