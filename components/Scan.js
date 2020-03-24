import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';
import Prompt from 'react-native-prompt-crossplatform';
import Dialog from "react-native-dialog";
import prompt from 'react-native-prompt-android';


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
  //once barcode is scanned------ ---------------------------------
  const [state, setstate] = useState(false);
  const handleBarCodeScanned = ({ type, data }) => {

    setScanned(true);
    // alert(`UPC code for this item is ${data}`);
    console.log(`UPC code for this item is ${data}`)
    //Prompt user for quantity
    // return (
    //   <Prompt
    //     title="Say something"
    //     placeholder="Enter Some Text"
    //     isVisible= {true}
    //     onChangeText={(text) => {
    //         setState({ promptValue: text });
    //     }}
    //     onCancel={() => {
    //       this.setState({
    //         promptValue: '',
    //         visiblePrompt: false,
    //       });
    //     }}
    //     onSubmit={() => {
    //       this.setState({
    //         visiblePrompt: false,
    //       });
    //     }}
    //   />
    // )
  };


  // APi calls for $data, look up data item================================================
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
    return <Text style={styles.text}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }


  // --------------------------------------------RETURN----------------------------------------------
  const [text, setText] = useState('');
  const onChange = textValue => setText(textValue);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={onChange}
        value={search}
      />
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.upc_ean]}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned &&
        <Button
          title={'Tap to Scan'}
          onPress={() => setScanned(false)}
        />} */}

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