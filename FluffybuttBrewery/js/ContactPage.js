'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
  Text,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';
import { getLabel } from 'Labels';
import { launchMailAppWith } from 'MailHelper'
import { getColor, ColorKeys } from 'Colors';

const MAIN_COLOR = getColor(ColorKeys.MAIN)
const THIRD_COLOR = getColor(ColorKeys.THIRD)
const BACKGROUND_COLOR = getColor(ColorKeys.BACKGROUND)
const BACKGROUND_COLOR_LIGHT = getColor(ColorKeys.BACKGROUND_LIGHT)

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  description: {
    fontSize: 18,
    color: MAIN_COLOR,
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 18,
    color: BACKGROUND_COLOR_LIGHT,
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: MAIN_COLOR,
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  background: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
    flex: 1
  },
  image: {
    height: 200,
    width: null
  }
});

class ContactPage extends Component {
  render() {
    const emailSubject = getLabel('contact.subject')
    const emailRecipients = [getLabel('contact.recipient')]
    return (
      <View style={styles.background}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <ScrollView style={styles.container}>
          <Image source={require('../assets/logo.png')}
          resizeMode={Image.resizeMode.contain}
          style={styles.image}/>
          <Text style={styles.description}>{getLabel('contact.details')}</Text>
          <TouchableHighlight style={styles.button}
            onPress={() => launchMailAppWith(emailSubject, emailRecipients)}
            underlayColor={BACKGROUND_COLOR}>
            <Text style={styles.buttonText}>{getLabel('contact.button')}</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

module.exports = ContactPage;
