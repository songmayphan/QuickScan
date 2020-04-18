import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import {ListContext} from "../contexts/itemlist"


//redux
import { useSelector, useDispatch } from "react-redux";
import { deleteFromList } from '../redux/ducks';

export default function Compare() {

 //redux with hooks 
 //use this variable to loop through the list in redux
 const items = useSelector(state => state.list)
 const dispatch = useDispatch();
 //use this function to add to list
 const add_to_list = (item) => dispatch(addToList(item));
 //IMPORTTANT!!! CALL THIS FUNCTION TO DELETE FROM LIST
 const delete_item = (id) => dispatch(deleteFromList(id));

    
 //might want to get rid of this context right here
    const {List} = useContext(ListContext);
  
    return (
      <View style={styles.screen}>
       <FlatList
            data={List}
            removeClippedSubviews={true}
            keyExtractor={({ _id }, index) => _id}
            renderItem={({ item }) => (
              <View style={styles.itemList} >
                <Text>Item: {item.NAME}</Text>
                <Text>Manufacturer: {item.MANUFACTURER}</Text>
                <View style={styles.addButtonContainer}>
                  <TouchableOpacity onPress={()=> {addItem(item)}} style={styles.button} >
                    <Text>Add Item</Text>
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
    }
  });