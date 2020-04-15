import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native"
//components
import Header from "./Header";
import ListItem from "./ListItem";
import Checkout from "./Checkout";


//redux
import { useSelector, useDispatch } from "react-redux";
import { TouchableHighlight } from "react-native-gesture-handler";
const MyCart = () => {
  //redux:
  const items = useSelector(state => state.cart);
  


  //render barcode
  const [isDone, setisDone] = useState(false);

  //render
  useEffect(() => {
    console.log("MyCart.js finshished rendering");
  }, []);

  console.log("------------mycart----------------");
  console.log(typeof(items))
  console.log(JSON.stringify(items));
  let totalPrice = 0;

  for (let i = 0; i < items.length; i++) {
    totalPrice += items[i].price * items[i].quantity;
  }

  
  //listEmptycomponent

  const ListEmptyView = () => {
    return (
      <View>
        <Text style={styles.text}>
        Your cart is empty. {"\n"}
          Scan item to add to cart
        </Text>
      </View>
    );
  };
  //======================Returns=======================================
  return (
    <View style={styles.container}>
      <Header title="My Cart" />

      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={ListEmptyView}
        />
        <Text style={styles.text}>
            TOTAL PRICE: ${totalPrice.toFixed(2)}
          </Text>
      </View>

      {!isDone && (
        <View>
          
          <TouchableHighlight
            style={styles.btn_done}
            onPress={() => {
              setisDone(true);
            }}
          >
            <Text style={styles.btnText}> Checkout </Text>
          </TouchableHighlight>
        </View>
      )}

      {isDone && <Checkout total={totalPrice} />}
    </View>
  );
}; //end mycart

export default MyCart;

//===================Styles===============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 10,
    height: 35,
    padding: 8,
    margin: 5,
    textAlign: "center"
  },

  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,

    textAlign: "center",
    color: "#3b1f2b",
    fontWeight: "bold",

    textAlign: "center",
  },
  btn_done: {
    backgroundColor: "#D00000",
    padding: 15,
    margin: 10,
    marginLeft: 10,
    borderRadius: 10,
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
