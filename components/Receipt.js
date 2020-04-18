import React from "react";

import Barcode from "./Barcode.js";

import { StyleSheet, View, Text } from "react-native";
//redux

import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const Receipt = (total) => {
  //current state of items in cart, lock and print this
  const items = useSelector((state) => state);

  //these are the param for postBarcode
  //let barcodeID = Math.random().toString().slice(2, 11);
  let roundedTotal = total.total.toFixed(2);

  // console.log(typeof(barcodeID))
  // console.log(total.total)
  // console.log(roundedTotal)

  //function to post barcode with  total price to database
  //return==============================================
  return (
    <View style={styles.container}>
      <Text style={styles.input}> Receipt of Payment </Text>
      
    </View>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    margin: 1,
  },

  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
  },
  barcode: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  btn_done: {
    backgroundColor: "#68d979",
    padding: 15,
    margin: 10,
    marginLeft: 10,
    borderRadius: 10,
    maxWidth: 300
  },
  text: {
    height: 80,
    padding: 10,
    margin: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnText: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
  },
});
