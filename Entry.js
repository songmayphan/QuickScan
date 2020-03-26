import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import { StyleSheet, View} from 'react-native';

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

import SignInTabs from "./Tabs"
import MainTabs from "./components/MainTabs"
import {AuthenticationContext} from "./contexts/Authentication"

export default function Entry(){

  const {isUserAuthenticated} = useContext(AuthenticationContext)

  if(isUserAuthenticated === true){
    return (
      <View style={styles.container}>
        <MainTabs />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <SignInTabs />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f758e',
    justifyContent: 'center',
  },
});