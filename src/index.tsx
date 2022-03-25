import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './globalStyles';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import store from './store';
import { Provider, ReactReduxContext } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router/immutable';
import { Route, Switch } from 'react-router-dom';
import { history } from './store';
import CustomThemeProvider from './components/shared/customThemeProvider';
import { Routes } from './routes';

ReactDOM.render(
  <React.StrictMode>  
    <Provider store={store}>
      <ConnectedRouter history={history} context={ReactReduxContext} noInitialPop>
        <CustomThemeProvider>
          <Switch>
            <Route path={Routes.HOME}>
              <App />
            </Route>
            <Route>
              <div>Page not found</div>
            </Route>
          </Switch>
      </CustomThemeProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
