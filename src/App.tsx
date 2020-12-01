import 'utils/tokenInterceptor';

import AuthDialogProvider from 'features/auth/AuthDialogProvider';
import AuthenticatedLayer from 'features/auth/AuthenticatedLayer';
import { BrowserRouter } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import Footer from 'features/Footer';
import Header from 'features/Header';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import Router from 'router';
import { SnackbarProvider } from 'notistack';
import ThemeLayer from 'components/ThemeLayer';
import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL || 'https://devapi.digitalungdom.se';

const App: React.FC = () => {
  return (
    <AuthenticatedLayer>
      <ThemeLayer>
        <BrowserRouter>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SnackbarProvider
              anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
              }}
            >
              <AuthDialogProvider />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Header />
                <div style={{ flex: 1, marginTop: -65, minHeight: '100vh', paddingTop: 65 }}>
                  <Router />
                </div>
                <Footer />
              </div>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </BrowserRouter>
      </ThemeLayer>
    </AuthenticatedLayer>
  );
};

export default App;
