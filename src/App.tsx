import 'utils/tokenInterceptor';

import AuthDialogProvider from 'features/auth/AuthDialogProvider';
import AuthenticatedLayer from 'features/auth/AuthenticatedLayer';
import Banner from 'components/Banner';
import { BrowserRouter } from 'react-router-dom';
import Footer from 'features/Footer';
import Header from 'features/Header';
import React from 'react';
import Router from 'router';
import { SnackbarProvider } from 'notistack';
import ThemeLayer from 'components/ThemeLayer';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://devapi.digitalungdom.se';

const App: React.FC = () => {
  return (
    <AuthenticatedLayer>
      <ThemeLayer>
        <BrowserRouter>
          <SnackbarProvider
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'bottom',
            }}
          >
            <AuthDialogProvider />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Header />
              <Banner>
                <span aria-label="celebrate" role="img">
                  🎉
                </span>{' '}
                Digital Ungdom fyller 2 år!{' '}
                <span aria-label="celebrate" role="img">
                  🎉
                </span>
              </Banner>
              <div style={{ flex: 1, minHeight: '100vh' }}>
                <Router />
              </div>
              <Footer />
            </div>
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeLayer>
    </AuthenticatedLayer>
  );
};

export default App;
