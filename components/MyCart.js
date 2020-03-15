import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Checkout from "./Checkout"



 

export default class MyCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            onPress={console.log("Checkout tapped")}
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