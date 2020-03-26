import React, { useState, useEffect, PropTypes } from 'react';

//Navivgation
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';



//Components
import Scan from './Scan';
import Profile from './Profile';
import MyCart from './MyCart';
import MyList from './MyList';
//Amplify

//import { withAuthenticator } from 'aws-amplify-react-native';


//-------------------------------------------------------------

//CartScreen
const CartScreen = props => {
  return <View style={styles.container}>
    <MyCart />
  </View>;
};
//ProfileScreen------------------------------------------------------
const ProfileScreen = props => {
  return <View style={styles.container}>
    <Profile />
  </View>;
};

//ListScreen------------------------------------------------------

const ListScreen = props => {
  return <View style={styles.container}>
    <MyList />
  </View>;
};

//Shopscren---------------------------------------------------
//parent function

function ShopScreen() {
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
  const handleMalarasa = () => {
    console.log('got in malarasa')
    return <View style={styles.container}>
      <Scan />
    </View>;
  }

  //==============================www========================
  function handleWW() {

    console.log("got in WW")

    Alert.alert(
      'Store',
      'You picked Wally World',
      [
        { text: 'OK', onPress: () => console.log("ok pressed") },
      ],
      { cancelable: false }
    )
  }


  return (

    <View style={{ flex: 1, justifyContent: 'center', padding: 50 }}>
      <Text style={styles.text} > Choose your store </Text>
      {scan ? <Scan /> : console.log("scan is not working")}
      
        <TouchableOpacity
          style={styles.btn}
          onPress=
          {() => setScan(true)}


        >
          <Text style={styles.btnText}>
            Wally World
        </Text>
        </TouchableOpacity>
      


      {/* <TouchableOpacity
        style={styles.btn}
        title="Malarasa"
        onPress={handleMalarasa}
      >
        <Text style={styles.btnText}>
          Malarasa
        </Text>
      </TouchableOpacity>
    </View>
       */}
    </View>

  );
}


//styling-------------------------------------------------------
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


//App-----------------------------------------------------------

const Tab = createBottomTabNavigator();


class MainTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'My Cart') {
                iconName = focused
                  ? 'ios-basket'
                  : 'ios-basket'
              } else if (route.name === 'My List') {
                iconName = focused
                  ? 'ios-list'
                  : 'ios-list-box';
              }
              else if (route.name === 'Profile') {
                iconName = focused
                  ? 'md-person'
                  : 'md-person'
              }
              else if (route.name === 'Shop') {
                iconName = focused
                  ? 'md-barcode'
                  : 'ios-barcode'
              }


              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          //Icon change when clicking the button
          tabBarOptions={{
            activeTintColor: '#BDC667',
            inactiveTintColor: '#5f758e',
          }}>


          <Tab.Screen name="Shop" component={ShopScreen} />
          <Tab.Screen name="My List" component={ListScreen} />
          <Tab.Screen name="My Cart" component={CartScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />

        </Tab.Navigator>
      </NavigationContainer>
    );

  }
}
export default MainTabs;