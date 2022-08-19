import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from 'components/app/app';
import { persistor, store } from 'store/store';
import { ReactNotifications } from 'react-notifications-component';

import 'assets/css/styles.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { Loader } from 'components/common/common';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader spinnerSize="xl" />} persistor={persistor}>
        <Router>
          <ReactNotifications />
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
