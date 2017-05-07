'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Dimensions,
  StatusBar
} from 'react-native';
import { getLabel } from 'Labels';
import { launchMailAppWith } from 'MailHelper'
import { getColor, ColorKeys } from 'Colors';

const MAIN_COLOR = getColor(ColorKeys.MAIN)
const SECONDARY_COLOR = getColor(ColorKeys.SECOND)
const THIRD_COLOR = getColor(ColorKeys.THIRD)
const BACKGROUND_COLOR = getColor(ColorKeys.BACKGROUND)
const BACKGROUND_COLOR_LIGHT = getColor(ColorKeys.BACKGROUND_LIGHT)

const SCREEN_WIDTH = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    marginTop: 64
  },
  heading: {
    backgroundColor: BACKGROUND_COLOR,
    paddingTop: 5,
    paddingBottom: 5
  },
  image: {
    height: SCREEN_WIDTH / 4 * 3,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    color: MAIN_COLOR
  },
  subtitle: {
    fontSize: 18,
    marginLeft: 20,
    marginRight: 20,
    color: SECONDARY_COLOR
  },
  description: {
    fontSize: 18,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    color: MAIN_COLOR
  },
  buttonText: {
    fontSize: 18,
    color: BACKGROUND_COLOR_LIGHT,
    textAlign: 'center'
  },
  button: {
    backgroundColor: MAIN_COLOR,
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 50,
    marginTop: 20,
    margin: 40,
    padding: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  background: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
    flex: 1
  }
});

class ProductDetailsPage extends Component {

  render() {
    let product = this.props.product;
    let title = product.title
    let emailSubject = getLabel('pdp.contact.subject') + product.id + " " + title
    let emailRecipients = [getLabel('contact.recipient')]
    let emailBody = getLabel('pdp.contact.body') + title

    return (
      <View style={styles.background}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <ScrollView style={styles.container}>
          <Image style={styles.image}
              source={{uri: product.img_url}}
              resizeMode={Image.resizeMode.contain} />
          <View style={styles.heading}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{product.type}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.subtitle, {fontWeight: 'bold'}]}>{product.price}</Text>
              <Text style={styles.subtitle}>{product.alc}</Text>
            </View>
          </View>
          <Text style={styles.description}>{product.details}</Text>
          <TouchableHighlight style={styles.button}
            onPress={() => launchMailAppWith(emailSubject, emailRecipients, emailBody)}
            underlayColor={BACKGROUND_COLOR}>
            <Text style={styles.buttonText}>{getLabel('pdp.contact.button')}</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

module.exports = ProductDetailsPage;
