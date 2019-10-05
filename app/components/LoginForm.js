import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import FormInput from './FormInput';
import {Icon} from 'react-native-elements';

export default class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          width: '80%',
          padding: 10,
          paddingBottom: 15,
          borderRadius: 5,
          marginBottom: 2,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}>
        <FormInput
          label={'Email'}
          placeholder={'youremail@email.com'}
          Icon={() => <Icon name="email" size={24} color="black" />}
        />
        <FormInput
          label={'Password'}
          placeholder={'*******'}
          secure
          Icon={() => <Icon name="lock" size={24} color="black" />}
        />
      </View>
    );
  }
}
