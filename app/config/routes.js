import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import Home from '../screens/Home';

import {Color, TextStyle} from '../styles';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => {
        return {
          header: null,
        };
      },
    },
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerTitleStyle: {
        ...TextStyle.header,
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      headerTintColor: Color.white,
    },
  },
);

export default createAppContainer(HomeStack);
