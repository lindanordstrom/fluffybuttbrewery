'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#568885'
  },
  price: {
    fontSize: 20,
    color: '#7CA6B4'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  container: {
    marginTop: 65,
  },
  background: {
    backgroundColor: 'white',
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
      <ListView style={styles.container}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}/>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    var price = rowData.price;

    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.title)}
      underlayColor='#dddddd'>
        <View style={styles.background}>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
            <View  style={styles.textContainer}>
              <Text style={styles.title}>{rowData.title}</Text>
              <Text style={styles.price}
                numberOfLines={1}>{price}
              </Text>
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
      id: 'ProductDetailsPage',
      title: 'Details',
      product: product
    });
  }
}

module.exports = ProductListPage;
