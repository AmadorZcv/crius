import React, {PureComponent} from 'react';
import {View, Text, Alert} from 'react-native';
import {Header} from 'react-native-elements';

export default class HomeHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {onSignOut} = this.props;
    return (
      <Header
        centerComponent={{
          text: 'Crius Chat',
          style: {color: '#fff', fontSize: 30},
        }}
        rightComponent={{
          icon: 'sign-out',
          color: '#fff',
          type: 'font-awesome',
          onPress: onSignOut,
          size: 30,
        }}
      />
    );
  }
}
