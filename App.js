import React, {useState} from 'react';
//AWS
import { withAuthenticator, Authenticator, SignIn } from 'aws-amplify-react-native'

import Amplify from '@aws-amplify/core'
import awsconfig from './aws-exports';
Amplify.configure(awsconfig)
//Navivgation
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//Components
import Scan from './components/Scan'
import Profile from './components/Profile';
import MyCart from './components/MyCart';
import MyList from './components/MyList';
//import { v4 as uuidv4 } from 'uuid';
//import 'react-native-get-random-values'
//import nanoid from 'nanoid'
//FROM function to Pure to class command pallete-------------------
//CartScreen
class CartScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MyCart/>
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
        <Profile/>
      </View>
    );
  }
}

//ListScreen------------------------------------------------------
//Random ID generator
//item's id and name

class ListScreen extends React.Component {
  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <MyList/>
      </View>
    );
  }
}

//Shopscren---------------------------------------------------
class ShopScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
  return (
    <View style={styles.scanner}>
      <Scan/>
    </View>
      //end containter
    );
  }//render
}//shopscreen

//styling-------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    
  },
  button :{
    maxHeight: 160,
    maxWidth: 160,
    color: '#5f758e',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
   position: 'absolute',
  },
  scanner:{
    flex: 3,
    justifyContent: 'flex-end'
  }
});


//App-----------------------------------------------------------

const Tab = createBottomTabNavigator();
class App extends React.Component {
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
                  else if (route.name === 'Shop'){
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
            
            <Tab.Screen name="Shop" component={ShopScreen}/>
            <Tab.Screen name="My List" component={ListScreen} />
            <Tab.Screen name="My Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            
          </Tab.Navigator>
        </NavigationContainer>
      );
    
  }
}

export default withAuthenticator(App);
//auth

<Authenticator hideDefault={true}>
  <SignIn />
  <MyCustomSignUp override={'SignUp'}/> 
</Authenticator>

class MyCustomSignUp extends React.Component{
  constructor() {
    super();
    this.gotoSignIn = this.gotoSignIn.bind(this);
  }

  gotoSignIn() {
    // to switch the authState to 'signIn'
    this.props.onStateChange('signIn',{});
  }

  render() {
    return (
      <div>
        {/* only render this component when the authState is 'signUp' */}
        { this.props.authState === 'signUp' && 
        <div>
          My Custom SignUp Component
          <button onClick={this.gotoSignIn}>Goto SignIn</button>
        </div>
        }
      </div>
    );
  }
}
