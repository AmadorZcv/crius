import React, {PureComponent} from 'react';
import {View, Text, Alert} from 'react-native';
import {connect} from 'react-redux';

import HomeHeader from '../components/HomeHeader';
import {setIsLogged} from '../redux/user/actions';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {signOut} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <HomeHeader onSignOut={signOut} />
      </View>
    );
  }
}
const mapStateToProps = state => ({});
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
});
export default connect(
  null,
  mapDispatchToProps,
)(Home);
