import React, { Component } from 'react';
import Barcode from 'react-native-barcode-expo';

import { StyleSheet, View, TextInput, Text } from 'react-native';

export default class BarcodeGen extends Component {
  state = {
    text: 'Check Out',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.input}> Scan this barcode to check out! </Text>
        <Barcode value="Your checkout Barcode" format="CODE128" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    textAlign: 'center'
  }
});