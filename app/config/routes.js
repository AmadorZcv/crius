import React from 'react';

import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from '../screens/Home';
import {Icon} from 'react-native-elements';
import {Color, TextStyle} from '../styles';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: 'Home',
          headerLeft: null,
          headerRight: null,
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
const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `book-open`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        }
        // You can return any component that you like here!
        return (
          <Icon
            name={iconName}
            size={25}
            color={tintColor}
            type={'simple-line-icon'}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: Color.white,
      inactiveTintColor: 'gray',
      activeBackgroundColor: Color.primary,
      inactiveBackgroundColor: Color.primary,
    },
  },
);

export default createAppContainer(TabNavigator);
