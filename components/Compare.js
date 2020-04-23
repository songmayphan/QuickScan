import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input'

//redux
import { useSelector, useDispatch } from "react-redux";
import { deleteFromList } from '../redux/list/actions';

export default function Compare() {


  ///////////STATE WITH HOOKS//////////////////
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});





  /////////////STATE MGMT WITH REDUX//////////////// 

  // retrieve list
  const items = useSelector(state => state.listReducer)
  const dispatch = useDispatch();
  //IMPORTTANT!!! CALL THIS FUNCTION TO DELETE FROM LIST
  const delete_item = (id) => dispatch(deleteFromList(id));

  //////////////////////////////////////////////////

  /////////FETCHING COMPARE FROM API/////////////////
  const compare = () => {
    if(items.length != 0){
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
        setData(data)
        setLoading(false);
      });
  } else {
    Alert.alert("Nothing to compare yet, go back and add items");
  }
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
            onPress={ compare }
            style={styles.button}
          >
            <Text style={{fontSize: 20}}>COMPARE</Text>
          </TouchableOpacity>

        ) : (
            <FlatList
              data={data}
              removeClippedSubviews={false}
              numColumns={2}
              columnWrapperStyle={styles.row}
              keyExtractor={({ store }, index) => store}
              renderItem={({ item }) => (
                <View style={styles.finalList}>
                  <Text style={{fontSize: 20}}>{item.store}</Text>
                  <Text style={{fontSize: 13, fontStyle: 'italic'}}>Final Price: ${item.finalPrice.toFixed(2)}</Text>
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
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.manufacturerText}>{item.manufacturer}</Text>
            <View style={styles.addButtonContainer}>
              <NumericInput 
              rightButtonBackgroundColor='#EA3788'
              leftButtonBackgroundColor='#E56B70'
              textColor='#B0228C'
              rounded
              iconStyle={{ color: 'white' }} 
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
                <Text style={{fontStyle: 'italic', fontSize: 15}}>REMOVE</Text>
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
    padding: 40,
    borderRadius: 10,
    backgroundColor: "#E3E2DF"
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
    backgroundColor: "#BAB2B5",
    marginVertical: 10,
    flexDirection: "column",
    borderRadius: 10,
  },
  finalList: {
    padding: 10,
    backgroundColor: "#EC3B61",
    marginVertical: 10,
    flexDirection: "column",
    borderRadius: 10,
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#EDC7B7",
    padding: 10,
    borderRadius: 10
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    padding: 10
  },
  nameText: {
    fontSize: 25
  },
  manufacturerText: {
    fontSize: 15
  }
});