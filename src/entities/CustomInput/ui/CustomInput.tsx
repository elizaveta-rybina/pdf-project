import { addRange } from 'app/store/slices/pdfSlice'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import styles from 'shared/styles/Input.module.scss'

export const CustomInput = () => {
	const { t } = useTranslation();
  const dispatch = useDispatch();
  const [range, setRange] = useState<string>('');

	const handleRangeInput = async (event: ChangeEvent<HTMLInputElement>) => {
		const rangeInput = event.target.value;
		setRange(rangeInput);

		if (rangeInput) {
			dispatch(addRange(rangeInput));
		}
	};
	
	return (
		<div className={styles.container}>
      <input
        id="fileUrl"
        type="text"
        placeholder={t('splitPage.placeholder')}
        value={range}
        onChange={handleRangeInput}
        className={styles.input}
      />
    </div>
	)
}
