import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import {ThemeProvider, Text} from 'react-native-elements';
import {theme} from './app/config/theme';
import Router from './app/config/Router';
import AsyncStorage from '@react-native-community/async-storage';
import {setIsLogged, setNickname} from './app/redux/user/actions';
import api from './app/config/api';
import {StatusBar} from 'react-native';
import {connectToLobby} from './app/channels/lobby';
import {setupSignIn} from './app/redux/channels/actions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  _retrieveData = async () => {
    // Se tivermos a token adicionamos no header do axios
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        api.defaults.headers.common['Authorization'] = token;
        const nickname = await AsyncStorage.getItem('nickname');
        store.dispatch(setIsLogged(true));
        store.dispatch(setupSignIn(token, nickname));
        store.dispatch(setNickname(nickname));
      }
      this.setState({loading: false});
    } catch (error) {
      this.setState({loading: false});
      // Error retrieving data
    }
  };
  componentDidMount() {
    this._retrieveData();
  }
  render() {
    const {loading} = this.state;
    if (loading) {
      return <Text>Teste</Text>;
    }
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StatusBar backgroundColor="#e91e63" barStyle="light-content" />
          <Router />
        </ThemeProvider>
      </Provider>
    );
  }
}
