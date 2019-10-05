import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import FormInput from './FormInput';
import {Icon} from 'react-native-elements';

export default class RegisterForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <FormInput
          label={'Email'}
          placeholder={'youremail@email.com'}
          Icon={() => <Icon name="email" size={24} color="black" />}
          labelStyle={styles.labelStyle}
          keyboardType={'email-address'}
        />
        <FormInput
          label={'Nickname'}
          placeholder={'nickname'}
          Icon={() => <Icon name="lock" size={24} color="black" />}
          labelStyle={styles.labelStyle}
        />
        <FormInput
          label={'Password'}
          placeholder={'youremail@email.com'}
          Icon={() => <Icon name="email" size={24} color="black" />}
          labelStyle={styles.labelStyle}
        />
        <FormInput
          label={'Password Confirmatiom'}
          placeholder={'*******'}
          secure
          Icon={() => <Icon name="lock" size={24} color="black" />}
          labelStyle={styles.labelStyle}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  labelStyle: {
    color: '#17086e',
  },
});
