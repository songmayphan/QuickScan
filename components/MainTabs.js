import React, { useState } from 'react';

//Navivgation
import { StyleSheet, Text, View, FlatList } from 'react-native';
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
class CartScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MyCart />
      </View>
    );
  }
}
//ProfileScreen------------------------------------------------------
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Profile />
      </View>
    );
  }
}

//ListScreen------------------------------------------------------

class ListScreen extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <MyList />
      </View>
    );
  }
}

//Shopscren---------------------------------------------------
 function ShopScreen() {
  const stores = [
    "Malarasa",
    "Wally World"
  ];
  const [text, setText] = useState(stores);
  const [result, setResult] = useState([]);

  const onChange = textValue => setText(textValue);

  useEffect(() => {
    const results = stores.filter(store =>
      store.toLowerCase().includes(text)
    );
    setSearchResults(results);
  }, [text]); 

    return (
       <View style={styles.container}>
         <SearchBar style={styles.shop}
           placeholder="What store are you going to?"
           onChangeText={onChange}
           value={text}
         />
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
  button: {
    maxHeight: 160,
    maxWidth: 160,
    color: '#5f758e',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
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