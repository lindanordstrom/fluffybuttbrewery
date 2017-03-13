'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
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
  inputField: {
    height: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#568885',
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
    color: '#568885'
  },
  background: {
    backgroundColor: 'white',
    flex: 1
  }
});

class ContactPage extends Component {

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.title}>Contact Brewery</Text>
          </View>
          <Text style={styles.description}>Message:</Text>
          <TextInput style={styles.inputField}
            multiLine={true}
            placeholder='Enter your message here'/>
          <TouchableHighlight style={styles.button}
            underlayColor='#79B5B3'>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = ContactPage;
