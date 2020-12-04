import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { sv } from 'date-fns/locale';
import { svSE } from '@material-ui/core/locale';
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
      createMuiTheme(
        {
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
              dark: '#05379c',
            },
            secondary: {
              main: '#ffcd00',
            },
          },
        },
        svSE,
      ),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider locale={sv} utils={DateFnsUtils}>
        <CssBaseline />
        {children}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default ThemeLayer;
