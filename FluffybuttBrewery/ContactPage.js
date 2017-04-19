'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
  Text
} from 'react-native';
import { getLabel } from 'Labels';
import { launchMailAppWith } from 'MailHelper'

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    color: '#568885'
  },
  description: {
    fontSize: 18,
    color: '#568885',
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 18,
    color: '#A2D6E1',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#568885',
    borderColor: '#568885',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  inputField: {
    height: 200,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    marginTop: 5,
    color: '#568885',
    borderColor: '#E6E5ED',
    backgroundColor: '#F8F8F9'
  },
  background: {
    backgroundColor: 'white',
    flex: 1
  }
});

var Mailer = require('NativeModules').RNMail;

class ContactPage extends Component {
  render() {
    const emailSubject = getLabel('contact.subject')
    const emailRecipients = [getLabel('contact.recipient')]
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.description}>{getLabel('contact.details')}</Text>
          <TouchableHighlight style={styles.button}
            onPress={() => launchMailAppWith(emailSubject, emailRecipients)}
            underlayColor='#79B5B3'>
            <Text style={styles.buttonText}>{getLabel('contact.button')}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = ContactPage;
