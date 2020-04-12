import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
  title: 'My Shopping List',
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    padding: 20,
    backgroundColor: '#bdc667',
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'justify',
  },
});

export default Header;