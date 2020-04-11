import React, { Component, useState, useRef } from 'react';

import Barcode from './Barcode.js';

import { StyleSheet, View, Text } from 'react-native';

const Checkout = total => {
  let totalString = total.toString();
  console.log(total.total)
  return <View style={styles.container}>
        <Text style={styles.input}> Scan this barcode to check out! </Text>
        
       <Barcode
        value= {total.total}
        options={{ format: 'CODE128', background: 'pink' }}
        />
         
      </View>;
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    margin: 10
  },

  input: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
    textAlign: 'center'
  },
  barcode:{
    flex:1, 
    justifyContent: 'center',
    margin: 20, 
  }
});