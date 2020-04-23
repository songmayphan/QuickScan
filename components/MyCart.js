import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native"

//components
import Header from "./Header";
import ListItem from "./ListItem";
import Checkout from "./Checkout";



//redux
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
const MyCart = () => {
  //redux:
  const items = useSelector(state => state.cartReducer);
  console.log("------------mycart----------------");
  //console.log(typeof(items))
  console.log(JSON.stringify(items));
  

  //render barcode
  const [isDone, setisDone] = useState(false);
 
  useEffect(() => {
    console.log("MyCart.js finshished rendering");
  }, []);

 
  let totalPrice = 0;

  for (let i = 0; i < items.length; i++) {
    totalPrice += items[i].price * items[i].quantity;
  }

  
  //listEmptycomponent

  const ListEmptyView = () => {
   
    return (
      <View>
        <Text style={styles.input}>
        Your cart is empty. {"\n"}
          Scan item to add to cart
        </Text>
      </View>
    );
  };
  //======================Returns=======================================
  return (
    <View style={styles.container}>
  

      {!isDone &&(
        <View style={styles.container}>
         <Header title="My Cart" />

         
           <FlatList
             data={items}
             renderItem={({ item }) => <ListItem item={item} />}
             keyExtractor={(item, index) => index.toString()}
             ListEmptyComponent={ListEmptyView}
           />
           <Text style={styles.text}>
               TOTAL PRICE:   ${totalPrice.toFixed(2)}
             </Text>
             <TouchableOpacity
            style={styles.btn_done}
            onPress={() => {
              setisDone(true);
              
            }}
          >
            <Text style={styles.btnText}> Checkout </Text>
          </TouchableOpacity>
          </View>
      )}
      

      {isDone && (
       <Checkout total={totalPrice}/>
      ) }
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
    padding: 5,
    margin: 2,
    textAlign: "center", 
    marginBottom: 10
  },

  input: {
    height: 80,
    padding: 10,
    margin: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
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
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnText: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
  },
});
