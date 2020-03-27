import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Scan from './Scan';


//Shopscren---------------------------------------------------
//parent function
export default function ShopScreen() {
  console.log("shopscreen.js called")
  const [scan, setScan] = useState(false);
  const STORES = [
    {
      id: 1,
      name: 'Malarasa'
    },
    {
      id: 2,
      name: 'Wally World'
    }
  ];
  //----------------------------------------------
  function renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      console.log("scan is true but won't render");
    }
  }

  const handleMalarasa = () => {
    console.log('got in malarasa');
    // return <View style={styles.container}>
    //   <Scan />
    // </View>;
    Alert.alert('Store', 'Malarasa picked', [
      { text: 'OK', onPress: () => console.log("malarasa okpressed") },
      {text : 'Cancel', onPress:() => console.log('cancel pressed')}
    ], { cancelable: false });
  };
  //==============================www========================
  function handleWW() {
    console.log("got in WW")
    Alert.alert('Store', 'Wally World picked', [
      { text: 'OK', onPress: () => setScan(true) },
      {text : 'Cancel', onPress:() => console.log('cancel pressed')}
    ], { cancelable: false });
  } //end handleWW


  return (<View style={styles.container}>
    <Text style={styles.text}> Choose your store </Text>

    <TouchableOpacity style={styles.btn} onPress={handleWW}>
      <Text style={styles.btnText}>
        Wally World
        </Text>
    </TouchableOpacity>

    {/* <TouchableOpacity style={styles.btn} onPress={handleMalarasa}>
      <Text style={styles.btnText}>
        Malarasa
        </Text>
    </TouchableOpacity> */}

     <Scan runScan={scan}/>

  </View>);
}


// styling
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 50 },
  text: {
    height: 60,
    padding: 8,
    margin: 5,
    textAlign: 'center',
    fontSize: 20
  },
  header: {
    height: 60,
    padding: 15,
    backgroundColor: "red",
  },
  shop: {
    height: 60,
    padding: 15,
    margin: 3,
    marginTop: 5
  },
  btn: {
    backgroundColor: '#5f758e',
    padding: 9,
    margin: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
