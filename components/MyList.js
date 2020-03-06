import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class MyList extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text> Choose your favorite store</Text>
      </View>
        
        //end containter
      );
  }
}

//styling-------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    height: 60,
    padding: 15,
    backgroundColor:'#bdc667'

  },

  button :{
    flex: 2,
    maxHeight: 160,
    maxWidth: 160,
    marginTop: 160,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
   position: 'absolute',
  },
});
