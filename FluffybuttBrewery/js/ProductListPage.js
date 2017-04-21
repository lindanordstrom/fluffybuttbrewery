'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  StatusBar
} from 'react-native';
import { getLabel } from 'Labels';
import { getColor, ColorKeys } from 'Colors';

const MAIN_COLOR = getColor(ColorKeys.MAIN)
const SECONDARY_COLOR = getColor(ColorKeys.SECOND)
const THIRD_COLOR = getColor(ColorKeys.THIRD)
const BACKGROUND_COLOR = getColor(ColorKeys.BACKGROUND)
const BACKGROUND_COLOR_LIGHT = getColor(ColorKeys.BACKGROUND_LIGHT)

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
    backgroundColor: 'white'
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: MAIN_COLOR
  },
  subtitle: {
    fontSize: 16,
    color: SECONDARY_COLOR
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  image: {
    opacity: 0.1,
    flex: 1,
    width: null
  },
  container: {
    marginTop: 65
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    flex: 1
  }
});

class ProductListPage extends Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <View style={styles.backgroundContainer}>
          <Image source={require('../assets/IMG_1671.png')}
            resizeMode={Image.resizeMode.cover}
            style={styles.image}/>
        </View>
        <View style={styles.container}>
          <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
        </View>
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    rowData.price = rowData.price ? rowData.price + getLabel('plp.currencyLabel') : getLabel('plp.priceMissing')
    rowData.alc = rowData.alc ? getLabel('plp.alcoholPercentageLabel') + rowData.alc + getLabel('plp.percentageLabel') : getLabel('plp.alcoholPercentageMissing')
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.title)}
      underlayColor={BACKGROUND_COLOR}>
        <View style={styles.background}>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.img_url }} resizeMode={Image.resizeMode.cover} />
            <View  style={styles.textContainer}>
              <Text style={styles.title}>{rowData.title}</Text>
              <Text style={[styles.subtitle, {fontWeight: 'bold'}]} numberOfLines={1}>{rowData.price}</Text>
              <Text style={styles.subtitle} numberOfLines={1}>{rowData.alc}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  rowPressed(title) {
    var product = this.props.listings.filter(prop => prop.title === title)[0];

    this.props.navigator.push({
      id: getLabel('pdp.id'),
      title: title,
      product: product
    });
  }
}

module.exports = ProductListPage;
