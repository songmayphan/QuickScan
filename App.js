//import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';


import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

import AuthenticationContextProvider from "./contexts/Authentication.js"
import Entry from "./Entry"

export default function App() {

      return (
        <AuthenticationContextProvider>
        <View style={styles.container}>
          <Entry/>
        </View>
        </AuthenticationContextProvider>
      );
    }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#383961',
      justifyContent: 'center',
    },
  });