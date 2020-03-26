import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import Scan from './Scan';
import { styles } from './MainTabs';
import Scan from './Scan'
//Shopscren---------------------------------------------------
//parent function
export default function ShopScreen() {
    console.log("what the fuck is this shit")
  const [scan, setScan] = useState(false);
  const STORES = [
    {
      id: 1,
      name: 'Malarasa'
    },
    {
      id: 2,
      name: 'Wally World'
    }
  ];
  //----------------------------------------------
  function renderIf(condition, content){
      if (condition){
          return content;
      }else {
        console.log ("scan is true but won't render");
      }
  }

  const handleMalarasa = () => {
    console.log('got in malarasa');
    return <View style={styles.container}>
      <Scan />
    </View>;
  };
  //==============================www========================
  function handleWW() {
    console.log("got in WW");
    Alert.alert('Store', 'You picked Wally World', [
      { text: 'OK', onPress: () => setScan(true) },
    ], { cancelable: false });
  } //end handleWW


  return(<View style={{ flex: 1, justifyContent: 'center', padding: 50 }}>
    <Text style={styles.text}> Choose your stoefgrgrgrg rgre </Text>

    <TouchableOpacity style={styles.btn} onPress={handleWW}>
      <Text style={styles.btnText}>
        Wally World
        </Text>
    </TouchableOpacity>

    {renderIf(scan, <Scan/>)}
    





  </View>);
}
