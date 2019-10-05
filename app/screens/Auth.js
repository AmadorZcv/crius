import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import {Image, Icon, Button} from 'react-native-elements';

export default class Auth extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image
            source={require('../img/logo.png')}
            style={{width: 360, height: 300, alignSelf: 'flex-start'}}
          />
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',

              flexDirection: 'row',
            }}>
            <Text
              style={{
                flex: 1,
                padding: 5,
                backgroundColor: '#e91e63',
                textAlign: 'center',
                color: 'white',
              }}>
              Login
            </Text>
            <Text
              style={{
                flex: 1,
                borderTopColor: '#17086e',
                borderTopWidth: 5,
                padding: 5,
                borderTopRightRadius: 5,
                backgroundColor: '#17086e',
                color: 'white',
                textAlign: 'center',
              }}>
              Registrar
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: '80%',
              padding: 10,
              paddingBottom: 15,
              borderRadius: 5,
              marginBottom: 2,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}>
            <FormInput
              label={'Email'}
              placeholder={'youremail@email.com'}
              Icon={() => <Icon name="email" size={24} color="black" />}
            />
            <FormInput
              label={'Password'}
              placeholder={'*******'}
              secure
              Icon={() => <Icon name="lock" size={24} color="black" />}
            />
          </View>
          <Button title={'Login'} />
        </View>
      </View>
    );
  }
}
