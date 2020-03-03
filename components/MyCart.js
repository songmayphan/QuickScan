import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class MyCart extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <Text>THIS PAGE HAS ALL THE ITEMS YOU PUT IN YOUR CART</Text>
        </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
