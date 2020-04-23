import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  TouchableOpacity,
  
} from "react-native-gesture-handler";

//redux
import { useSelector, useDispatch } from 'react-redux'
import {addItem} from '../redux/cart/actions'
const Scan = () => {
  //inintial states----------------------------------------------

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanAgain, setScanAgain] = useState(false);
  const [showStore, setShowStore] = useState(true);
  const [isMa, setisMa] = useState(false);
  const [isWW, setisWW] = useState(false);
  const [isDone, setisDone] = useState(false);
  

  //After api called states-------------

  //API STATES==============================================
  const [isLoading, setisLoading] = useState(true);
  const [fetchedItems, setFetcheditems] = useState([]);
  const [foundItem, setfoundItem] = useState(false);

//reedux
const items = useSelector(state => state.cartReducer)
const dispatch = useDispatch()
const add_item = item => dispatch(addItem(item))

  
  
  //scanner REQUEST CAMERA
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //useEffect for when foundItem changes
  useEffect(() => {
      console.log("Rendered Scan.js")    
  },[]);



  //function to print item to screen
  //function to export added item
  function printItem(itemToAdd) {
    //console.log(`product param in printItem is ${itemToAdd}`);
    //console.log( typeof(itemToAdd))
    Alert.alert(
      "Item scanned",
      `You scanned ${itemToAdd.NAME}. Add this to cart?`,

      [
        { text: "Cancel", onPress: () => console.log("cancel")},
        { text: "Yes",  onPress: () => add_item(itemToAdd)},
      ],
      { cancelable: false }
    );
    
  }

  //FunctionS to fetch --------------------------------------
  const fetchWW = async dataScanned => {
    //console.log("got into fetch WW");
    try {
      const response = await fetch(
        "http://18.189.32.71:3000/items/bystore/WALLY%20WORLD"
      );
      await response.json().then(data => {
        //setFetcheditems(data);
        setisLoading(false);
        // cleaning the response
        data.map(item => {
          //delete item._id;
          delete item.DESCRIPTION;
          delete item.STORE;
          delete item.MANUFACTURER;
          delete item.QUANTITY;
          setFetcheditems(() => [...fetchedItems, item]);
          
        }); //end item function
       
        //console.log(data[1]);
        var dataScanned_trimmed = dataScanned.slice(1, -1);
        //console.log(`trimmed data is now ${dataScanned_trimmed}`);
        let count = 0;
        for (var i = 0; i < data.length; i++) {
          // look for the entry with a matching `dataScanned` value
          if (data[i].ID == dataScanned_trimmed) {
            // we found it
            // item[i].ID is the matched result
            console.log("----------------ITEM IS FOUND------------------")
            console.log(data[i]);
            console.log(data[i].NAME);
            //console.log(typeof(data[i]))
            //console.log(typeof(data[i].NAME))
            
            printItem(data[i]);
            setfoundItem(true);
          }
          else{
              count++;
              // console.log(count)
            if (count == data.length){
              console.log("item does not exist in this list")
              Alert.alert(
                "Item Not Found",
                `The item you scanned is not found. Please try another item!`,
          
                [ 
                  { text: "OK", onPress: () => console.log("item not found ok pressed")},
                ],
                { cancelable: false }
              );
            }

          }
          
        }//end for loop

    
        //console.log(`fetchedItems = ${JSON.stringify(fetchedItems )}`);
      }); //end try

    } catch (error) {
      console.error(error);
    }
  }; //end fetchWW
  //FETCH MALARASA==================================================================
  const fetchMA = async dataScanned => {
    try {
      const response = await fetch(
        "http://18.189.32.71:3000/items/bystore/MALARASA"
      );
      await response.json().then(data => {
        //setFetcheditems(data);
        setisLoading(false);
        // cleaning the response
        data.map(item => {
          delete item._id;
          delete item.DESCRIPTION;
          delete item.STORE;
          delete item.MANUFACTURER;
          delete item.QUANTITY;
          setFetcheditems(() => [...fetchedItems, item]);
          //console.log(item);
        });
        

        //trimming the first and last digit of the generated barcode
        var dataScanned_trimmed = dataScanned.slice(1, -1);
        //console.log(`trimmed data is now ${dataScanned_trimmed}`);
        for (var i = 0; i < data.length; i++) {
          // look for the entry with a matching `dataScanned` value
          if (data[i].ID == dataScanned_trimmed) {
            // we found it
            // item[i].ID is the matched result
            console.log(data[i]);
            console.log(data[i].NAME);
            //console.log(typeof(data[i].NAME))
            printItem(data[i].NAME);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }; //end fecthMA

  //once barcode is scanned------ ---------------------------------

  const handleBarCodeScanned = ({ type, data }) => {
    // alert(`UPC code for this item is ${data}`);
    console.log(`ID scanned for this item is ${data}`);
    setScanned(false); //can't render scan until pressed scanAgain
    setScanAgain(true); //can scan again now
    setShowStore(false); //doesn't show store anymore

    //if Malarasa is picked------------------------------------------------MALARASA---------------------------

    if (isMa) {
      //console.log("is MA is true");
      fetchMA(data);
      if (isLoading) {
        console.log("API is loading");
        return (
          <View style={{ flex: 1, paddingTop: 300 }}>
            <ActivityIndicator />
          </View>
        );
      } else {
        console.log("API is now loaded and is now false");
      }
      //if is WW is true, meaning the picked store was Wally World
      //this ensures that the rescanning process will work everytime we chose to scan again
      //the api will be loaded

      //if return type here
    }

    //if WW is picked-=-----------------------------------------------WALLY WORLD---------------------------
    if (isWW) {
      
      fetchWW(data); //parse in the dataScanned
      if (isLoading) {
        console.log("API is loading");
        return (
          <View style={{ flex: 1, paddingTop: 300 }}>
            <ActivityIndicator />
          </View>
        );
      } else {
        console.log("API is now loaded and is now false");
      }
      //if is WW is true, meaning the picked store was Wally World
      //this ensures that the rescanning process will work everytime we chose to scan again
      //the api will be loaded
    }
  };

  // APi calls for $data, look up data item================================================

  //----Permission----------------------------------
  if (hasPermission === null) {
    return <Text style={styles.text}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }
//-------------------------------------------------------------WW handle
  function handleWW() {
    console.log("Wally World chosen");
    setisWW(true);

    Alert.alert(
      "Store",
      "Wally World picked",
      [
  
        { text: "Cancel", onPress: () => console.log("cancel pressed") }
        ,
        { text: "OK", onPress: () => setScanned(true) }
      ],
      { cancelable: false }
    );
  } //end handleWW


  //handleMa=======================================================
  function handleMalarasa() {
    setisMa(true);
    console.log("Malarasa chosen");
    Alert.alert(
      "Store",
      "Malarasa picked",
      [
        { text: "Cancel", onPress: () => console.log("cancel pressed") }
        ,
        { text: "OK", onPress: () => setScanned(true) }
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
  function shopnow() {
    setShowStore(true);
    setisDone(false)
    
  }
  //done shopping---------------------------------------------------------
  function noMore(){
    setScanAgain(false);
    setScanned(false);
    setShowStore(false);
    setisDone(true);
    
  }
  //------------------
  function Done() {
    Alert.alert(
      "Done Shopping",
      "Please go to My Cart tab to review your items",
      [
        { text: "OK", onPress: () => noMore() }
      ],
      { cancelable: false }
    );
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

      {/* {isWW ? getBarcodeFromWW : console.log("nada")}
      {isMa ? getBarcodefromMa : console.log("nadadada")} */}

      {scanAgain && (
        <View style={styles.container_buttons}>
          <View style={styles.btn_done}>
            <TouchableOpacity
              onPress={Done}
            >
              <Text style={styles.btnText}> I'm done shopping</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btn_again}>
            <TouchableOpacity 
            onPress={again}
            >
              <Text style={styles.btnText}> Tap to scan again </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isDone && (
      <View style={styles.container}>
        <Text style={styles.text}>
          Thank you for shopping with us!
        </Text>
        <TouchableOpacity
        style={styles.btn_again}
        onPress={shopnow}
        >
          <Text> I'm going shopping now </Text>
        </TouchableOpacity>
      </View>
    )}
      
    
      {/* condition ? true : false. */}   
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
    marginBottom: 10
  },
  container_buttons:{
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative'

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
    padding: 10,
    margin: 10, 
    borderRadius: 10
    
  },
  btn_done: {
    backgroundColor: "#D00000",
    padding: 15,
    margin: 10,
    marginLeft: 10,
    borderRadius: 10,
    alignSelf: "flex-end"
  },
  btn_again: {
    backgroundColor: "#bdc667",
    padding: 15,
    margin: 10,
    marginLeft: 10,
    borderRadius: 10,
    alignSelf: "flex-start"
  },
  btnText: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center"
  }
});
