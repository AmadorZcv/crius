import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import {Input} from 'react-native-elements';

export default class FormInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {label, placeholder, secure, Icon} = this.props;
    return (
      <Input
        placeholder={placeholder}
        label={label}
        secureTextEntry={secure}
        leftIcon={Icon}
      />
    );
  }
}
