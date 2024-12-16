import { BiMerge } from "react-icons/bi"
import {
	FaCompress,
	FaHtml5,
	FaImage,
	FaRegFileImage,
	FaRegFileWord,
	FaStamp
} from 'react-icons/fa'

import { PiSplitHorizontalBold } from "react-icons/pi"


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
		icon: BiMerge,
	},
	{
		active: true,
		title: 'boardsTitle.split',
		description: 'boardsDescription.split',
		link: '/split',
		icon: PiSplitHorizontalBold,
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
		icon: FaRegFileWord,
	},
	{
		active: true,
		title: 'boardsTitle.watermark',
		description: 'boardsDescription.watermark',
		link: '/watermark',
		icon: FaStamp,
	},
	{
		active: true,
		title: 'boardsTitle.htmlToPdf',
		description: 'boardsDescription.htmlToPdf',
		link: '/htmlToPdf',
		icon: FaHtml5,
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
		link: '/pdfToImage',
		icon: FaRegFileImage,
	},
]
