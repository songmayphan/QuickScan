import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SearchBar } from "react-native-elements";
// import NumericInput from "react-native-numeric-input";
import { ListContext } from "../contexts/itemlist";

//redux
import { useSelector, useDispatch } from "react-redux";
import { addToList } from "../redux/ducks";

export default function List({ navigation }) {
  const setList  = useContext(ListContext);
  const itemsInList = useSelector(state => state.list);
  console.log(`items in list as of now (state.list) ${JSON.stringify(itemsInList)}`)

  //useState
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  console.log("=========list render===========")
  //i still dont know why it renders 3 times

  //MAY'S COMMENT: add item to list is now functional

  // console.log(`DATA IN LIST RIGHT NOW IS ${data}`);
  // console.log(`type of an item in data ${typeof(data[0])}`)
  // console.log(`type of DATA ITSELF IS ${typeof(data)}`)
  // console.log(`DATA LENGTH IS ${data.length}`)

  // for (let i = 0; i < data.length; i++) {
  //   console.log(data[i]);
  // }

  //MAY'S COMMENT: 
  //Data has all the items in the stores,
  //redux with hooks 
  const items = useSelector(state => state.list)
  const dispatch = useDispatch();
  const add_to_list = (item) => {
    dispatch(addToList(item))
    Alert.alert(item.NAME, "has been added to the list")
  };

  useEffect(() => {
    fetch("http://18.189.32.71:3000/items/")
      .then((response) => response.json())
      .then((json) => {
        json.map((item) => {
          delete item.DESCRIPTION;
          item.QUANTITY = 0;
        });
        setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  },[]);
  
  //I still don't know why it render 3 times
  
  // console.log("============LIST============")
  // console.log(`items in List right now ${items}`)

  return (
    <View style={styles.screen}>
      <View>
        <SearchBar placeholder="Type Here..." />
        <View>
             <TouchableOpacity
          onPress={() => navigation.navigate("Compare")}
          style={styles.button}
        >
          <Text>Continue</Text>
        </TouchableOpacity>
          </View>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          removeClippedSubviews={true}
          keyExtractor={({ _id }, index) => _id}
          renderItem={({ item }) => (
            <View style={styles.itemList}>
              <Text>Item: {item.NAME}</Text>
              <Text>Manufacturer: {item.MANUFACTURER}</Text>
              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  onPress={() => 
                    //caaling redux right here
                    add_to_list(item)
                  }
                  style={styles.button}
                >
                  <Text>Add Item</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 40,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 10,
    width: "80%",
  },
  itemList: {
    padding: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
    flexDirection: "column",
  },
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});