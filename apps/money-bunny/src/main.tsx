import * as ReactDOM from 'react-dom';

import App from './app/app';
import { ApplicationStateProvider } from './app/state/application-state.context';

ReactDOM.render(
  <ApplicationStateProvider>
    <App />
  </ApplicationStateProvider>,
  document.getElementById('root')
);
