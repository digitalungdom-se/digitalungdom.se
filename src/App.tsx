import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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
      <div className="App" style={{ minHeight: '100vh' }}>
        <Header />
        <div style={{ textAlign: 'center' }}>
          <p>
            Edit
            <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" rel="noopener noreferrer" target="_blank">
            Learn React
          </a>
        </div>
        <footer style={{ bottom: 0, position: 'absolute' }}>hej</footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
