import { createTheme } from "@material-ui/core";


const breakpoints = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1200,
            xl: 1920,
        },
    }
}

const commonOverrides = {
    MuiContainer: {
        root: {

        },

        maxWidthLg: {
            maxWidth: '1176px !important', // 10, 10 padding 1156px available space..
        },
    },
    MuiPaper: {
        root: {
            transition: 'background 225ms ease-in',
        }
    }
}

export const light = createTheme({
    ...breakpoints,
    palette: {

        type: 'light',

        secondary: {
            main: '#018786',
        },
        primary: {
            main: "#BF232D"
        },
        divider: 'rgba(0,0,0,0.12)',

        text: {
            primary: 'rgba(0,0,0,0.87)',
            secondary: 'rgba(0,0,0,0.6)',
            disabled: 'rgba(0,0,0,0.38)',
            buttonFilled: '#ffffff'
        },
        background: {
            default: "#FFFFFF",
            paper: "#FFFFFF",
            surface: "#FFFFFF"
        },

        grey: {
            "100": 'rgba(33,33,33,0.08)',
            "300": "rgba(0,0,0,0.6)",
            "200": 'rgba(0,0,0,0.33)',
        },

        //custom color schemes
        container: {
            background: '#F8F9FB',
            paper: '#F8F9FB',
            footer: '#F8F9FB',
        },
        surface: {
            main: 'rgba(33,33,33,0.08)'
        },

        custom: {
            quizAnalyticBackgroundLeft: 'rgba(0,0,0,0.08)',
            quizAnalyticTextLeft: 'rgba(0,0,0,0.33)',
            backgroundPaidChapter: 'rgba(248, 249, 251, 1)'
        }

    },
    typography: {
        allVariants: {
            color: 'rgba(0,0,0,0.87)'
        }
    },
    props: {
        MuiSvgIcon: {
            color: 'rgba(0,0,0,0.6)',
            htmlColor: 'rgba(0,0,0,0.6)',
        },
        MuiButtonBase: {
            disableRipple: false,
        },

    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                transition: 'background 225ms ease-in',
                background: "#FFFFFF",
                backgroundColor: "#FFFFFF"
            }
        },
        ...commonOverrides
    }
});


export const dark = createTheme({
    ...breakpoints,
    palette: {
        type: 'dark',
        secondary: {
            main: '#03DAC5',
        },
        primary: {
            main: "#D18A8E"
        },
        divider: 'rgba(255,255,255,0.12)',
        text: {
            primary: 'rgba(255,255,255,0.87)',
            secondary: 'rgba(255,255,255,0.6)',
            disabled: 'rgba(255,255,255,0.38)',
            buttonFilled: '#000000'
        },
        background: {
            default: "#121212",
            paper: "#121212",
            surface: "linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #121212"
        },
        grey: {
            "100": 'rgba(33,33,33,0.08)',
            "300": "rgba(255,255,255,0.6)",
            "200": 'rgba(255,255,255,0.33)',
        },
        container: {
            background: '#000000',
            paper: '#121212',
            footer: "linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #121212"
        },
        surface: {
            main: 'rgba(255,255,255,0.12)'
        },
        custom: {
            quizAnalyticBackgroundLeft: 'rgba(255,255,255,0.08)',
            quizAnalyticTextLeft: 'rgba(255,255,255,33)',
            backgroundPaidChapter : 'rgba(255, 255, 255, 0.05)'
        }
    },
    typography: {
        allVariants: {
            color: 'rgba(255,255,255,0.87)'
        }
    },
    props: {
        MuiSvgIcon: {
            color: 'rgba(255,255,255,0.6)',
            htmlColor: 'rgba(255,255,255,0.6)',
        },
        MuiButtonBase: {
            disableRipple: false,
        },

    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                transition: 'background 225ms ease-in',
                background: "linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #121212",
                backgroundColor: "#121212"
            },
        },
        MuiSnackbarContent: {
            root: {
                background: "linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #121212",
                color: '#ffffff',
                backgroundColor: "#121212"
            }
        },
        ...commonOverrides
    }
});