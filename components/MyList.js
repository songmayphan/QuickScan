import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import { createStackNavigator } from '@react-navigation/stack';



// import Amplify from '@aws-amplify/core'
// import config from './aws-exports'
// Amplify.configure(config)

import List from './List.js'
import Compare from './Compare.js'


import ListContextProvider from "../contexts/itemlist"

const Stack = createStackNavigator();

export default function MyList() {
  return (
    <ListContextProvider>
    <Stack.Navigator>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Compare" component={Compare}/>
    </Stack.Navigator>
    </ListContextProvider>
  );

}

