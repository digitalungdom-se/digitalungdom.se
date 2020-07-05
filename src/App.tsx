import AuthenticatedLayer from 'features/auth/AuthenticatedLayer';
import { BrowserRouter } from 'react-router-dom';
import Footer from 'features/Footer';
import Header from 'features/Header';
import { Provider } from 'react-redux';
import React from 'react';
import Router from 'router';
import { SnackbarProvider } from 'notistack';
import ThemeLayer from 'components/ThemeLayer';
import store from 'app/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthenticatedLayer>
        <ThemeLayer>
          <BrowserRouter>
            <SnackbarProvider>
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
    </Provider>
  );
};

export default App;
