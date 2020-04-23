import React, { useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SearchBar } from "react-native-elements";

//redux
import { useSelector, useDispatch } from "react-redux";
import { addToList } from "../redux/list/actions";


export default function List({ navigation }) {

  const itemsInList = useSelector(state => state.listReducer);
  
  console.log(`items in list as of now (state.list) ${JSON.stringify(itemsInList)}`)

  ////////////////LOCALSTATE////////////////////
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  ///////////////////////////////////////////

  //Data has all the items in the stores,
  //redux with hooks 
  const items = useSelector(state => state)
  const dispatch = useDispatch();



  //////////////ADD TO LIST////////////////////
  const add_to_list = (item) => {

    let itsInList = false;
      //check the list for repeated items
      itemsInList.map((itemInList) => {
        itemInList.name == item.NAME ? itsInList = true : itsInList = false
    })

    if(itsInList){
    Alert.alert(item.NAME, "Item is already in the list")
    } else {
      dispatch(addToList(item))
      Alert.alert(item.NAME, "Item has been added to your list")
   }
  };
  ////////////////////////////////////////////////

  //////////////////SEARCHBAR/////////////////////
  const SearchFilterFunction = text => {
    //passing the inserted text in textinput
    const newData = data.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.NAME ? item.NAME.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    })
      setQueryResult(newData)
      setSearch(text)
  }
  /////////////////////////////////////////////////////////



///////////////////// FETCH FROM API //////////////////////
  useEffect(() => {
    fetch("http://18.189.32.71:3000/items/")
      .then((response) => response.json())
      .then((json) => {
        json.map((item) => {
          delete item.DESCRIPTION;
        });
        setData(json);
        setQueryResult(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  },[]);
  

  return (
    <View style={styles.screen}>
       <View>
        <SearchBar 
        round
        lightTheme
        searchIcon={{ size: 24 }}
        onChangeText={SearchFilterFunction}
        onClear={text => {SearchFilterFunction('')}}
        placeholder="Search"
        value={search}
        />
        <View>
             <TouchableOpacity
          onPress={() => navigation.navigate("Compare")}
          style={styles.continueButton}
        >
          <Text style={{fontSize: 18}}>Continue</Text>
        </TouchableOpacity>
          </View>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={queryResult}
          removeClippedSubviews={true}
          keyExtractor={({ _id }, index) => _id}
          renderItem={({ item }) => (
            <View style={styles.itemList}>
              <Text style={styles.nameText}>{item.NAME}</Text>
              <Text style={styles.manufacturerText}>{item.MANUFACTURER}</Text>
              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  onPress={() => 

                    add_to_list(item)
                  }
                  style={styles.button}
                >
                  <Text style={{fontSize: 18}}>Add item</Text>
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
    borderRadius: 10,
    backgroundColor: "#E3E2DF"
    
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 10,
    width: "80%",
    borderRadius: 10
  },
  itemList: {
    padding: 10,
    backgroundColor: "#E3AFBC",
    marginVertical: 10,
    flexDirection: "column",
    borderRadius: 10, 

  },
  addButtonContainer: {

    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    borderRadius: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#EC3B61",
    padding: 10,
    borderRadius: 10
  },
  continueButton: {
    alignItems: "center",
    backgroundColor: "#EDC7B7",
    padding: 20,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 25
  },
  manufacturerText: {
    fontSize: 15
  }
});