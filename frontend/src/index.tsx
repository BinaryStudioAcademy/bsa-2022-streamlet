import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from 'components/app/app';
import { store } from 'store/store';

import 'assets/css/styles.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
);
