import React, {PureComponent} from 'react';
import {View, Text, Alert, FlatList} from 'react-native';
import {connect} from 'react-redux';

import HomeHeader from '../components/HomeHeader';
import {setIsLogged} from '../redux/user/actions';
import {listOnline} from '../redux/chat/actions';

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
    const {signOut, online} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <HomeHeader onSignOut={signOut} />
        <FlatList
          data={online}
          renderItem={({item}) => <Text style={{color: 'white'}}>{item}</Text>}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  online: state.chat.online,
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
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
