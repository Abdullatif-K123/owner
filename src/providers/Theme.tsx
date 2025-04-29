import { PropsWithChildren } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import themeConstants from "../constants/themeConstants";

// cache for rtl config
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const Theme = ({ children }: PropsWithChildren) => {
  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "MontserratArabic",
      fontSize: 12,
    },
    palette: {
      primary: { main: "#4B7175" },
      secondary: { main: "#EB6440" },
      error: { main: "#d32f2f" },
      //   text: { main: "#1F2020" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "::-webkit-scrollbar": {
            width: 6,
            height: 6,
          },
          "::-webkit-scrollbar-track": {
            background: "background",
          },
          "::-webkit-scrollbar-thumb": {
            background: themeConstants.primary,
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: themeConstants.primary9,
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: themeConstants.primary,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
            "& fieldset": {
              borderColor: themeConstants.primary,
            },
            "&:hover fieldset": {
              borderColor: themeConstants.primary,
            },
            "&.Mui-focused fieldset": {
              borderColor: themeConstants.primary,
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            // backgroundColor: "red",
            border: "1px solid ",
            borderRadius: "20px !important",
            borderColor: themeConstants.primary,
            "&:before": {
              display: "none",
            },
            "&:hover fieldset": {
              borderColor: themeConstants.primary,
            },
            "&.Mui-focused fieldset": {
              borderColor: themeConstants.primary,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            borderRadius: "20px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& label": {
              color: themeConstants.primary9,
              "&.Mui-focused": {
                color: themeConstants.primary,
              },
            },
            "& .MuiOutlinedInput-root": {},
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: themeConstants.primary,
            ".MuiTableCell-root": {
              color: "white",
            },
          },
        },
      },

      MuiLink: {
        styleOverrides: {
          root: {
            color: themeConstants.primary,
            textDecorationColor: themeConstants.primary,
            "&,*": {
              transition: "0.2s",
            },
            "&:hover": {
              color: themeConstants.secondary,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default Theme;
