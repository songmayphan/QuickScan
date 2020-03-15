
import React, {useState} from 'react';
//AWS


import Amplify from '@aws-amplify/core'
<<<<<<< HEAD
import config from './aws-exports'
Amplify.configure(config)
=======
import awsconfig from './aws-exports';
Amplify.configure(awsconfig)
//Navivgation
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//Components
import Scan from './components/Scan'
import Profile from './components/Profile';
import MyCart from './components/MyCart';
import MyList from './components/MyList';
//import { v4 as uuidv4 } from 'uuid';
//import 'react-native-get-random-values'
//import nanoid from 'nanoid'
//FROM function to Pure to class command pallete-------------------
//CartScreen
class CartScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MyCart/>
      </View>
    );
  }
}
//ProfileScreen------------------------------------------------------
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Profile/>
      </View>
    );
  }
}

//ListScreen------------------------------------------------------
//Random ID generator
//item's id and name

class ListScreen extends React.Component {
  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <MyList/>
      </View>
    );
  }
}

//Shopscren---------------------------------------------------
class ShopScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
  return (
    <View style={styles.scanner}>
      <Scan/>
    </View>
      //end containter
    );
  }//render
}//shopscreen
>>>>>>> f156ae1cb8c21a60c8ff46583c90eb1449869dfc

import MainTabs from './components/MainTabs'
import { Analytics } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
Analytics.disable();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
           <MainTabs/>
      )
  }
}
withAuthenticator(App, {
  // Render a sign out button once logged in
  includeGreetings: true, 
  // Show only certain components
  authenticatorComponents: [MainTabs],
  
});