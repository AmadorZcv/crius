import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import HomeStack from './routes';
import Auth from '../screens/Auth';
class Router extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {isLogged} = this.props;
    return isLogged ? <HomeStack /> : <Auth />;
  }
}
const mapStateToProps = state => ({isLogged: state.user.isLogged});

export default connect(mapStateToProps)(Router);
