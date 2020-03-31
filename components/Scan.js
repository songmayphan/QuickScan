import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import DialogInput from "react-native-dialog-input";
import Prompt from "react-native-prompt-crossplatform";
import Dialog from "react-native-dialog";
import prompt from "react-native-prompt-android";
import { NavigationContainer, navigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Components:

import MyCart from "./MyCart";

const Scan = () => {
  //inintial states----------------------------------------------

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanAgain, setScanAgain] = useState(false);
  const [showStore, setShowStore] = useState(true);
  const [isMa, setisMa] = useState(false);
  const [isWW, setisWW] = useState(false);
  const [isDone, setisDone] = useState(false);

  //API STATES==============================================
  const [isLoading, setisLoading] = useState(true);
  const [dataSource, setdataSource] = useState(null);
  const [fetchedItems, setFetcheditems] = useState([]);

  //scanner REQUEST CAMERA
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //FunctionS to fetch --------------------------------------
  const fetchWW = async (dataScanned) => {
    console.log("got into fetch WW")
    try {
      const response = await fetch('http://18.189.32.71:3000/items/bystore/WALLY%20WORLD')
      await response.json()
      .then((data) => {
        //setFetcheditems(data);
        setisLoading(false);
        // cleaning the response
        data.map((item) =>{
          delete item._id;
          delete item.DESCRIPTION;
          delete item.STORE;
          delete item.MANUFACTURER;
          delete item.QUANTITY;
          setFetcheditems(() => [...fetchedItems, item])
          //console.log(` data.length = ${data.length}`);
         

        }) //end item function
        
        //console.log(data[1]);
        var dataScanned_trimmed = dataScanned.slice(1,-1);
          console.log(`trimmed data is now ${dataScanned_trimmed}`);
          for (var i = 0; i < data.length; i++){
            // look for the entry with a matching `dataScanned` value
            if (data[i].ID == dataScanned_trimmed){
               // we found it
              // item[i].ID is the matched result
              console.log(data[i]);
            }
          }



      }); //end try

    }
    catch (error) {
      console.error(error);
    }
  }//end fetchWW
  //FETCH MALARASA==================================================================
  const fetchMA = async () => {
    try {
      const response = await fetch('http://18.189.32.71:3000/items/bystore/WALLY%20WORLD')
      await response.json()
      .then((data) => {
        //setFetcheditems(data);
        setisLoading(false);
        // cleaning the response
        data.map((item) =>{
          delete item._id;
          delete item.DESCRIPTION;
          delete item.STORE;
          delete item.MANUFACTURER;
          delete item.QUANTITY;
          setFetcheditems(() => [...fetchedItems, item])
          console.log(item);
        })
      });
    }
    catch (error) {
      console.error(error);
    }
  }//end fecthMA

  //once barcode is scanned------ ---------------------------------

  const handleBarCodeScanned = ({ type, data }) => {
    // alert(`UPC code for this item is ${data}`);
    console.log(`UPC code for this item is ${data}`);
    setScanned(false); //can't render scan until pressed scanAgain
    setScanAgain(true); //can scan again now
    setShowStore(false); //doesn't show store anymore

    //if Malarasa is picked------------------------------------------------MALARASA---------------------------
    
    if (isMa) {
      console.log ("is MA is true")
      if (isLoading) {
        console.log("API is loading")
      }
      else{
        console.log("API is now loaded and is now false")
      }
      //if is WW is true, meaning the picked store was Wally World
      //this ensures that the rescanning process will work everytime we chose to scan again 
      //the api will be loaded
      fetchMA();
        return (
          <View style={{ flex: 1, paddingTop: 300 }}>
            <ActivityIndicator />
          </View>
        );
      //if return type here
  }

    else{
      console.log("isMa is now false")
    }

    //if WW is picked-=-----------------------------------------------WALLY WORLD---------------------------
    if (isWW) {
      console.log ("is WW is true")
      if (isLoading) {
        console.log("API is loading")
      }
      else{
        console.log("API is now loaded and is now false")
      }
      //if is WW is true, meaning the picked store was Wally World
      //this ensures that the rescanning process will work everytime we chose to scan again 
      //the api will be loaded
      fetchWW(data); //parse in the dataScanned
        return (
          <View style={{ flex: 1, paddingTop: 300 }}>
            <ActivityIndicator />
          </View>
        );
      //if return type here
  }

    else{
      console.log("isWW is false")
    }

    
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

  //----Permission----------------------------------
  if (hasPermission === null) {
    return <Text style={styles.text}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  function handleWW() {
    console.log("got in WW");
    setisWW(true);
    
    Alert.alert(
      "Store",
      "Wally World picked",
      [
        { text: "OK", onPress: () => setScanned(true) },
        { text: "Cancel", onPress: () => console.log("cancel pressed") }
      ],
      { cancelable: false }
    );
  } //end handleWW
//handleMa=======================================================
  function handleMalarasa() {
    setisMa(true);
    console.log("got in MALARASA");
    Alert.alert(
      "Store",
      "Malarasa picked",
      [
        { text: "OK", onPress: () => setScanned(true) },
        { text: "Cancel", onPress: () => console.log("cancel pressed") }
      ],
      { cancelable: false }
    );
  } //end handleMa
//scan again------------------------------------------------------------------
  function again() {
    setScanAgain(false);
    setScanned(true);
    setShowStore(false);
  }
//done shopping---------------------------------------------------------
  function Done({ navigate }) {
    return (
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Button title="Go to My Cart" onPress={() => navigate(MyCart)} />
      </View>
    );
  }
  if (isDone) {
    return Done({ navigate });
  }
  // ------------------------------------Scan--------Render-----------------------SCAN RENDER----------------------
  

    
    return (
      <View style={styles.container}>
        {showStore && (
          <View style={styles.container}>
            <Text style={styles.text}> Choose your store </Text>
            <TouchableOpacity style={styles.btn} onPress={handleWW}>
              <Text style={styles.btnText}>Wally World</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleMalarasa}>
              <Text style={styles.btnText}>Malarasa</Text>
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
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.upc_e]}
            style={StyleSheet.absoluteFillObject}
          />
        )}
       
        {/* condition ? true : false. */}
        {scanAgain && <Button title={"Tap to Scan Again"} onPress={again} />}

        {/* {isWW ? getBarcodeFromWW : console.log("nada")}
      {isMa ? getBarcodefromMa : console.log("nadadada")} */}

        {scanAgain && (
          <Button
            style={styles.text}
            title={"I'm done shopping"}
            onPress={() => {
              setisDone(true);
            }}
          />
          
        )}
           {/* {(dataSource != null)   && <Text> {dataSource.NAME}</Text> } */}
        
      </View>
    );
  
}; //end scan=====================================================================

export default Scan;


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
    textAlign: "center",
    fontSize: 20
  },
  header: {
    height: 60,
    padding: 15,
    backgroundColor: "red"
  },
  shop: {
    height: 60,
    padding: 15,
    margin: 3,
    marginTop: 5
  },
  btn: {
    backgroundColor: "#5f758e",
    padding: 9,
    margin: 3
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center"
  }
});


