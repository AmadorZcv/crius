import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
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
      <View>
        <HomeHeader onSignOut={signOut} />
      </View>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(setIsLogged(false));
  },
});
export default connect(
  null,
  mapDispatchToProps,
)(Home);
