import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { addUrl } from 'app/store/slices/pdfSlice'

import styles from 'shared/styles/Input.module.scss'


export const HtmlIput = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fileUrl, setFileUrl] = useState<string>('');

  const handleUrlInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setFileUrl(url);

    if (url) {
      dispatch(addUrl(url));
    }
  };

  return (
    <div className={styles.container}>
      <input
        id="fileUrl"
        type="text"
        placeholder={t('htmlToPdfPage.placeholder')}
        value={fileUrl}
        onChange={handleUrlInput}
        className={styles.input}
      />
    </div>
  );
};
