import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';


export default function MyList() {

  // States
  const [enteredItem, setEnteredItem] = useState('');
  const [desiredItems, setDesiredItems] = useState([]);
  const [fetchedItems, setFetcheditems] = useState([]);
  const [isItLoading, setIfItsLoading] = useState(true);
  const [searchbarState, setSearchBarState] = useState({
    search: ''
  });


  // Get function for the items
  const componentDidMount = async () => {
    try {
      const response = await fetch('http://18.189.32.71:3000/items/')
      await response.json()
      .then((data) => {
        //setFetcheditems(data);
        setIfItsLoading(false);
        // cleaning the response
        data.map((item) =>{
          delete item._id;
          delete item.DESCRIPTION;
          setFetcheditems(() => [...fetchedItems, item])
          console.log(item);
        })
      });
    }
    catch (error) {
      console.error(error);
    }
  }
  
  // Searchbar function handlers
  const itemInputHandler = (textEntered)=> {
    setEnteredItem(textEntered);
  };

  const addItemHandler = () =>{
    setDesiredItems(currentItems => [...desiredItems, enteredItem]);
  };

  const SearchFilterFunction = (text) => {
    //passing the inserted text in textinput
    const newData = fetchedItems.filter((item) => {
      //applying filter for the inserted text in search bar
      const itemData = item.NAME ? item.NAME.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    //setSearchBarState(() => [...searchbarState, {search: data}])
  }

    if (isItLoading === true) {
      componentDidMount();
      return (
        <View style={{ flex: 1, paddingTop: 300 }}>
          <ActivityIndicator />
        </View>
      );
    }

  return (
    <View style={styles.screen}>

      <View>
      <SearchBar
          onChangeText={itemInputHandler} 
          value={enteredItem}
          onChangeText={text => SearchFilterFunction(text)}
          onClear={text => SearchFilterFunction('')}
          placeholder="Type Here..."
          />
      </View>

      <View style={styles.inputContainer}> 
        <TextInput placeholder="ITEM" style={styles.input} 
          onChangeText={itemInputHandler} 
            value={enteredItem}
        />

        <Button title="ADD" onPress={addItemHandler}/>

      </View>

      <ScrollView>
        {desiredItems.map((item)=> 
        <View style={styles.itemList} key={item}> 
        <Text> {item}  </Text> 
        </View>
         )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 60
  },
  inputContainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    
    
  },
  input:{
    borderBottomColor: 'black',
   borderBottomWidth: 1, 
   padding: 10, 
   width: '80%',
   textAlign: 'center',
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    
    
  }, 
  itemList:{
    padding: 10,
    backgroundColor: '#5f758e',
    borderColor: 'black',
    borderWidth: 1,   
    marginVertical: 10,
    
    
  }
});