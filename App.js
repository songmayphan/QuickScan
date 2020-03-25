
import React, { useState } from 'react';
//AWS

import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
 //import Amplify from '@aws-amplify/core'
 //import config from './aws-exports'
 //Amplify.configure(config)

import MainTabs from './components/MainTabs'
//import { Analytics } from 'aws-amplify';
import {Authenticator} from 'aws-amplify-react-native';
// Analytics.disable();

export default function App() {

  return (
    <View style={styles.container} >
      <MainTabs/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});