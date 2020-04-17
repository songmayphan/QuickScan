import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import {ListContext} from "../contexts/itemlist"

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
 const compare = () =>  {
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
    });
  }



    return (
      <View style={styles.screen}>
         <FlatList
          data={items}
          removeClippedSubviews={false}
          keyExtractor={({ _id }, index) => _id}
          renderItem={({ item }) => (
            <View style={styles.itemList}>
              <Text>Item: {item.name}</Text>
              <Text>manufacturer: {item.manufacturer}</Text>
              </View>
          )}
        />
      <Button title='COMPARE' onPress={compare}/>
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
    }
  });
