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
  ScrollView,
  BackAndroid,
  Modal
} from 'react-native';
import { getLabel } from 'Labels';
import { sendMailWith, validateEmail } from 'MailHelper'
import { getColor, ColorKeys } from 'Colors';
import { getContactInformationRef } from 'FirebaseConnection';

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
    fontWeight: 'bold',
    paddingBottom: 20
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
    margin: 20,
    paddingLeft: 5,
    paddingRight: 5,
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
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    color: '#568885'
  },
});

class ContactPage extends Component {
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  constructor() {
    super()
    this.state = {
      title: "",
      address: "",
      telephone: "",
      about: "",
      modalVisible: false,
      body: null,
      sender: null
    };

    getContactInformationRef().once('value')
    .then(snapshot => {
      this.setState({
        title: snapshot.val().Title,
        address: snapshot.val().Address,
        telephone: snapshot.val().Telephone,
        about: snapshot.val().About
      });
    });
  }

  renderModalView() {
    let emailSubject = getLabel('contact.subject')
    let emailRecipient = getLabel('contact.recipient')
    let emailSender = getLabel('contact.sender')

    return (<Modal animationType={"fade"} transparent={true} visible={this.state.modalVisible}>
               <View style={styles.modalContainer}>
                <View style={styles.modalInnerContainer}>
                  <Text style={styles.title}>{getLabel('contact.button')}</Text>
                  <TextInput style={[styles.inputField, {height: 30}]}
                    multiline={false}
                    onChangeText={(value) => this.setState({sender: value})}
                    value={this.state.sender}
                    placeholder={getLabel('contact.placeholderEmail')}/>
                  <TextInput style={[styles.inputField, {height: 300}]}
                    multiline={true}
                    onChangeText={(value) => this.setState({body: value})}
                    value={this.state.body}
                    placeholder={getLabel('contact.placeholder')}/>
                  <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight style={styles.button}
                    onPress={() => {
                      if (validateEmail(this.state.sender)) {
                        let body = formatBodyWithSender(this.state.body, this.state.sender)
                        sendMailWith(emailSender, this.state.subject, emailRecipient, body)
                        this.setState({body: null})
                        this.setModalVisible(false)
                      }
                    }}
                    underlayColor={BACKGROUND_COLOR}>
                    <Text style={styles.buttonText}>{getLabel('contact.send')}</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.button}
                    onPress={() => this.setModalVisible(false)}
                    underlayColor={BACKGROUND_COLOR}>
                    <Text style={styles.buttonText}>{getLabel('contact.close')}</Text>
                  </TouchableHighlight>
                  </View>
                </View>
               </View>
              </Modal>);
  }

  render() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      try {
        this.props.navigator.pop();
        return true;
      }
      catch (err) {
        ToastAndroid.show("Cannot go back. Exiting the app...", ToastAndroid.SHORT);
        return true;
      }
    });

    return (
      <View style={styles.background}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <ScrollView style={styles.container}>
          {this.renderModalView()}
          <Image source={require('../assets/logo.png')}
          resizeMode={Image.resizeMode.contain}
          style={styles.image}/>
          <Text style={styles.description}>{this.state.title}</Text>
          <Text style={styles.description}>{this.state.about}</Text>
          <Text style={styles.description}>{this.state.address}</Text>
          <Text style={styles.description}>{this.state.telephone}</Text>
          <TouchableHighlight style={styles.button}
            onPress={() => this.setModalVisible(true)}
            underlayColor={BACKGROUND_COLOR}>
            <Text style={styles.buttonText}>{getLabel('contact.button')}</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

module.exports = ContactPage;
