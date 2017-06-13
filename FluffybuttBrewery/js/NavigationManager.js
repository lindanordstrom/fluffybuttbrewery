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

var SplashPage = require('./SplashPage');
var ProductListPage = require('./ProductListPage');
var ProductDetailsPage = require('./ProductDetailsPage');
var ContactPage = require('./ContactPage');

const NAVIGATION_BAR_BACKGROUND_COLOR = getColor(ColorKeys.BACKGROUND);
const NAVIGATION_BAR_TEXT = getColor(ColorKeys.MAIN)

class NavigationManager extends Component {
  render() {
    return (
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
        routeMapper={NavigationBarRouteMapper}
        navigationStyles={Navigator.NavigationBar.StylesIOS} />
      }
      />
    );
  }
  renderScene(route, navigator) {
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
          navigator={navigator}
          listings={route.listings} />
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

    return this.noRoute(navigator);

  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    var routeId = route.id;
    if (routeId === 'SplashPage' || routeId === 'ProductListPage') {
      return null;
    }
    return (
      <TouchableOpacity style={styles.navigationBarButton}
          onPress={() => navigator.pop()}>
        <Text style={styles.navigationBarText}>{"<"} Tillbaka</Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    var routeId = route.id;
    if (routeId === 'ProductListPage') {
      return <TouchableOpacity style={styles.navigationBarButton}
                onPress={() => navigator.push({
                  id: 'ContactPage',
                  title: 'Kontakt'
                })}>
              <Text style={{fontSize: 28, marginRight: 20}}>🏠</Text>
            </TouchableOpacity>;
    }
  },
  Title(route, navigator, index, navState) {
    return (
      <Text style={styles.navigationBarText}>{route.title}</Text>
    );
  }
};


var styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: NAVIGATION_BAR_BACKGROUND_COLOR
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
