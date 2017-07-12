'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';
import { getColor, ColorKeys } from 'Colors';
import AsyncStoreConstants from 'AsyncStorageWrapperConstants';
import { setItem, getItem } from 'AsyncStorageWrapper';

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
  background: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
    flex: 1
  }
});

var currentBasketItems;

class BasketPage extends Component {
  constructor() {
    super()
    this.state = {
      basketItems: null
    }
    this.readItemsInBasket()
  }

  readItemsInBasket() {
    return getItem(AsyncStoreConstants.STORAGE_KEY.BASKET_ITEMS)
      .then(items => {
        this.setState({
          basketItems: items
        })
      })
  }

  render() {
    var products = ''
    if (this.state.basketItems) {
      this.state.basketItems.forEach( (item, index) => {
        products = products.concat(item.count + ' ' + item.title + '\n')
      })
    }

    return (
      <View style={styles.background}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <ScrollView style={styles.container}>
          <Text style={styles.description}>Added item: { '\n' + products}</Text>
        </ScrollView>
      </View>
    );
  }
}

module.exports = BasketPage;
