import { createTheme } from "@mui/material";
export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#8e8e8e",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&:before": {
            borderBottom: `1px solid #919191`,
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: `1px solid #919191`,
          },
          "&.Mui-disabled:before": {
            borderBottom: `1px solid #919191`,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: `#919191`,
          "&:hover:not(.Mui-disabled)": {
            backgroundColor: `#919191`,
          },
          "&:before": {
            borderBottom: `1px solid #919191`,
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: `1px solid #919191`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
            borderColor: `#e0e0e0`,
          },
          "&:hover.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d1d0d0",
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d1d0d0",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "a2a2a2",
          "&$checked": {
            color: "red",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#39fde9",
          
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minWidth: "6rem !important",
          "&.MuiTablePagination-select": {
            minWidth: "1rem !important",
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: "orange",
        },
      },
    },
  },
  palette: {
    neutral: {
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
    action: {
      active: "#6B7280",
      focus: "rgba(55, 65, 81, 0.12)",
      hover: "rgba(55, 65, 81, 0.04)",
      selected: "rgba(55, 65, 81, 0.08)",
      disabledBackground: "rgba(55, 65, 81, 0.12)",
      disabled: "rgba(55, 65, 81, 0.26)",
    },
    background: {
      default: "#F9FAFC",
      paper: "#FFFFFF",
    },
    divider: "#E6E8F0",
    primary: {
      light: "#9E69FD",
      main: "#9155FD",
      dark: "#804BDF",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#ff8800",
      light: "#ff8800",
      dark: "#ff8800",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#14B8A6",
      light: "#43C6B7",
      dark: "#0E8074",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2196F3",
      light: "#64B6F7",
      dark: "#0B79D0",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#ff8400",
      light: "#FFBF4C",
      dark: "#B27B16",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#D14343",
      light: "#DA6868",
      dark: "#922E2E",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#121828",
      secondary: "#65748B",
      disabled: "rgba(55, 65, 81, 0.48)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
    "0px 1px 2px rgba(100, 116, 139, 0.12)",
    "0px 1px 4px rgba(100, 116, 139, 0.12)",
    "0px 1px 5px rgba(100, 116, 139, 0.12)",
    "0px 1px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 6px rgba(100, 116, 139, 0.12)",
    "0px 3px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
    "0px 5px 12px rgba(100, 116, 139, 0.12)",
    "0px 5px 14px rgba(100, 116, 139, 0.12)",
    "0px 5px 15px rgba(100, 116, 139, 0.12)",
    "0px 6px 15px rgba(100, 116, 139, 0.12)",
    "0px 7px 15px rgba(100, 116, 139, 0.12)",
    "0px 8px 15px rgba(100, 116, 139, 0.12)",
    "0px 9px 15px rgba(100, 116, 139, 0.12)",
    "0px 10px 15px rgba(100, 116, 139, 0.12)",
    "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
  ],
});

