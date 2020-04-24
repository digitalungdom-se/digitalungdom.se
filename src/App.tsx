import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AuthenticatedLayer from 'features/auth/AuthenticatedLayer';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from 'features/Footer';
import Header from 'features/Header';
import React from 'react';
import Router from 'router';
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
    <AuthenticatedLayer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <div style={{ flex: 1 }}>
              <Router />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthenticatedLayer>
  );
};

export default App;
