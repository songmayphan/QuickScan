import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'


import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

export default function MyList() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const addItem = (item) => {
    setList(oldList => [...oldList, item]);
    console.log('item added', item)
  }

  useEffect(() => {
    fetch('http://18.189.32.71:3000/items/')
      .then((response) => response.json())
      .then((json) => { 
        json.map((item) =>{
          delete item.DESCRIPTION;
          item.QUANTITY = 0;
        })
        setData(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  });

  return (
    <View style={styles.screen}>
      <View>
          <SearchBar
            placeholder="Type Here..."
          />
        </View>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ _id }, index) => _id}
          renderItem={({ item }) => (
            <View style={styles.itemList} >
              <Text>Item: {item.NAME}</Text>
              <Text>Manufacturer: {item.MANUFACTURER}</Text>
              <View style={styles.addButtonContainer}>
                <NumericInput onChange={(value) => {
                  item.QUANTITY = value;
                  }} />
                <TouchableOpacity onPress={()=> {addItem(item)}} style={styles.button} >
                  <Text>Add Item</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};
