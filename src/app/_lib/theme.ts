"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-sans)",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
        size: "large",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
      },
    },
  },
});
