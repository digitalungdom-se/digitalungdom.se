import AuthDialogProvider from 'features/auth/AuthDialogProvider';
import AuthenticatedLayer from 'features/auth/AuthenticatedLayer';
import { BrowserRouter } from 'react-router-dom';
import Footer from 'features/Footer';
import Header from 'features/Header';
import React from 'react';
import Router from 'router';
import { SnackbarProvider } from 'notistack';
import ThemeLayer from 'components/ThemeLayer';

const App: React.FC = () => {
  return (
    <AuthenticatedLayer>
      <ThemeLayer>
        <BrowserRouter>
          <SnackbarProvider>
            <AuthDialogProvider />
            <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Header />
              <div style={{ flex: 1 }}>
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
