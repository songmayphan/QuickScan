import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, changeQuantity, changeTotal } from "../redux/ducks";

const ListItem = ({ item }) => {
  //const [quantity, setQuantity] = useState(1); //default quantity is 1
  //const [totalItem, settotalItem] = useState(0); //total item default is 0
  const items = useSelector((state) => state);
  const dispatch = useDispatch();
  const add_item = (item) => dispatch(addItem(item));
  const delete_item = (id) => dispatch(deleteItem(id));
  const change_quantity = (quantity, id, price) =>dispatch(changeQuantity(quantity, id, price))

  let updatedPrice = item.price * item.quantity;
  updatedPrice = updatedPrice.toFixed(2);

  function handleChange(value , updatedPrice){
    change_quantity(value, item.id, item.price);
  }
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text> {item.name} </Text>
        <Text style={{fontWeight: "bold"}}> ${updatedPrice} </Text>
        <View style={styles.iconView}>
          <NumericInput
            value={item.quantity}
            onChange={(value) => handleChange(value, updatedPrice)}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0}
            totalWidth={90}
            totalHeight={40}
            iconSize={20}
            step={1}
            valueType="real"
            rounded
            textColor="#B0228C"
            iconStyle={{ color: "white" }}
            rightButtonBackgroundColor="#EA3788"
            leftButtonBackgroundColor="#E56B70"
          />

          <Ionicons
            style={styles.deleteButton}
            name="md-remove-circle"
            size={35}
            color="#d00000"
            onPress={() => delete_item(item.id)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 7,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 2,
    borderColor: "#eee",
    borderRadius: 10
  },
  listItemView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemText: {
    fontSize: 18,
  },
  checkedItemText: {
    fontSize: 18,
    textDecorationLine: "line-through",
    color: "green",
  },
  iconView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 150,
  },
  editItemInput: {
    padding: 0,
    fontSize: 18,
  },
});

export default ListItem;
