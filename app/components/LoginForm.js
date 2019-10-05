import React, {PureComponent} from 'react';
import {View} from 'react-native';
import FormInput from './FormInput';
import {Icon} from 'react-native-elements';

export default class LoginForm extends PureComponent {
  render() {
    const {
      onChangeEmail,
      onChangePassword,
      passwordError,
      emailError,
    } = this.props;
    return (
      <View style={styles.containerStyle}>
        <FormInput
          label={'Email'}
          placeholder={'youremail@email.com'}
          Icon={() => <Icon name="email" size={24} color="black" />}
          onChangeText={text => onChangeEmail(text)}
          keyboardType={'email-address'}
          errorMessage={emailError}
        />
        <FormInput
          label={'Password'}
          placeholder={'*******'}
          secure
          Icon={() => <Icon name="lock" size={24} color="black" />}
          onChangeText={text => onChangePassword(text)}
          errorMessage={passwordError}
        />
      </View>
    );
  }
}
const styles = {
  containerStyle: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 5,
    marginBottom: 2,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
};
