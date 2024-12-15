import {
	FaCompress,
	FaFilePdf,
	FaImage,
	FaPowerOff,
	FaRegFileAlt,
	FaRegFileImage,
} from 'react-icons/fa'
import { FaArrowsSplitUpAndLeft } from 'react-icons/fa6'

import { IconType } from 'react-icons'

export interface BoardData {
	active: boolean
	title: string
	description: string
	link: string
	icon: IconType
}

export const boardsData: BoardData[] = [
	{
		active: true,
		title: 'boardsTitle.merge',
		description: 'boardsDescription.merge',
		link: '/merge',
		icon: FaRegFileAlt,
	},
	{
		active: false,
		title: 'boardsTitle.split',
		description: 'boardsDescription.split',
		link: '/split',
		icon: FaArrowsSplitUpAndLeft,
	},
	{
		active: true,
		title: 'boardsTitle.compress',
		description: 'boardsDescription.compress',
		link: '/compress',
		icon: FaCompress,
	},
	{
		active: true,
		title: 'boardsTitle.wordToPDF',
		description: 'boardsDescription.wordToPDF',
		link: '/officeToPdf',
		icon: FaFilePdf,
	},
	{
		active: false,
		title: 'boardsTitle.PDFToPowerPoint',
		description: 'boardsDescription.PDFToPowerPoint',
		link: '/PDFToPowerPoint',
		icon: FaPowerOff,
	},
	{
		active: true,
		title: 'boardsTitle.htmlToPdf',
		description: 'boardsDescription.htmlToPdf',
		link: '/htmlToPdf',
		icon: FaRegFileAlt,
	},
	{
		active: true,
		title: 'boardsTitle.JPGToPDF',
		description: 'boardsDescription.JPGToPDF',
		link: '/imageToPdf',
		icon: FaImage,
	},
	{
		active: true,
		title: 'boardsTitle.PDFToJPG',
		description: 'boardsDescription.PDFToJPG',
		link: '/PDFToJPG',
		icon: FaRegFileImage,
	},
]
