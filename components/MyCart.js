import React from 'react';
import {StyleSheet, Text, View , FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import Checkout from "./Checkout"
import Barcode from 'react-native-barcode-expo';
import {Navigation} from "react-navigation"


 

export default class MyCart extends React.Component {
  handleClick = () => {
    //alert('Button clicked!');
    this.props.navigator.push(Checkout);
}
  render() {
    //const {navigate} = this.props.navigation; 

    return (
      <View style={styles.container}>
        <View >
          <Button 
            onPress={() => this.handleClick()}
            title="Tap to check out"
            color="black"
        
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