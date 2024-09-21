const isTablet = window.innerWidth > 600
const upSize = isTablet ? 4 : 0

export const FONTS_SIZE = {
	fontSizeSmaller: `${12 + upSize}px`,
	fontSizeSmall: `${14 + upSize}px`,
	fontSizeMedium: `${16 + upSize}px`,
	fontSizeLarge: `${18 + upSize}px`,
	fontSizeTitle: `${24 + upSize * 2}px`,
}

export const LINE_HEIGHTS = {
	lineHeightSmaller: `${14 + upSize}px`,
	lineHeightSmall: `${16 + upSize}px`,
	lineHeightMedium: `${18 + upSize}px`,
	lineHeightLarge: `${21 + upSize}px`,
	lineHeightTitle: `${26 + upSize * 2}px`,
}
