import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
<<<<<<< HEAD
import Checkout from "./Checkout"
=======
import Barcode from 'react-native-barcode-expo';
>>>>>>> f156ae1cb8c21a60c8ff46583c90eb1449869dfc



 

export default class MyCart extends React.Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
  }

=======
  _onPressButton(){
    <Barcode value="Hello World" format="CODE128" />
  }
>>>>>>> f156ae1cb8c21a60c8ff46583c90eb1449869dfc
  render() {

    return (
      <View style={styles.container}>
<<<<<<< HEAD
        <View style={styles.button}>
          <Button
            onPress={console.log("Checkout tapped")}
            title="Tap to check out"
        
          />
      </View>
=======
      <View style={styles.button}>
    <Button
     onPress={this._onPressButton}
      title="Ready to check out?"
      
    />
  </View>
>>>>>>> f156ae1cb8c21a60c8ff46583c90eb1449869dfc
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