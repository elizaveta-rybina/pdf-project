import { FileUploader } from 'features/FileUploader'
import { MergeButton } from 'features/MergeButton'
import { useTranslation } from 'react-i18next'

export const MergePage = () => {
	const { t } = useTranslation()
	return(
		<>
			<MergeButton/>
			<FileUploader/>
		</>
	);
}
