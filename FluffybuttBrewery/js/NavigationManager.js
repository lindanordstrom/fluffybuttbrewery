'use strict';

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  BackAndroid
} from 'react-native';
import { getColor, ColorKeys } from 'Colors';
import { getLabel } from 'Labels';
import { SideMenu, List, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

var SplashPage = require('./Pages/SplashPage');
var ProductListPage = require('./Pages/ProductListPage');
var ProductDetailsPage = require('./Pages/ProductDetailsPage');
var ContactPage = require('./Pages/ContactPage');
var SupportPage = require('./Pages/SupportPage');
var BasketPage = require('./Pages/BasketPage');

const NAVIGATION_BAR_BACKGROUND_COLOR = getColor(ColorKeys.BACKGROUND);
const NAVIGATION_BAR_TEXT = getColor(ColorKeys.MAIN)
const list = [{ name: 'Produkter' },
              { name: 'Om bryggeriet' },
              { name: 'Support' }];
var _navigator = null

class NavigationManager extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false
    }
  }

  onSideMenuChange (isOpen: boolean) {
    this.setState({
      isOpen: isOpen
    })
  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const MenuComponent = (
      <View style={{flex: 1, backgroundColor: NAVIGATION_BAR_BACKGROUND_COLOR, paddingTop: 44}}>
        <List containerStyle={{marginBottom: 20}}>
        {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              onPress={() => {
                switch (i) {
                  case 0:
                    _navigator.replace({
                      id: getLabel('plp.id'),
                      title: getLabel('plp.title'),
                    })
                    break
                  case 1:
                    _navigator.replace({
                      id: 'ContactPage',
                      title: 'Om bryggeriet'
                    })
                    break
                  case 2:
                    _navigator.replace({
                      id: 'SupportPage',
                      title: 'Support'
                    })
                    break
                }
                this.toggleSideMenu()
              }}
              avatar={l.avatar_url}
              key={i}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
        </List>
      </View>
    )

    return (
      <View style={styles.navigationBar}>
        <SideMenu
          isOpen={this.state.isOpen}
          onChange={this.onSideMenuChange.bind(this)}
          menu={MenuComponent}>
          <View style={styles.background}>
            <Navigator
              initialRoute={{id: 'SplashPage'}}
              renderScene={this.renderScene.bind(this)}
              configureScene={(route) => {
                if (route.sceneConfig) {
                  return route.sceneConfig;
                }
                return Navigator.SceneConfigs.FloatFromRight;
              }}
              navigationBar={
                <Navigator.NavigationBar style={styles.navigationBar}
                routeMapper={NavigationBarRouteMapper(this.toggleSideMenu.bind(this))}
                navigationStyles={Navigator.NavigationBar.StylesIOS} />
              }
            />
          </View>
        </SideMenu>
      </View>
    );
  }

  renderScene(route, navigator) {
    _navigator = navigator
    var routeId = route.id;

    BackAndroid.addEventListener('hardwareBackPress', () => {
      try {
        if (routeId != 'ProductListPage') {
          navigator.pop();
        } else {
          BackAndroid.exitApp();
        }
        return true;
      }
      catch (err) { }
    });

    if (routeId === 'SplashPage') {
      return (
        <SplashPage
          navigator={navigator} />
      );
    }

    if (routeId === 'ProductListPage') {
      return (
        <ProductListPage
          navigator={navigator} />
      );
    }

    if (routeId === 'ProductDetailsPage') {
      return (
        <ProductDetailsPage
          navigator={navigator}
          product={route.product} />
      );
    }

    if (routeId === 'ContactPage') {
      return (
        <ContactPage
          navigator={navigator} />
      );
    }

    if (routeId === 'SupportPage') {
      return (
        <SupportPage
          navigator={navigator} />
      );
    }

    if (routeId === 'BasketPage') {
      return (
        <BasketPage
          navigator={navigator} />
      );
    }
  }
}

var NavigationBarRouteMapper = toggleSideMenu => ({
  LeftButton(route, navigator, index, navState) {
    var routeId = route.id;
    if (routeId === 'SplashPage') {
      return null;
    }
    if (routeId === 'ProductDetailsPage' || routeId === 'BasketPage') {
      return (
        <TouchableOpacity style={styles.navigationBarButton}
            onPress={() => navigator.pop()}>
            <Icon
              style={[styles.navigationBarText, {fontSize: 28, marginLeft: 20}]}
              name='arrow-back'
            />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.navigationBarButton}
          onPress={() => {toggleSideMenu()}}>
          <Icon
            style={[styles.navigationBarText, {fontSize: 28, marginLeft: 20}]}
            name='menu'
          />
      </TouchableOpacity>
    )
  },
  RightButton(route, navigator, index, navState) {
    var routeId = route.id;
    if (routeId === 'ProductListPage' || routeId === 'ProductDetailsPage') {
      return <TouchableOpacity style={styles.navigationBarButton}
                onPress={() => navigator.push({
                  id: 'BasketPage',
                  title: 'Intresselista'
                })}>
                <Icon
                  style={[styles.navigationBarText, {fontSize: 28, marginRight: 20}]}
                  name='shopping-cart'
                />
            </TouchableOpacity>;
    }
  },
  Title(route, navigator, index, navState) {
    return (
      <Text style={styles.navigationBarText}>{route.title}</Text>
    );
  }
});


var styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1
  },
  navigationBar: {
    backgroundColor: NAVIGATION_BAR_BACKGROUND_COLOR,
    flex: 1
  },
  navigationBarButton: {
    flex: 1,
    justifyContent: 'center'
  },
  navigationBarText: {
    color: NAVIGATION_BAR_TEXT,
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

module.exports = NavigationManager;
