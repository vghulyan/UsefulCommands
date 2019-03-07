import sizeUnit from '../settings/sizeUnit';
import colorPalette from './colorPalette';

const theme = {
    colors: {
        primary: colorPalette.coreRed,
        secondary: colorPalette.coreRed,
        // Component Colours
        accordionHeadingBorder: colorPalette.grey3,
        bodyAltBackground: colorPalette.grey5,
        bodyBackground: colorPalette.white,
        bodyBackgroundDesktop: colorPalette.grey9,
        bodyType: colorPalette.grey2,
        border: colorPalette.grey4,
        buttonActive: colorPalette.deepRed,
        buttonSecondaryActive: colorPalette.deepRed,
        buttonText: colorPalette.white,
        cardBackground: colorPalette.white,
        cardShadow: colorPalette.grey5,
        container: colorPalette.white,
        error: colorPalette.error,
        icon: colorPalette.coreRed,
        inactive: colorPalette.grey7,
        inputBorder: colorPalette.grey8,
        inputBorderError: colorPalette.error,
        toolTipBackground: colorPalette.grey9,
        toolTipText: colorPalette.grey2,
    },
    typography: {
        regular: '1em', // globalFontSize
        small: '0.85em', // globalSmallFontSize
        smaller: '0.7em', // globalSmallerFontSize
        fontFamily: 'UnitRoundedW01', // globalFont
        fontWeight: 100, // globalFontWeight
        lineHeight: 1.4, // globalLineHeight
        // HEADING
        headingFont: 'Giorgio Sans',
        headingDefaultCase: 'uppercase',
        headingFontWeight: 400,
        headingLineHeight: 1,
        h1fontSize: sizeUnit[10],
        h2fontSize: sizeUnit[8],
        h3fontSize: sizeUnit[5],
        h4fontSize: sizeUnit[4],
        h5fontSize: sizeUnit[3],
        h6fontSize: sizeUnit[2],
        // Page Title Component
        pageTitleCase: 'uppercase',
        pageTitleFontSize: sizeUnit[14],
        pageTitleFontWeight: 200,
        pageTitlePadding: '4.375rem 0 4.375rem 0',
        pageTitleTextAlignment: 'center',
        // Tooltip Component
        tooltipTitleFontWeight: 700,
        // Spinner Component
        progressSpinnerIcon: 'url("../images/progress-spinner/progress.gif")',
    },
};

export default theme;