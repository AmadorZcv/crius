import React, {PureComponent} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-elements';

export default class ChatItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {nickname, isChannelOpen, hasNewMessages, onPress} = this.props;
    const email = isChannelOpen ? 'email-open-outline' : 'email-outline';
    const message = hasNewMessages ? 'message-alert' : 'message-outline';
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 5,
          alignItems: 'center',
          flex: 1,
        }}
        onPress={onPress}>
        <Icon name={email} type="material-community" color="#e91e63" />
        <Text style={{color: 'white', flex: 1, paddingLeft: 10}} h1>
          {nickname}
        </Text>
        <Icon name={message} type="material-community" color="#e91e63" />
      </TouchableOpacity>
    );
  }
}
