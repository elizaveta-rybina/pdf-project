const isTablet: boolean = window.innerWidth > 600;
const upSize: number = isTablet ? 4 : 0;


type FontSizeKeys = 'fontSizeSmaller' | 'fontSizeSmall' | 'fontSizeMedium' | 'fontSizeLarge' | 'fontSizeTitle';

export const FONTS_SIZE: Record<FontSizeKeys, string> = {
  fontSizeSmaller: `${12 + upSize}px`,
  fontSizeSmall: `${14 + upSize}px`,
  fontSizeMedium: `${16 + upSize}px`,
  fontSizeLarge: `${18 + upSize}px`,
  fontSizeTitle: `${24 + upSize * 2}px`,
};

type LineHeightKeys = 'lineHeightSmaller' | 'lineHeightSmall' | 'lineHeightMedium' | 'lineHeightLarge' | 'lineHeightTitle';

export const LINE_HEIGHTS: Record<LineHeightKeys, string> = {
  lineHeightSmaller: `${14 + upSize}px`,
  lineHeightSmall: `${16 + upSize}px`,
  lineHeightMedium: `${18 + upSize}px`,
  lineHeightLarge: `${21 + upSize}px`,
  lineHeightTitle: `${26 + upSize * 2}px`,
};

type FontFamilies = {
  regular: string;
  bold: string;
  italic: string;
};

export const FONT_FAMILIES: FontFamilies = {
  regular: "Graphik, sans-serif",
  bold: "Graphik-Bold, sans-serif",
  italic: "Graphik-Italic, sans-serif",
};


type FontWeights = {
  regular: number;
  bold: number;
  extraBold: number;
};

export const FONT_WEIGHTS: FontWeights = {
  regular: 400,
  bold: 700,
  extraBold: 900,
};

