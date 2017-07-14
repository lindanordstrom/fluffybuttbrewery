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
  StatusBar,
  Modal,
  TextInput
} from 'react-native';
import { getLabel } from 'Labels';
import { sendMailWith, validateEmail } from 'MailHelper'
import { getColor, ColorKeys } from 'Colors';
import { isAndroid } from 'PlatformWrapper';
import Toast, { DURATION } from 'react-native-easy-toast'
import { getContactInformationRef } from 'FirebaseConnection';
import AsyncStoreConstants from 'AsyncStorageWrapperConstants';
import { setItem, getItem } from 'AsyncStorageWrapper';

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
    padding: 20,
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
    color: MAIN_COLOR,
    width: SCREEN_WIDTH * 0.6 - 20
  },
  subtitle: {
    fontSize: 18,
    color: SECONDARY_COLOR,
    width: SCREEN_WIDTH * 0.4 - 20
  },
  description: {
    fontSize: 18,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    color: MAIN_COLOR
  },
  stockDescription: {
    fontSize: 14,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
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
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  background: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
    flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInnerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR_LIGHT,
  },
  inputField: {
    textAlignVertical: 'top',
    alignSelf: 'stretch',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#568885',
    borderRadius: 8,
    margin: 10,
    marginTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#568885'
  },
  contactTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    color: '#568885'
  },
});

class ProductDetailsPage extends Component {
  constructor(props) {
    super()
    this.state = {
      product: props.product,
    };
  }

  saveToBasket(item, count) {
    return getItem(AsyncStoreConstants.STORAGE_KEY.BASKET_ITEMS)
      .then(items => {
        items = items || []
        var itemAlreadyExists = false
        for (var i = 0; i < items.length; i++) {
            if (items[i].title === item.title) {
                items[i].count += count
                itemAlreadyExists = true
                break
            }
        }
        if (!itemAlreadyExists) {
          item.count = count
          items.push(item)
        }
        this.refs.toast.show(getLabel('pdp.basket.added'), DURATION.LENGTH_LONG);
        return setItem(AsyncStoreConstants.STORAGE_KEY.BASKET_ITEMS, items);
      })
  }

  render() {
    const inStockLabel = this.state.product.in_stock ? getLabel('pdp.inStock.label') : getLabel('pdp.notInStock.label')
    const inStockStyleColor = this.state.product.in_stock ? 'green' : 'red'

    return (
      <View style={styles.background}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <ScrollView style={styles.container}>
          <Image style={styles.image}
              source={{uri: this.state.product.img_url}}
              resizeMode={Image.resizeMode.contain} />
          <View style={styles.heading}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>{this.state.product.title}</Text>
              <Text style={[styles.subtitle, {textAlign: 'right'}]}>{this.state.product.type}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.subtitle, {fontWeight: 'bold'}]}>{this.state.product.price}</Text>
              <Text style={[styles.subtitle, {textAlign: 'right', width: SCREEN_WIDTH * 0.6 - 20}]}>{this.state.product.alc}</Text>
            </View>
          </View>
          <Text style={[styles.stockDescription, {color: inStockStyleColor}]}>{ inStockLabel }</Text>
          <Text style={styles.description}>{this.state.product.details}</Text>
          <TouchableHighlight style={styles.button}
            onPress={() => this.saveToBasket(this.state.product, 1)}
            underlayColor={BACKGROUND_COLOR}>
            <Text style={styles.buttonText}>{getLabel('pdp.basket.button')}</Text>
          </TouchableHighlight>
        </ScrollView>
        <Toast
        ref="toast"
        position='top'
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
        />
      </View>
    );
  }
}

module.exports = ProductDetailsPage;
