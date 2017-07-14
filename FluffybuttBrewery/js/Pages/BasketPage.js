'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  ListView,
  Image,
  Alert
} from 'react-native';
import { getColor, ColorKeys } from 'Colors';
import AsyncStoreConstants from 'AsyncStorageWrapperConstants';
import { getItem, removeItem } from 'AsyncStorageWrapper';
import { getLabel } from 'Labels';
import { isAndroid } from 'PlatformWrapper';
import { sendMailWith, validateEmail } from 'MailHelper'
import { getContactInformationRef } from 'FirebaseConnection';
import Toast, { DURATION } from 'react-native-easy-toast'

const MAIN_COLOR = getColor(ColorKeys.MAIN)
const SECONDARY_COLOR = getColor(ColorKeys.SECOND)
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
    color: MAIN_COLOR
  },
  background: {
    backgroundColor: BACKGROUND_COLOR_LIGHT,
    flex: 1
  },
  thumb: {
    width: 40,
    height: 40,
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
    fontSize: 20,
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
    margin: 20,
    marginTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  inputField: {
    textAlignVertical: 'top',
    alignSelf: 'stretch',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#568885',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#568885',
    backgroundColor: 'white'
  }
});

var currentBasketItems;

class BasketPage extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: null,
      body: null,
      sender: null,
      recipient: null,
      products: null,
      loaded: false
    };
  }

  componentDidMount() {
    this.readItemsInBasket()

    getContactInformationRef().once('value')
    .then(snapshot => {
      this.setState({
        recipient: snapshot.val().Email,
      });
    });
  }

  readItemsInBasket() {
    return getItem(AsyncStoreConstants.STORAGE_KEY.BASKET_ITEMS)
      .then(items => {
        if (items) {
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});
          this.setState({
            dataSource: ds.cloneWithRows(items),
            products: items,
            loaded: true
          });
        }
      })
  }

  createBody() {
    var body = getLabel('basket.bodyIntro')
    if (this.state.products) {
      this.state.products.forEach( (item, index) => {
        body = body.concat(item.count + ' ' + item.title + '\n')
      })
    }

    if (this.state.body) {
      body = body.concat('\n\n' + this.state.body)
    }

    return body
  }

  renderContent() {
    if (!this.state.loaded || !this.state.products) {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.description}>{getLabel('basket.emptyBasket')}</Text>
        </ScrollView>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.description}>{getLabel('basket.description')}</Text>

        <TextInput style={[styles.inputField, {height: isAndroid() ? 40 : 30}]}
          multiline={false}
          onChangeText={(value) => this.setState({sender: value})}
          value={this.state.sender}
          returnKeyType="next"
          onSubmitEditing={() => this.refs["body"].focus()}
          placeholder={getLabel('contact.placeholderEmail')}/>

        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} removeClippedSubviews={false}/>

        <TextInput style={[styles.inputField, {height: 100}]}
          ref="body"
          multiline={true}
          onChangeText={(value) => this.setState({body: value})}
          value={this.state.body}
          placeholder={getLabel('contact.placeholder')}/>

        <TouchableHighlight style={styles.button}
          onPress={() => {
            if (validateEmail(this.state.sender)) {
              const title = getLabel('basket.sendConfirmationTitle')
              const message = getLabel('basket.sendConfirmationMessage')
              Alert.alert(
                title,
                message,
                [
                  {text: getLabel('contact.send'), onPress: () => {
                    const emailSubject = getLabel('basket.subject')
                    const body = this.createBody()
                    sendMailWith(this.state.sender, emailSubject, this.state.recipient, body)
                    this.setState({
                      body: null,
                      sender: null,
                      products: null,
                      dataSource: null
                    })
                    removeItem(AsyncStoreConstants.STORAGE_KEY.BASKET_ITEMS)
                    this.refs.toast.show(getLabel('contact.emailSent'), DURATION.LENGTH_LONG);
                  }},
                  {text: getLabel('contact.close'), style: 'cancel'}
                ]
              )
            }
          }}
          underlayColor={BACKGROUND_COLOR}>
          <Text style={styles.buttonText}>{getLabel('basket.button')}</Text>
        </TouchableHighlight>
        <Text style={[styles.description, {fontSize: 13, marginBottom: 20}]}>{getLabel('basket.disclaimer')}</Text>
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.background}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
        {this.renderContent()}
        <Toast
          ref="toast"
          position='center'
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
        />
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.background}>
        <View style={styles.separator}/>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: rowData.img_url }} resizeMode={Image.resizeMode.cover} />
          <View  style={styles.textContainer}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{rowData.count}st</Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
}

module.exports = BasketPage;
