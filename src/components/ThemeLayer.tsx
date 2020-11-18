import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface ThemeLayerProps {
  children: React.ReactNode;
  forceDarkMode?: 'light' | 'dark';
}

const ThemeLayer = ({ children, forceDarkMode }: ThemeLayerProps): JSX.Element => {
  let prefersDarkMode = forceDarkMode === 'dark';
  const mediaQuery = useMediaQuery('(prefers-color-scheme: dark)');
  if (forceDarkMode === undefined) prefersDarkMode = mediaQuery;

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
        overrides: {
          MuiButton: {
            label: {
              textTransform: 'none',
              fontWeight: 'bold',
            },
          },
          MuiLink: {
            root: {
              [prefersDarkMode ? 'color' : '']: '#fff',
            },
          },
        },
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#1e6ee8',
          },
          secondary: {
            main: '#ffcd00',
          },
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeLayer;
