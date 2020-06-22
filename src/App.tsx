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

const App: React.FC = () => {
  return (
    <AuthenticatedLayer>
      <ThemeLayer>
        <BrowserRouter>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SnackbarProvider>
              <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <div style={{ flex: 1 }}>
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
