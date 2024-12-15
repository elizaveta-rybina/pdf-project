import ILovePDFApi from '@ilovepdf/ilovepdf-js'
import ILovePDFTool from '@ilovepdf/ilovepdf-js-core/types/ILovePDFTool'
import ILovePDFFile from 'app/api/ILovePDFFile'
import { addFile, setTask } from 'app/store/slices/pdfSlice'
import { showToast } from 'entities/Toast'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import styles from '../styles/FileUploader.module.scss'

interface FileUploaderProps {
  taskType: ILovePDFTool;
  taskClass: new (...args: any[]) => any;
  acceptedFileType: string;
}

const instance = new ILovePDFApi(process.env.REACT_APP_PUBLIC_KEY!);

export const FileUploader = ({ taskType, taskClass, acceptedFileType }: FileUploaderProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const task = instance.newTask(taskType) as InstanceType<typeof taskClass>;
  console.log(task);

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
    if (!acceptedFileType.split(',').includes(file.type)) {
      showToast({
        title: t('notification.error'),
        text: t('notification.invalidFileType'),
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

      console.log('File to add to Redux:', pdfFile); // Лог для отладки

      dispatch(addFile(pdfFile));
      uploadedFiles.push(file.name);
    } catch (error) {
      console.error('Error adding files:', error);
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
        multiple
        hidden
        accept={acceptedFileType}
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
