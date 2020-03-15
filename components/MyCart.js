import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Barcode from 'react-native-barcode-expo';


export default class MyCart extends React.Component {
  _onPressButton(){
    <Barcode value="Hello World" format="CODE128" />
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.button}>
    <Button
     onPress={this._onPressButton}
      title="Ready to check out?"
      
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
});
