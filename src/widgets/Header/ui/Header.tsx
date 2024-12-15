import { LanguageToggle } from 'entities/LanguageToggle'
import { LoginButton } from 'entities/LoginButton'
import { useTranslation } from 'react-i18next'

import styles from '../styles/Header.module.scss'

interface HeaderProps {}

//TODO: Вынести навигацию в отдельный компонент
export const Header = ({}: HeaderProps) => {
	const { t } = useTranslation();
	return (
		<header className={styles.header}>
			<a href='/' className={styles.logo}>
				PDF
			</a>

			<nav className={styles.nav}>
				<a href='/page1' className={styles.navItem}>
					{t('header.merge')}
				</a>
				<a href='/page3' className={styles.navItem}>
					{t('header.split')}
				</a>
				<a href='/page2' className={styles.navItem}>
					{t('header.convert')}
				</a>
				<a href='/page3' className={styles.navItem}>
					{t('header.compress')}
				</a>
			</nav>

			<div className={styles.rightControls}>
				<LanguageToggle />
				<LoginButton />
			</div>
		</header>
	)
}
