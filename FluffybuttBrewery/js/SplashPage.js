'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  StatusBar,
  Alert
} from 'react-native';
import { getLabel } from 'Labels';
import { getColor, ColorKeys } from 'Colors';
import { getProducts } from 'FirebaseConnection';

const BACKGROUND_COLOR = getColor(ColorKeys.BACKGROUND)

var styles = StyleSheet.create({
  image: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
    width: null
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
});

class SplashPage extends Component {
  componentWillMount() {
    setTimeout(() => {
      getProducts().on('value', snapshot => {
        this._handleResponse(snapshot.val())
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <View style={styles.backgroundContainer}>
          <Image source={require('../assets/IMG_1671.png')}
            resizeMode={Image.resizeMode.cover}
            style={styles.image}/>
        </View>
        <View>
          <ActivityIndicator color="white" size='large'/>
        </View>
      </View>
    );
  }

  _handleResponse(response) {
    if (response && response.length > 0) {
      this.props.navigator.replace({
        id: getLabel('plp.id'),
        title: getLabel('plp.title'),
        listings: response
      });
    } else {
      this._alertAndReload();
    }
  }

  _alertAndReload() {
    Alert.alert(getLabel('launch.errorTitle'), getLabel('launch.errorMessage'),
    [
      {text: 'OK', onPress: () => this.props.navigator.replace({id: 'SplashPage'})},
    ])
  }
}

module.exports = SplashPage;
