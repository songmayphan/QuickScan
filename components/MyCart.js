import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  NativeAppEventEmitter
} from "react-native";
import { Button } from "react-native-elements";
import Checkout from "./Checkout";
import Barcode from "react-native-barcode-expo";
import { Navigation } from "react-navigation";
import { useNavigation } from "@react-navigation/native";

export default({ history, location })  => (
  
    <View style={styles.container}>
      <Text>{JSON.stringify(location.state)}</Text>
      <Button title="change page" onPress={() => history.push("/")} />
      <Text style={styles.input}> Scan this barcode to check out! </Text>
      <Barcode value="Your checkout Barcode" format="CODE128" />
    </View>
  
)
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#5f758e',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"

  },

  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,

    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',

    textAlign: "center"
  },
  text: {
    height: 60,
    padding: 8,
    margin: 5,
    textAlign: "center",

    fontSize: 20
  }
});
