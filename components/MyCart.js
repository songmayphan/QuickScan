import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  NativeAppEventEmitter,
  Alert,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";
import Checkout from "./Checkout";
import Barcode from "react-native-barcode-expo";
import { Navigation } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import ListItem from "./ListItem";

const MyCart = (itemToAdd) => {
  //since we need an array of object in order for FlatList to work
  //we need to make an array to push the scanned objectt in

   let arrayOfItems = []
  // arrayOfItems.push(itemToAdd)
  // console.log(`itemtoADd in Mycart  ${itemToAdd}` )
  // console.log(arrayOfItems)
  const [items, setItems] = useState([
    {
      NAME: "Milk",
      ID: "1234",
      PRICE: 5.0,
      QUAN: 0
    },
  ]);
  console.log(items);
  if (itemToAdd != null){
    setItems(items.concat(itemToAdd)) //add new item to list
  }


  //function to delete item from my cart
  const deleteItem = ID => {
    setItems(prevItems => {
      return prevItems.filter(itemToAdd => itemToAdd.ID !== ID);
    });
  };
  //total

  let totalPrice = 0 
  
  return (
    <View style={styles.container}>
      <Header title="My Cart" />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.text}> TOTAL PRICE: ${totalPrice} </Text>

      <Text style={styles.input}> Scan this barcode to check out! </Text>
      <Barcode value="Your checkout Barcode" format="CODE128" />
    </View>
  );
}; //end mycart
export default MyCart;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
    textAlign: "center"
  },
  text: {
    height: 60,
    padding: 8,
    margin: 5,
    textAlign: "left",
    fontSize: 20
  }
});
