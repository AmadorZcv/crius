import React, {PureComponent} from 'react';
import {View, Text, Alert, FlatList} from 'react-native';
import {connect} from 'react-redux';

import HomeHeader from '../components/HomeHeader';
import {setIsLogged} from '../redux/user/actions';
import {listOnline, talkTo} from '../redux/chat/actions';
import ChatItem from '../components/ChatItem';
import {Divider} from 'react-native-elements';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const {listOnline} = this.props;
    listOnline();
  }
  render() {
    const {signOut, online, talkTo, nickname} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <HomeHeader onSignOut={signOut} />
        <FlatList
          data={Object.keys(online)}
          renderItem={({item}) => {
            if (online[item].id === nickname) {
              return null;
            }
            return (
              <ChatItem
                nickname={online[item].id}
                onPress={() => talkTo(online[item].id)}
              />
            );
          }}
          ItemSeparatorComponent={Divider}
          keyExtractor={(item, index) => index.toString()}
        />
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
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => dispatch(setIsLogged(false))},
      ],
      {cancelable: false},
    );
  },
  listOnline: () => {
    dispatch(listOnline());
  },
  talkTo: nickname => {
    dispatch(talkTo(nickname));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
