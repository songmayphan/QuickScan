import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';
import Prompt from 'react-native-prompt-crossplatform';
import Dialog from "react-native-dialog";

 const Scan = () => {

  //inintial state----------------------------------------------
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

    
  //Function to set quantity  --------------------------------------
  
  const Quantity=() =>{
    const [quantity, setQuantity] = useState(0);
    const onChange = (quanValue) => setQuantity(quanValue);
    console.log ("got in here")
    
    return (
      <View>
        <Button onPress={this.showDialog}></Button>
        <Dialog.Container>
          <Dialog.Title>Enter quantity</Dialog.Title>
          <Dialog.Description>
            Enter quantity for this product
          </Dialog.Description>
          <Dialog.Input 
              label="Quantity" onChangeText={onChange}>
          </Dialog.Input>
          <Dialog.Button label="Cancel" onPress={handleCancel()} />
          <Dialog.Button label="Submit" onPress={handleSubmit()}/>
        </Dialog.Container>
      </View>
    );
    
  }
  //once barcode is scanned------ ---------------------------------
  const handleBarCodeScanned = ({ type, data }) => {

    setScanned(true);
   // alert(`UPC code for this item is ${data}`);
   console.log(`UPC code for this item is ${data}`)
    //Prompt user for quantity
    Alert.alert(
      'Item Scanned',
      'Add to cart?',
      [
      
      {text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
      },
        {text: 'Yes', 
        onPress={Quantity}}
      ],
      {cancelable: false},
    );
  };


    // APi calls for $data, look up data item
  function getBarcode() {
    return fetch('http://18.189.32.71:3000/barcode/')
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.items;
    })
    .catch(error => {
      console.error(error);
    });

  };
  
  
  //----Permission----------------------------------
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
    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.upc_ean]}
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
//end Scan.js

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

export default Scan;