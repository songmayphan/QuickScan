import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Scan() {

  //inintial state----------------------------------------------
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  //useEffect hooks
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  //once barcode is scanned------ ---------------------------------
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
   // alert(`UPC code for this item is ${data}`);
   console.log(`UPC code for this item is ${data}`)
   // APi calls for $data, look up data item
    Alert.alert(
      'Item Scanned',
      'Add to cart?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  if (hasPermission === null) {
    return <Text style ={styles.text}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
    <BarCodeScanner
    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    style={StyleSheet.absoluteFillObject}
  />
      {scanned &&
      <Button
        title={'Tap to Scan'} 
        onPress={() => setScanned(false)} 
      />}    

  </View>
  );
}
//styles
const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxHeight: 160,
    maxWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#bdc667'
  },
  text: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
  },
});

