import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Checkout from "./Checkout"
import Barcode from 'react-native-barcode-expo';
import { Navigation } from "react-navigation"



const MyCart = props => {
  return <View style={styles.container}>
        <Text style={styles.input}> Scan this barcode to check out! </Text>
        <Barcode value="Your checkout Barcode" format="CODE128" />
      </View>;
};

export default MyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f758e',
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});