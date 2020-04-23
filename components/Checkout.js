import React, { Component, useState, useRef } from "react";

import Barcode from "./Barcode.js";

import { StyleSheet, View, Text, Alert } from "react-native";
//redux

import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";



const Checkout = (total) => {
  //current state of items in cart, lock and print this
  const items = useSelector((state) => state);

  //these are the param for postBarcode
  let barcodeID = Math.random().toString().slice(2, 11);
  let roundedTotal = total.total.toFixed(2);

  // console.log(typeof(barcodeID))
  // console.log(total.total)
  // console.log(roundedTotal)

  //function to post barcode with  total price to database
  function postBarcode(barcodeID, totalPrice) {
    console.log("POST barcode successfully");
    fetch("http://18.189.32.71:3000/barcode/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
        barcodeNumber: barcodeID,
        price: totalPrice,
        
        //needs to have another attribute (array of onjects) here to ppost
        //the list of items that are stored in cart at checkout time
        //pass in the current state
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        
      });
  }
  //posting the barcode
  postBarcode(barcodeID, roundedTotal);

  //function to print receipts: 
  // function printReceipt(items){

  // }
  //return==============================================
  return (
    <View style={styles.container}>
      <Text style={styles.input}> Scan this barcode to check out! </Text>

      <Barcode
        value={barcodeID}
        options={{ format: "CODE128", background: "pink" }}
      />
       <TouchableOpacity
      style={styles.btn_done}
      onPress={() => {
        Alert.alert(
          "Shopping Done!",
          "Thank you for shopping with QuickScan",
          [ 
            { text: "OK", onPress: () => console.log("ok")}
          ],
          { cancelable: false }
        );
      }}
      >
         <Text style={styles.btnText}> Done </Text>

      </TouchableOpacity> 
    </View>
  );
};

export default Checkout;

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
