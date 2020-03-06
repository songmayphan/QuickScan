import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,FlatList, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import { getRandomBytesAsync } from 'expo-random';
import Header from './Header';
import ListItem from './ListItem';
import AddItem from './AddItem';
//start class
//testing with dummy items

const MyList =() =>{
  const [items, setItems] = useState([
    {
      id: 1,
      text: 'Milk',
    },{
      id: 2,
      text: 'Steak',
    },{
      id: 3,
      text: 'Cheese',
    },{
      id: 4,
      text: 'Bread',
    },
     
  ])
  
// Flag true if user is currently editing an item----------
const [editStatus, editStatusChange] = useState(false);

// State to capture information about the item being edited---------------
const [editItemDetail, editItemDetailChange] = useState({
  id: null,
  text: null,
});

const [checkedItems, checkedItemChange] = useState([]);
//DELETE ITEM-------------------------------------------
const deleteItem = id => {
  setItems(prevItems => {
    return prevItems.filter(item => item.id !== id);
  });
};
//styling-------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Submit the users edits to the overall items state
const saveEditItem = (id, text) => {
  setItems(prevItems => {
    return prevItems.map(item =>
      item.id === editItemDetail.id ? {id, text: editItemDetail.text} : item,
    );
  });
  // Flip edit status back to false
  editStatusChange(!editStatus);
};

// Event handler to capture users text input as they edit an item
const handleEditChange = text => {
  editItemDetailChange({id: editItemDetail.id, text});
};
//ADD ITEM-------------------------------------------------------
const addItem = text => {
  if (!text) {
    Alert.alert(
      'No item entered',
      'Please enter an item when adding to your shopping list',
      [
        {
          text: 'Understood',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  } else {
    setItems(prevItems => {
      return [{id: getRandomBytesAsync, text}, ...prevItems];
    });
  }
};

// capture old items ID and text when user clicks edit
const editItem = (id, text) => {
  editItemDetailChange({
    id,
    text,
  });
  return editStatusChange(!editStatus);
};
//chECKED ITEM
const itemChecked = (id, text) => {
  const isChecked = checkedItems.filter(checkedItem => checkedItem.id === id);
  isChecked.length
    ? // remove item from checked items state (uncheck)
      checkedItemChange(prevItems => {
        return [...prevItems.filter(item => item.id !== id)];
      })
    : // Add item to checked items state
      checkedItemChange(prevItems => {
        return [...prevItems.filter(item => item.id !== id), {id, text}];
      });
};
//RETURN-------------------------------------------------------------------------------------
return (
  <View style={styles.container}>
    <AddItem addItem={addItem} />
    <Header title=" My Shopping List" />
    <FlatList
      data={items}
      renderItem={({item}) => (
        <ListItem
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
          isEditing={editStatus}
          editItemDetail={editItemDetail}
          saveEditItem={saveEditItem}
          handleEditChange={handleEditChange}
          itemChecked={itemChecked}
          checkedItems={checkedItems}
        />
      )}
    />
  </View>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyList
