'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  StatusBar
} from 'react-native';
import { getLabel } from 'Labels';
import { getColor, ColorKeys } from 'Colors';

const BACKGROUND_COLOR = getColor(ColorKeys.BACKGROUND)

var firebase = require('firebase');
var config = {
  apiKey: 'AIzaSyAuZBIvBKLXea8bWX-SRiP-t5IXrDR70rg',
  authDomain: 'fluffybuttbrewery-e4de1.firebaseapp.com',
  databaseURL: 'https://fluffybuttbrewery-e4de1.firebaseio.com',
  storageBucket: 'fluffybuttbrewery-e4de1.appspot.com',
  messagingSenderId: "809970246372"
};
firebase.initializeApp(config);
var myFirebaseRef = firebase.database().ref('content');

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
    var navigator = this.props.navigator;
    setTimeout(() => {
      myFirebaseRef.on('value', snapshot => {
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
    if (response) {
      this.props.navigator.replace({
        id: getLabel('plp.id'),
        title: getLabel('plp.title'),
        listings: response
      });
    }
  }
}

module.exports = SplashPage;
