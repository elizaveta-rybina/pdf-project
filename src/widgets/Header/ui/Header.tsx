import styles from '../styles/Header.module.scss'

interface ButtonProps {
	onClick: () => void
	className: string
	children: React.ReactNode
}

function Button({ onClick, className, children }: ButtonProps) {
	return (
		<button onClick={onClick} className={`${styles.button} ${className}`}>
			{children}
		</button>
	)
}

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
	const handleLanguageToggle = () => {
		console.log('Toggle language')
	}

	const handleLoginClick = () => {
		console.log('Login clicked')
	}

	return (
		<header className={styles.header}>
			<a href='/' className={styles.logo}>
				PDF
			</a>

			<nav className={styles.nav}>
				<a href='/page1' className={styles.navItem}>
					Page 1
				</a>
				<a href='/page2' className={styles.navItem}>
					Page 2
				</a>
				<a href='/page3' className={styles.navItem}>
					Page 3
				</a>
			</nav>

			<div className={styles.rightControls}>
				<Button
					className={styles.languageToggle}
					onClick={handleLanguageToggle}
				>
					RU / EN
				</Button>
				<Button className={styles.loginButton} onClick={handleLoginClick}>
					Login
				</Button>
			</div>
		</header>
	)
}
