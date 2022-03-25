import React from "react";
import store from "../src/store";
import theme from "../src/theme";

import { Provider, ReactReduxContext } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router/immutable';
import { Route, Switch } from 'react-router-dom';
import {HistoryRouter} from 'react-router';
import { history } from '../src/store';
import CustomThemeProvider from '../src/components/shared/customThemeProvider';

export const decorators = [
  Story => (
    <Provider store={store}>
      <CustomThemeProvider theme={theme}>
          <Story />
      </CustomThemeProvider>
    </Provider>
  )
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}