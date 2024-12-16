import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import styles from '../styles/LoginButton.module.scss'


export const LoginButton = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

	return (
		<button onClick={handleClick} className={styles.button}>
			<div>
				{t('header.login')}
			</div>
		</button>
	)
}
