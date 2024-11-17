import { COLORS } from 'app/consts/colors'
import { FONTS_SIZE, LINE_HEIGHTS } from 'app/consts/textStyles'

const imageUrl = "image/authBackground.jpg";

export const styles = {
	container: {
		display: 'flex',
		height: '100vh',
	},
	leftSide: {
		flex: '0.7',
		background: `url(${imageUrl}) no-repeat center center/cover`,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageTextContainer: {
		width: '500px',
	},
	imageTitle: {
		fontSize: FONTS_SIZE.fontSizeTitle,
    color: COLORS.textPrimary,
    marginBottom: '20px',
		lineHeight: LINE_HEIGHTS.lineHeightTitle,
	},
	rightSide: {
		flex: '1',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.background,
	},
	formContainer: {
		width: '50%',
		maxWidth: '400px',
	},
}
