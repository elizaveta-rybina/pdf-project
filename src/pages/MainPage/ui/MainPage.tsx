import { useTranslation } from 'react-i18next'

import { BoardsList } from 'widgets/BoardsList';


export const MainPage = () => {
	const { t } = useTranslation()
	return(
		<BoardsList/>
	);
}
