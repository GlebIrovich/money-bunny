import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import { ApplicationStateProvider } from './app/state/application-state.context';

ReactDOM.render(
  <StrictMode>
    <ApplicationStateProvider>
      <App />
    </ApplicationStateProvider>
  </StrictMode>,
  document.getElementById('root')
);
