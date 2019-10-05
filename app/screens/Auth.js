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
    const {imageFlex, isLogin} = this.state;
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.imageContainer, {flex: imageFlex}]}>
          <Animated.Image
            source={require('../img/logo.png')}
            style={[
              styles.imageStyle,
              {
                width: this.state.logoWidth,
                height: this.state.logoHeight,
              },
            ]}
          />
        </Animated.View>
        <View style={styles.formContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.pinkButton]}
              onPress={this.onLoginFormPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.blueButton]}
              onPress={this.onRegisterFormPress}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
          {this.renderForm()}
          <Button
            title={'Login'}
            onPress={this.onRegisterPress}
            titleStyle={[styles.loginTitle, !isLogin && styles.registerTitle]}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  imageContainer: {
    justifyContent: 'center',

    padding: 5,
  },
  imageStyle: {
    alignSelf: 'flex-start',
  },
  formContainer: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
  },
  buttonStyle: {
    flex: 1,
    padding: 5,
  },
  pinkButton: {
    backgroundColor: '#e91e63',
  },
  blueButton: {
    backgroundColor: '#17086e',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  registerTitle: {
    color: '#17086e',
  },
  loginTitle: {
    color: '#e91e63',
  },
});
