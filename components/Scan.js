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
  const [scanAgain, setScanAgain] = useState(false);
  const [showStore, setShowStore] = useState(true)
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  //Function to set quantity  --------------------------------------
  //once barcode is scanned------ ---------------------------------

  const handleBarCodeScanned = ({ type, data }) => {

    // alert(`UPC code for this item is ${data}`);
    console.log(`UPC code for this item is ${data}`)
    setScanned(false);
    setScanAgain(true)
    setShowStore(false)
    console.log("scan is now false")
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

  function handleWW() {
    console.log("got in WW")
    Alert.alert('Store', 'Wally World picked', [
      { text: 'OK', onPress: () => setScanned(true) },
      { text: 'Cancel', onPress: () => console.log('cancel pressed') }
    ], { cancelable: false });
  } //end handleWW

  function again() {
    setScanAgain(false);
    setScanned(true);
    setShowStore(false)
  }
  // --------------------------------------------RETURN----------------------------------------------
  return (
    <View style={styles.container}>
      {showStore && (
        <View style={styles.container}>
          
          <Text style={styles.text}> Choose your store </Text>
          <TouchableOpacity style={styles.btn} onPress={handleWW}>
            <Text style={styles.btnText}>Wally World</Text>
          </TouchableOpacity>

        </View>
      )}

      {/**true && expression always evaluates to expression, 
 * and false && expression always evaluates to false.

Therefore, if the condition is true, the element right after && will appear
 in the output. If it is false, React will ignore and skip it.

 */}
      {scanned && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.upc_ean]}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {/* condition ? true : false. */}
      {scanAgain && <Button title={"Tap to Scan Again"} onPress={again} />}

    </View>
  );
}
//end Scan.js

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    height: 60,
    marginBottom: 0

  },
  text: {
    height: 60,
    padding: 8,
    margin: 5,
    textAlign: 'center',
    fontSize: 20
  },
  header: {
    height: 60,
    padding: 15,
    backgroundColor: "red",
  },
  shop: {
    height: 60,
    padding: 15,
    margin: 3,
    marginTop: 5
  },
  btn: {
    backgroundColor: '#5f758e',
    padding: 9,
    margin: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Scan;