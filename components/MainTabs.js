import React from "react";

//Navivgation
import { StyleSheet, View, FlatList, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//redux
import { Provider } from "react-redux";
import store from "../redux/store";
//components
import MyCart from "./MyCart";
import Profile from "./Profile";
import MyList from "./MyList";
import Scan from "./Scan";
//Amplify

//import { withAuthenticator } from 'aws-amplify-react-native';

//-------------------------------------------------------------

//CartScreen
const CartScreen = (props) => {
  return (
    <View style={styles.container}>
      <MyCart />
    </View>
  );
};
//ProfileScreen------------------------------------------------------
const ProfileScreen = (props) => {
  return (
    <View style={[styles.container, {backgroundColor: '#8baab5'}]}>
      <Profile />
    </View>
  );
};

//ListScreen------------------------------------------------------

const ListScreen = (props) => {
  return (
    <View style={styles.container}>
      <MyList />
    </View>
  );
};

//styling-------------------------------------------------------
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    height: 60,
    marginBottom: 0,
  },
  text: {
    height: 60,
    padding: 8,
    margin: 5,
    textAlign: "center",
    fontSize: 20,
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
    marginTop: 5,
  },
  btn: {
    backgroundColor: "#5f758e",
    padding: 9,
    margin: 3,
  },
  btnText: {
    color: "#ffff",
    fontSize: 20,
    textAlign: "center",
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
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "My Cart") {
                  iconName = focused ? "ios-basket" : "ios-basket";
                } else if (route.name === "My List") {
                  iconName = focused ? "ios-list" : "ios-list-box";
                } else if (route.name === "Profile") {
                  iconName = focused ? "md-person" : "md-person";
                } else if (route.name === "Shop") {
                  iconName = focused ? "md-barcode" : "ios-barcode";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            //Icon change when clicking the button
            tabBarOptions={{
              activeTintColor: "#BDC667",

              inactiveTintColor: "#5f758e",
            }}
          >
            <Tab.Screen name="Shop" component={Scan} />
            <Tab.Screen name="My List" component={ListScreen} />
            <Tab.Screen name="My Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
export default MainTabs;
