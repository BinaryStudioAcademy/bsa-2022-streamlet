import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';

import { App } from 'components/app/app';
import { store } from 'store/store';

import 'assets/css/styles.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ReactNotifications />
        <App />
      </Router>
    </Provider>
  </StrictMode>,
);
