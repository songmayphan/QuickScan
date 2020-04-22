import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, Alert} from 'react-native';


import { Avatar, ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';


import { Auth } from 'aws-amplify';
import {AuthenticationContext} from "../contexts/Authentication"


//Profile class--------------------------------------------
function Profile() {
  
  const [userInfo, setUserInfo, setSignOut] = useState({
    currentPassword: 'test_password',
    newPassword: 'test_new',
    signOut: 'test_signOut'
  });


//Authecntication----------------------------------------------------- 


  const {setAuthentication} = useContext(AuthenticationContext)

  const onChange_new = (key, value) => {
    setUserInfo({...userInfo, [key]: value})
  };

//New function---------------------------------------------

  function changePassword (currentPassword, newPassword) {

    if(!userInfo.currentPassword || !userInfo.newPassword )
    {
      Alert.alert('Missing fields', 'Please fill in all fields')
    }

    else{
    Auth.currentAuthenticatedUser()
    .then(user => {
        Alert.alert('Confirmed','Password has been Change') 
        return Auth.changePassword(user, currentPassword, newPassword);  
        
      })
    
    .then((data) => {
     
    })
    .catch(err => {console.log('error', err)
      Alert.alert('Invalid','Current Password')
    })
  } 
  
  }


//-------------Sign-out function---------------
  function userSignOut(){
  
    
    Auth.signOut()
      .then((data) => {
          console.log(data) 
          //Alert.alert("data", data) 
          setAuthentication(false)
        })

      .catch(err => {
        console.log(err) 
        Alert.alert("Logout error!!", err)
      });
  
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
                // 
                'https://imgur.com/t/earth_day/3SOrwqu'
              }}
            showEditButton
        />
          <Text style = {{alignSelf: 'center', fontSize: 25, marginBottom: 20}}>
              Change Password 
          </Text>

          <Text style = {{alignSelf: 'center'}}>
              Current Password
          </Text>

          <TextInput 
          onChangeText=
          {value=> onChange_new('currentPassword', value)}
          
          style = {styles.textInput}>
          </TextInput >

          <Text style = {{alignSelf: 'center'}}> 
            New Password
          </Text>

          <TextInput  
          onChangeText={value=> onChange_new('newPassword', value)} 
          style = {styles.textInput}>
          </TextInput>

          <TouchableOpacity  title = 'Change Password' 
              onPress = {() => changePassword(userInfo.currentPassword, userInfo.newPassword) }
              style = {styles.button} 
            > 

            <Text 
              style = {styles.text}>
                Change Password
            </Text>  

          </TouchableOpacity>

      
          <TouchableOpacity
            style ={styles.button_signout}       
            onPress={() => {userSignOut()}}
          >
            <Text
            style={styles.text}
            > SIGN OUT </Text>
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
  text: {textAlign: 'center', 
  textAlignVertical: 'center', color: '#FFFF', 
  fontWeight: 'bold' },
  container: {
    flex: 1,
    backgroundColor: '#8baab5',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#ffff",
  },
  textInput: {
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
  button: {backgroundColor: "#bdc667",margin: 5, 
  color: 'yellow', borderWidth: 1, borderColor: '#2196F3', 
  height: 50, width: 140, alignSelf: 'center', 
  justifyContent: 'center', borderRadius: 6},

  button_signout: {backgroundColor: "#03A9F4",margin: 5, 
  color: 'yellow', borderWidth: 1, borderColor: '#2196F3', 
  height: 50, width: 140, alignSelf: 'center', 
  justifyContent: 'center', borderRadius: 6, marginTop: 100}

})
//Export----------------------------------------------------
export default Profile;
