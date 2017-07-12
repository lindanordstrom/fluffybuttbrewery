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
  Modal,
  MapView,
  Linking
} from 'react-native';
import { getLabel } from 'Labels';
import { sendMailWith, validateEmail, formatBodyWithSender } from 'MailHelper'
import { getColor, ColorKeys } from 'Colors';
import { getContactInformationRef } from 'FirebaseConnection';
import { isAndroid, isTablet } from 'PlatformWrapper';
import Toast, { DURATION } from 'react-native-easy-toast'
import Communications from 'react-native-communications';
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
      sender: null,
      recipient: null,
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    getContactInformationRef().once('value')
    .then(snapshot => {
      this.setState({
        title: snapshot.val().Title,
        address: snapshot.val().Address,
        telephone: snapshot.val().Telephone,
        about: snapshot.val().About,
        recipient: snapshot.val().Email,
        latitude: snapshot.val().Latitude || 0,
        longitude: snapshot.val().Longitude || 0
      });
    });
  }

  facebookClick () {
    const link = getLabel('contact.facebookURL')
    Linking.canOpenURL(link).then(supported => {
      supported && Linking.openURL(link)
    }, (err) => Alert.alert(getLabel('support.errorTitle'), err));
  }

  renderModalView() {
    let emailSubject = getLabel('contact.subject')

    return (<Modal animationType={"fade"} transparent={true} visible={this.state.modalVisible} onRequestClose={() => this.setModalVisible(false)}>
               <View style={styles.modalContainer}>
                <View style={styles.modalInnerContainer}>
                  <Text style={styles.title}>{getLabel('contact.button')}</Text>
                  <TextInput style={[styles.inputField, {height: isAndroid() ? 40 : 30}]}
                    multiline={false}
                    onChangeText={(value) => this.setState({sender: value})}
                    value={this.state.sender}
                    returnKeyType="next"
                    onSubmitEditing={() => this.refs["body"].focus()}
                    placeholder={getLabel('contact.placeholderEmail')}/>
                  <TextInput style={[styles.inputField, {height: 200}]}
                    ref="body"
                    multiline={true}
                    onChangeText={(value) => this.setState({body: value})}
                    value={this.state.body}
                    placeholder={getLabel('contact.placeholder')}/>
                  <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight style={styles.button}
                    onPress={() => {
                      if (validateEmail(this.state.sender)) {
                        sendMailWith(this.state.sender, emailSubject, this.state.recipient, this.state.body)
                        this.setState({body: null})
                        this.setModalVisible(false)
                        this.refs.toast.show(getLabel('contact.emailSent'), DURATION.LENGTH_LONG);
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

  renderMapView() {
    if (isAndroid()) { return; }
    return (
      <MapView
        style={{height: isTablet() ? 500 : 200, marginTop: 20, marginBottom: 40}}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        annotations={[{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          title: getLabel('plp.title')
        }]}
      />
    );
  }

  render() {
    return (
      <View style={styles.background}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <ScrollView style={styles.container}>
          {this.renderModalView()}
          <Image source={require('../assets/logo.png')}
          resizeMode={Image.resizeMode.contain}
          style={styles.image}/>
          <Text style={styles.description}>{this.state.title}</Text>
          <Text style={[styles.description, {fontWeight: 'normal'}]}>{this.state.about}</Text>
          <Text style={styles.description}>{this.state.address}</Text>
          <TouchableHighlight
            onPress={() => Communications.phonecall(this.state.telephone, false)}
            underlayColor={BACKGROUND_COLOR_LIGHT}>
            <Text style={[styles.description, {textDecorationLine: 'underline'}]}>{this.state.telephone}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{alignSelf: 'center', paddingBottom: 20}}
            onPress={() => this.facebookClick()}
            underlayColor={BACKGROUND_COLOR}>
            <Icon
              style={{fontSize: 48, color: MAIN_COLOR}}
              name='facebook-square'
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}
            onPress={() => this.setModalVisible(true)}
            underlayColor={BACKGROUND_COLOR}>
            <Text style={styles.buttonText}>{getLabel('contact.button')}</Text>
          </TouchableHighlight>
          {this.renderMapView()}
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

module.exports = ContactPage;
