'use strict';

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';

var SplashPage = require('./SplashPage');
var ProductListPage = require('./ProductListPage');
var ProductDetailsPage = require('./ProductDetailsPage');
var ContactPage = require('./ContactPage');


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
  noRoute(navigator) {
    return (
      <View style={styles.container}>
        <Text>Page not found</Text>
        <TouchableOpacity
            onPress={() => navigator.replace({
              id: 'SplashPage'
            })}>
          <Text style={styles.reload}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    var routeId = route.id;
    if (routeId === 'SplashPage' || routeId === 'ProductListPage') {
      return null;
    }
    return (
      <TouchableOpacity style={styles.navigationBarBackButton}
          onPress={() => navigator.pop()}>
        <Text style={styles.navigationBarText}>{"<"} Back</Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    var routeId = route.id;
    if (routeId === 'ProductListPage') {
      return <TouchableOpacity style={styles.navigationBarBackButton}
                onPress={() => navigator.push({
                  id: 'ContactPage',
                  title: 'Contact'
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reload: {
    fontWeight: 'bold',
    color: 'red',
    marginTop: 5
  },
  navigationBar: {
    backgroundColor: '#568885'
  },
  navigationBarBackButton: {
    flex: 1,
    justifyContent: 'center'
  },
  navigationBarText: {
    color: '#A2D6E1',
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

module.exports = NavigationManager;
