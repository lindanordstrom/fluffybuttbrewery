'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  StatusBar,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import { getLabel } from 'Labels';
import { sendMailWith, validateEmail, formatBodyWithSender } from 'MailHelper'
import { getColor, ColorKeys } from 'Colors';
import DeviceInfo from 'react-native-device-info';
import { launchMailAppWith } from 'MailHelper'
import { isIOS } from 'PlatformWrapper';
import Icon from 'react-native-vector-icons/FontAwesome'


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
    paddingBottom: 20,
    alignSelf: 'center'
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
    marginTop: 5,
    margin: 20,
    paddingLeft: 10,
    paddingRight: 10,
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
  },
});

const store = isIOS() ? getLabel('support.iosStore') : getLabel('support.androidStore')

class SupportPage extends Component {
  readItemsInBasket() {
    return getItem(AsyncStoreConstants.STORAGE_KEY.BASKET_ITEMS)
      .then(val => val || 0)
      .catch(() => 0);
  }

  rateAppClick () {
    // 1188836017 - HUEL
    // 1248258940 - FLUFFYBUTT
    const appID = isIOS() ? '1248258940' : 'com.fluffybuttbrewery'
    const link = isIOS() ? getLabel('support.iosStoreURL') : getLabel('support.androidStoreURL')
    Linking.canOpenURL(link + appID).then(supported => {
      if (supported) {
        Linking.openURL(link + appID)
      } else {
        Alert.alert(getLabel('support.errorTitle'), getLabel('support.rateErrorMessage') + store)
      }
    }, (err) => Alert.alert(getLabel('support.errorTitle'), err));
  }

  facebookClick () {
    const link = getLabel('contact.facebookURL')
    Linking.canOpenURL(link).then(supported => {
      supported && Linking.openURL(link)
    }, (err) => Alert.alert(getLabel('support.errorTitle'), err));
  }

  render() {
    return (
      <View style={styles.background}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <ScrollView style={styles.container}>
          <Image source={require('../../assets/logo.png')}
          resizeMode={Image.resizeMode.contain}
          style={styles.image}/>
          <Text style={styles.description}>Version {DeviceInfo.getReadableVersion()}</Text>
          <TouchableHighlight style={{alignSelf: 'center', paddingBottom: 20}}
            onPress={() => this.facebookClick()}
            underlayColor={BACKGROUND_COLOR}>
            <Icon
              style={{fontSize: 48, color: MAIN_COLOR}}
              name='facebook-square'
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={() => this.rateAppClick()}
            underlayColor={BACKGROUND_COLOR}>
            <Text style={styles.buttonText}>{getLabel('support.rateButtonLabel') + store}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={() => {
              const subject = getLabel('support.feedbackSubject')
              const recipient = [getLabel('support.feedbackRecipient')]
              const body = 'App Version: ' + DeviceInfo.getReadableVersion() +
                           '\n Device: ' + DeviceInfo.getModel() +
                           '\n OS: ' + DeviceInfo.getSystemName() + ' ' + DeviceInfo.getSystemVersion()

              launchMailAppWith(subject, recipient, body)
            }}
            underlayColor={BACKGROUND_COLOR}>
            <Text style={styles.buttonText}>{getLabel('support.feedbackButtonLabel')}</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

module.exports = SupportPage;
