/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import Tabs from './app/config/routes';
import {ThemeProvider} from 'react-native-elements';
import {theme} from './app/config/theme';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Tabs />
        </ThemeProvider>
      </Provider>
    );
  }
}
