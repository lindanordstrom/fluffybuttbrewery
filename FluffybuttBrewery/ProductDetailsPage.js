'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300,
    alignItems: 'center'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    color: '#568885'
  },
  price: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    color: '#7CA6B4'
  },
  description: {
    fontSize: 18,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    color: '#568885'
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
    margin: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  background: {
    backgroundColor: 'white',
    flex: 1
  }
});

class ProductDetailsPage extends Component {

  render() {
    var product = this.props.product;
    var details = product.details;
    var price = product.price;

    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Image style={styles.image}
              source={{uri: product.img_url}} />
          <View style={styles.heading}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>{price}</Text>
            <View style={styles.separator}/>
          </View>
          <Text style={styles.description}>{details}</Text>
          <TouchableHighlight style={styles.button}
            onPress={this.onContactPressed.bind(this)}
            underlayColor='#79B5B3'>
            <Text style={styles.buttonText}>Contact Brewery about this product</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  onContactPressed() {
    this.props.navigator.push({
      id: 'ContactPage',
      title: 'Contact'
    });
  }
}

module.exports = ProductDetailsPage;
