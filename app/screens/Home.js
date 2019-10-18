import React, { PureComponent } from 'react';
import { View, Text, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux';

import HomeHeader from '../components/HomeHeader';
import { setIsLogged } from '../redux/user/actions';
import {
  listOnline,
  talkTo as talkToRedux,
  sendMessage as sendMessageRedux,
} from '../redux/chat/actions';
import ChatItem from '../components/ChatItem';
import { Divider, Input } from 'react-native-elements';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }
  componentDidMount() {
    const { listOnline } = this.props;
    listOnline();
  }
  onChatPress = item => {
    const { talkTo, sendMessage } = this.props;
    const { message } = this.state;
    console.log('message', message);
    if (item.ready) {
      console.log('AQui???');
      sendMessage(item.id, message);
      this.setState({message:""})
    } else {
      talkTo(item.id);
    }
  };
  render() {
    const { signOut, online, talkTo, nickname } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <HomeHeader onSignOut={signOut} />
        <FlatList
          data={Object.keys(online)}
          renderItem={({ item }) => {
            if (online[item].id === nickname) {
              return null;
            }
            return (
              <ChatItem
                nickname={online[item].id}
                isChannelOpen={online[item].ready}
                onPress={() => this.onChatPress(online[item])}
              />
            );
          }}
          ItemSeparatorComponent={Divider}
          keyExtractor={(item, index) => index.toString()}
        />
        <Input value={this.state.message} onChangeText={(text) => this.setState({ message: text })} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  online: state.chat.online,
  nickname: state.user.nickname,
});
const mapDispatchToProps = dispatch => ({
  signOut: () => {
    Alert.alert(
      'Signing out',
      'Dou you really wanna sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => dispatch(setIsLogged(false)) },
      ],
      { cancelable: false },
    );
  },
  listOnline: () => {
    dispatch(listOnline());
  },
  talkTo: nickname => {
    dispatch(talkToRedux(nickname));
  },
  sendMessage: (nickname, message) => {
    dispatch(sendMessageRedux(nickname, message));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
