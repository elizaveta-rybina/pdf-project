import { addText } from 'app/store/slices/pdfSlice'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import styles from 'shared/styles/Input.module.scss'

export const CustomInput = () => {
	const { t } = useTranslation();
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('');

	const handleTextInput = async (event: ChangeEvent<HTMLInputElement>) => {
		const textInput = event.target.value;
		setText(textInput);

		if (textInput) {
			dispatch(addText(textInput));
		}
	};
	
	return (
		<div className={styles.container}>
      <input
        id="fileUrl"
        type="text"
        placeholder={t('splitPage.placeholder')}
        value={text}
        onChange={handleTextInput}
        className={styles.input}
      />
    </div>
	)
}
