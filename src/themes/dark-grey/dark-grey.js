import { createMuiTheme } from '@material-ui/core/styles';

import './dark-grey.css';

export default createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#191919'
    },
    primary: {
      main: '#00aeae',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e53935',
      contrastText: '#ffffff'
    }
  },
  neutral: {
    color: '#da7720'
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        backgroundColor: '#272727',
        borderRadius: '4px',
        border: '0px solid #25373e'
      },
      elevation1: {
        boxShadow: 'none'
      },
      elevation2: {
        boxShadow: 'none'
      },
      elevation3: {
        boxShadow: 'none'
      },
      elevation4: {
        boxShadow: 'none'
      }
    },
    MuiBadge: {
      badge: {
        position: 'relative',
        marginLeft: '5px'
      }
    },
    MuiCardContent: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        backgroundColor: '#313131', // Some CSS
        borderRadius: '15px'
      }
    },
    MuiMenuItem: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        padding: '10px',
        '&:hover': {
          backgroundColor: '#212121'
        },
        '&$selected': { // Name of the rule
          color: '#ffffff',
          background: 'linear-gradient(135deg,#00aeae,#02d4d4)'
        }
      }
    },
    MuiListItemText: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#b7b7b7'
      }
    },
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        textTransform: 'none', // Some CSS
        color: '#b7b7b7', // Some CSS
        borderRadius: '50px'
      },
      containedPrimary: {
        boxShadow: 'none',
        background: 'linear-gradient(135deg,#00aeae,#02d4d4)',
        '&$disabled': {
          background: '#313131',
          color: '#b7b7b7'
        }
      },
      containedSecondary: {
        boxShadow: 'none',
        background: 'linear-gradient(135deg,#e53935,#ff4f4a)',
        '&$disabled': {
          background: '#313131',
          color: '#b7b7b7'
        }
      },
      outlinedPrimary: {
        borderWidth: '1px',
        '&:hover': {
          borderWidth: '1px'
        }
      },
      outlinedSecondary: {
        borderWidth: '1px',
        '&:hover': {
          borderWidth: '1px'
        }
      },
      contained: {
        boxShadow: 'none',
        backgroundColor: '#313131',
        color: '#b7b7b7',
        '&$disabled': {
          backgroundColor: '#313131',
          color: '#b7b7b7'
        },
        '&:hover': {
          backgroundColor: '#212121'
        }
      }
    },
    MuiToggleButtonGroup: {
      root: {
        "&$selected": {
          backgroundColor: "transparent",
          boxShadow: "none"
        }
      }
    },
    MuiToggleButton: {
      label: {
        textTransform: 'none'
      },
      root: {
        '&$selected': {
          backgroundColor: '#00aeae'
        }
      }
    },
    MuiFab: {
      root: {
        boxShadow: 'none',
        backgroundColor: '#313131',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: '#212121'
        }
      }
    },
    MUIDataTableToolbar: {
      root: {
        padding: '23px'
      },
      titleText: {
        color: '#b7b7b7'
      },
      icon: {
        color: '#b7b7b7'
      }
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: '#272727',
        borderBottom: '3px solid #00aeae'
      }
    },
    MuiTableCell: { // Name of the component ⚛️ / style sheet
      body: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        borderColor: 'transparent',
        padding: '16px'
      },
      root: {
        padding: '16px',
        borderBottom: '0px'
      }
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: '#313131'
        }
      }
    },
    MuiInputAdornment: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#212121' // Some CSS
      }
    },
    MuiTabs: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#272727', // Some CSS
        border: '0px !important',
        borderRadius: '4px'
      }
    },
    MuiTab: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        border: '0px',
        color: '#b7b7b7',
        textTransform: 'none'
      },
      textColorPrimary: {
        '&$selected': {
          color: '#b7b7b7'
        },
      }
    },
    MuiChip: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#444444' // Some CSS
      },
      colorPrimary: {
        background: 'linear-gradient(135deg,#00aeae,#02d4d4)'
      },
      colorSecondary: {
        background: 'linear-gradient(135deg,#e53935,#ff4f4a)'
      }
    },
    MuiAvatar: { // Name of the component ⚛️ / style sheet
      colorDefault: { // Name of the rule
        backgroundColor: '#212121', // Some CSS
        color: '#ffffff'
      }
    },
    MuiTypography: { // Name of the component ⚛️ / style sheet
      body1: { // Name of the rule
        color: '#b7b7b7' // Some CSS
      },
      body2: { // Name of the rule
        color: '#b7b7b7' // Some CSS
      }
    },
    MuiTooltip: { // Name of the component ⚛️ / style sheet
      tooltip: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        backgroundColor: 'rgba(0,0,0,0.0)',
        opacity: '1'
      },
      popper: {
        opacity: '1'
      }
    },
    MuiSelect: {
      root: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.875em',
        borderBottom: '0px'
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        borderRadius: '4px 4px 0px 0px',
        backgroundColor: '#313131',
        borderBottom: '3px solid #00aeae'
      }
    },
    MuiExpansionPanel: {
      root: {
        '&:before': {
          display: 'none'
        }
      }
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: '#272727',
        height: '20px'
      }
    },
    MuiDialogContent: {
      root: {
        padding: '24px'
      }
    },
  },
  typography: {
    useNextVariants: true
  }
});
