'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

var firebase = require('firebase');
var config = {
  apiKey: 'AIzaSyAuZBIvBKLXea8bWX-SRiP-t5IXrDR70rg',
  authDomain: 'fluffybuttbrewery-e4de1.firebaseapp.com',
  databaseURL: 'https://fluffybuttbrewery-e4de1.firebaseio.com',
  storageBucket: 'fluffybuttbrewery-e4de1.appspot.com',
  messagingSenderId: "809970246372"
};
firebase.initializeApp(config);
var myFirebaseRef = firebase.database().ref();

// Colortheme: E0BE92, 9F6250, A2D6E1, 7CA6B4, 568885
var styles = StyleSheet.create({
  appTitle: {
    fontSize: 32,
    color: '#A2D6E1',
    fontWeight: 'bold'
  },
  errorMessage: {
    fontSize: 18,
    color: '#9DA5B4'
  },
  container: {
    flex: 1,
    backgroundColor: '#568885',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    marginTop: 20
  }
});

class SplashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      message: ''
    };
  }
  componentWillMount() {
    var navigator = this.props.navigator;
    this.setState({ isLoading: true });
    setTimeout(() => {
      myFirebaseRef.on('value', snapshot => {
        this._handleResponse(snapshot.val())
      });
    }, 1000);
  }

  render() {
    var spinner = this.state.isLoading ? ( <ActivityIndicator style={styles.spinner} size='large'/> ) : ( <View/> );
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>FLUFFYBUTT</Text>
        <Text style={styles.appTitle}>BREWERY</Text>
        {spinner}
        <Text style={styles.errorMessage}>{this.state.message}</Text>
      </View>
    );
  }

  _handleResponse(response) {
    this.setState({ isLoading: false , message: '' });
    if (response) {
      this.props.navigator.replace({
        id: 'ProductListPage',
        title: 'Fluffbutt Brewery',
        listings: response
      });
    } else {
      this.setState({ message: 'Server not available; please try again.'});
    }
  }
}

module.exports = SplashPage;
