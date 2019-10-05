import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import FormInput from '../components/FormInput';
import {Image, Icon, Button} from 'react-native-elements';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import api from '../config/api';
import {register} from '../config/apiLinks';

export default class Auth extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      logoWidth: new Animated.Value(325),
      logoHeight: new Animated.Value(270),
      imageFlex: new Animated.Value(4),
    };
  }
  minimizeLogo = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.logoHeight, {
          toValue: 100,
          easing: Easing.back(),
          duration: 600,
        }),
        Animated.timing(this.state.logoWidth, {
          toValue: 120,
          easing: Easing.back(),
          duration: 600,
        }),
        Animated.timing(this.state.imageFlex, {
          toValue: 1,
          easing: Easing.back(),
          duration: 600,
        }),
      ]),
    ]).start();
  };
  maximizeLogo = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.logoHeight, {
          toValue: 270,
          easing: Easing.back(),
          duration: 600,
        }),
        Animated.timing(this.state.logoWidth, {
          toValue: 325,
          easing: Easing.back(),
          duration: 600,
        }),
        Animated.timing(this.state.imageFlex, {
          toValue: 4,
          easing: Easing.linear(),
          duration: 400,
        }),
      ]),
    ]).start();
  };
  renderForm = () => {
    const {isLogin} = this.state;
    if (isLogin) {
      return <LoginForm />;
    }
    return <RegisterForm />;
  };
  onLoginFormPress = () => {
    if (!this.state.isLogin) {
      this.maximizeLogo();
    }
    this.setState({isLogin: true});
  };
  onRegisterFormPress = () => {
    this.setState({isLogin: false});
    this.minimizeLogo();
  };
  onRegisterPress = () => {
    api
      .post(register, {user: {email: ''}})
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <Animated.View
          style={{
            justifyContent: 'center',
            flex: this.state.imageFlex,
            padding: 5,
          }}>
          <Animated.Image
            source={require('../img/logo.png')}
            style={{
              width: this.state.logoWidth,
              height: this.state.logoHeight,
              alignSelf: 'flex-start',
            }}
          />
        </Animated.View>
        <View
          style={{
            flex: 4,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',

              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{flex: 1, padding: 5, backgroundColor: '#e91e63'}}
              onPress={this.onLoginFormPress}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1, padding: 5, backgroundColor: '#17086e'}}
              onPress={this.onRegisterFormPress}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
          {this.renderForm()}
          <Button title={'Login'} onPress={this.onRegisterPress} />
        </View>
      </View>
    );
  }
}
