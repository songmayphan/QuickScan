import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
//AWS
import { withAuthenticator } from 'aws-amplify-react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Auth } from 'aws-amplify';
import {AuthenticationContext} from "../contexts/Authentication"


//Profile class--------------------------------------------
function Profile() {
  
  const [userInfo, setUserInfo] = useState({
    currentPassword: '',
    newPassword: '',

  });

  console.log(userInfo)

  const {setAuthentication} = useContext(AuthenticationContext)

  const onChangeText = (key, value) => {
    setUserInfo({...userInfo, [key]: value})
  };

//New function---------------------------------------------


//MAY'S COMMENT: 
//changpassword should be using the API from Amplify
//fetching from our user pools to get password
//take a look at how Sandro's calling context

  //const changePassword=  (currentPassword, newPassword) =>{

  function changePassword (currentPassword, newPassword) {
   
    console.log (currentPassword, newPassword)

    if(!userInfo.currentPassword || !userInfo.newPassword )
    {
      Alert.alert('Missing fields', 'Please fill in all fields')
    }

    else{
    Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, 'oldPassword', 'newPassword');
    })
    //.then(data => console.log(data))
    .then((data) => {
      console.log('Success:', data);
    })
    .catch(err => {console.log('error', err)
    Alert.alert('Invalid','Current Password')
    })
  } 
    //.then((response) => response.json())

    changePassword = () => {
      Auth.changePassword();
    };
  
  }
  
//create a new Date instance----------------------
const date = new Date()
const hours = date.getHours()


//time of day-----------------------------------------
let timeOfDay

//Timeof day color text
if (hours < 12) {
  timeOfDay = "morning"
  styles.color = "#FFA000"
}
else if (hours >= 12 && hours < 17){
    timeOfDay = "afternoon"
    styles.color = "#E64A19"
}
else {
  timeOfDay = "night"
  styles.color = "#3F51B5"
}
  
    return (
//Profile image, time, password button------------------------------------
      <View style = {{backgroundColor: '#8baab5'}}>
        
        <Avatar
            size="large"
            rounded   
            source={{
              uri:
                'https://i.imgur.com/icikekY.jpg',
              }}
            //showEditButton
        />

            {/* don't need this anymore */}
            {/* <Text style = {{textAlign: 'center', textAlignVertical: 'center', 
              color: '#383961', fontWeight: 'bold',  flex: 1, marginTop: 0, 
              fontWeight: 'bold', fontSize: 30, }}>
              Good {timeOfDay}! 
              {"\n"}
              {"\n"}
              It's currently 
              {date.getHours()%12}:{date.getMinutes().toString().length === 2? 
              date.getMinutes(): '0' + date.getMinutes()} 
              { date.getHours() >= 12 && date.getMinutes() >0? ' PM': 
              date.getHours() > 12? ' PM': ' AM'}

              {"\n"}
              {"\n"}
            </Text> */}

          {/* need a button to change password 
            ideally, we'll have a flag, to indicate the button is pressed, then render
            the change password form
          */}
          <Text style = {{alignSelf: 'center', fontSize: 25, marginBottom: 20}}>
              Change Password 
          </Text>

          <Text style = {{alignSelf: 'center'}}>
              Current Password
          </Text>

          <TextInput onChangeText={value=> onChangeText({currentPassword: value})} style = {{
              height: 50,
              borderWidth: 1,
              borderColor: '#3b1f2b',
              margin: 23,
              marginTop: 1,
              borderRadius: 3,
              textAlign: 'center',
              fontSize: 25,
              color: '#FFFF',
              //fontFamily: 'Times New Roman',
              fontWeight: 'normal',
              //padding: 20,
              //lineHeight: 25,
            }}>
          </TextInput >

          <Text style = {{alignSelf: 'center'}}> 
            New Password
          </Text>

          <TextInput  onChangeText={value=> onChangeText({newPassword: value})} style = {{
              height: 50,
              borderWidth: 1,
              borderColor: '#3b1f2b',
              margin: 23,
              marginTop: 1,
              borderRadius: 3,
              textAlign: 'center',
              fontSize: 25,
              color: '#FFFF',
              //fontFamily: 'Times New Roman',
              fontWeight: 'normal',
              //padding: 20,
              //lineHeight: 25,
              }}>
          </TextInput>

          <TouchableOpacity  title = 'Change Password' 
              onPress = {() => {changePassword(userInfo.currentPassword, userInfo.newPassword)} }
              style = {{backgroundColor: "#bdc667",margin: 5, 
              color: 'yellow', borderWidth: 1, borderColor: '#2196F3', 
              height: 50, width: 140, alignSelf: 'center', 
              justifyContent: 'center', borderRadius: 6}} 
            > 

            <Text 
              style = {{textAlign: 'center', 
              textAlignVertical: 'center', color: '#FFFF', 
              fontWeight: 'bold' }}>
                Change Password
            </Text>  

          </TouchableOpacity>

      </View>
      
    );
  
}
//Styling------------------------------------------

const styles = StyleSheet.create ({ 
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#3b1f2b',
    margin: 23,
    marginTop: 1,
    borderRadius: 3,
    textAlign: 'center',
    fontSize: 25,
    color: '#FFFF',
    //fontFamily: 'Times New Roman',
    fontWeight: 'normal',
    //padding: 20,
    //lineHeight: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#8baab5',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#ffff",
  },

})

export default Profile;

