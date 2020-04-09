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
import { addItem, deleteItem } from "../redux/ducks";

const ListItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1); //default quantity is 1
  const [totalItem, settotalItem] = useState(0); //total item default is 0
  const items = useSelector((state) => state);
  const dispatch = useDispatch();
  const add_item = (item) => dispatch(addItem(item));
  const delete_item = (id) => dispatch(deleteItem(id));
  //console.log(`Quantity ${quantity}`)
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text> {item.NAME} </Text>
        <Text> ${item.PRICE}</Text>
        <View style={styles.iconView}>
          <NumericInput
            value={quantity}
            onChange={(value) => setQuantity(value)}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            minValue={0}
            totalWidth={100}
            totalHeight={40}
            iconSize={25}
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
            onPress={() => delete_item(item.ID)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderColor: "#eee",
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
