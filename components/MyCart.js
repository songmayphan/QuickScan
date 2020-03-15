import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Checkout from "./Checkout"
import Barcode from 'react-native-barcode-expo';


 

export default class MyCart extends React.Component {
  checkOut() {
    return (
      <View style={styles.container}>
      <Text style={styles.input}> Scan this barcode to check out! </Text>
        <Barcode value="Your checkout Barcode" format="CODE128" />
      </View>
    );
  }
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            onPress={() => this.checkOut()}
            title="Tap to check out"
        
          />
      </View>
    </View>
      //end containter
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button :{
    flex: 1,
    maxHeight: 160,
    maxWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
   
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