import React, { useState, useEffect, useContext, ScrollView } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input'

//redux
import { useSelector, useDispatch } from "react-redux";
import { deleteFromList } from '../redux/ducks';

export default function Compare() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});





  /////////////STATE MGMT WITH REDUX//////////////// 
  //use this variable to loop through the list in redux

  // retrieve list
  const items = useSelector(state => state.list)
  console.log(items);
  const dispatch = useDispatch();
  //use this function to add to list
  const add_to_list = (item) => dispatch(addToList(item));
  //IMPORTTANT!!! CALL THIS FUNCTION TO DELETE FROM LIST
  const delete_item = (id) => dispatch(deleteFromList(id));

  //////////////////////////////////////////////////

  // comparing
  const compare = () => {
    console.log("comparing");
    fetch("http://18.189.32.71:3000/compare/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setData(data)
        setLoading(false);
      });
  }

  const renderFooter = () => {
    return (
      <View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 3,
            padding: 10
          }}
        />
        {isLoading ? (
          <TouchableOpacity
            onPress={compare}
            style={styles.button}
          >
            <Text>COMPARE</Text>
          </TouchableOpacity>

        ) : (
            <FlatList
              data={data}
              removeClippedSubviews={false}
              numColumns={2}
              columnWrapperStyle={styles.row}
              keyExtractor={({ store }, index) => store}
              renderItem={({ item }) => (
                <View style={styles.itemList}>
                  <Text>{item.store}</Text>
                  <Text>Final Price: ${item.finalPrice.toFixed(2)}</Text>
                </View>
              )}
            />
          )}
      </View>
    )
  }



  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        removeClippedSubviews={false}
        ListFooterComponent={renderFooter}
        keyExtractor={({ _id }, index) => _id}
        renderItem={({ item }) => (
          <View style={styles.itemList}>
            <Text>Item: {item.name}</Text>
            <Text>manufacturer: {item.manufacturer}</Text>
            <View style={styles.addButtonContainer}>
              <NumericInput 
              initValue = {item.quantity}
              minValue = {1}
              onChange={value => {
                item.quantity = value
                setLoading(true)
                }} />
              <TouchableOpacity
                onPress={() => {
                  delete_item(item)
                  setLoading(true)
                }}
                style={styles.button}
              >
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    padding: 40
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    width: '80%'
  },
  itemList: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 10,
    flexDirection: 'column'
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    padding: 10
  },
});