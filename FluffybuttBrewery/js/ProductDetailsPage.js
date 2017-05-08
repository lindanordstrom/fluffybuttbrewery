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
import { sendMailWith, validateEmail, formatBodyWithSender } from 'MailHelper'
import { getColor, ColorKeys } from 'Colors';
import { isAndroid } from 'PlatformWrapper';

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
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  constructor(props) {
    super()

    let product = props.product;
    let title = product.title
    let emailSubject = getLabel('pdp.contact.subject') + product.type + " " + title
    let emailBody = getLabel('pdp.contact.body') + title

    this.state = {
      modalVisible: false,
      product: product,
      body: emailBody,
      sender: null,
      subject: emailSubject
    };
  }

  renderModalView() {
    let emailSender = getLabel('contact.sender')
    let emailRecipients = getLabel('contact.recipient')

    return (<Modal animationType={"fade"} transparent={true} visible={this.state.modalVisible} onRequestClose={() => this.setModalVisible(false)}>
               <View style={styles.modalContainer}>
                <View style={styles.modalInnerContainer}>
                  <Text style={styles.contactTitle}>{getLabel('contact.button')}</Text>
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
                        let body = formatBodyWithSender(this.state.body, this.state.sender)
                        sendMailWith(emailSender, this.state.subject, emailRecipients, body)
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
    return (
      <View style={styles.background}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        <ScrollView style={styles.container}>
          {this.renderModalView()}
          <Image style={styles.image}
              source={{uri: this.state.product.img_url}}
              resizeMode={Image.resizeMode.contain} />
          <View style={styles.heading}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>{this.state.product.title}</Text>
              <Text style={styles.subtitle}>{this.state.product.type}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.subtitle, {fontWeight: 'bold'}]}>{this.state.product.price}</Text>
              <Text style={styles.subtitle}>{this.state.product.alc}</Text>
            </View>
          </View>
          <Text style={styles.description}>{this.state.product.details}</Text>
          <TouchableHighlight style={styles.button}
            onPress={() => this.setModalVisible(true)}
            underlayColor={BACKGROUND_COLOR}>
            <Text style={styles.buttonText}>{getLabel('pdp.contact.button')}</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

module.exports = ProductDetailsPage;
