import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native'

import { Auth } from 'aws-amplify';
import {AuthenticationContext} from "./contexts/Authentication"

export default function SignInPage (){

 

  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    user: {},
    isAuthenticated: false,
    
  });


  const {setAuthentication} = useContext(AuthenticationContext)

  const onChangeText= (key, value) => {
      setUserInfo({...userInfo, [key]: value})
  };
  const signIn = () => {
    //console.log(userInfo.username, userInfo.password)
    Auth.signIn(userInfo.username, userInfo.password)
    .then(user => {
        setUserInfo({...userInfo, user: {user}, isAuthenticated: true});
        setAuthentication(true);
    })
    .then(() => {
      console.log(userInfo.isAuthenticated)
    })
    .catch(err => console.log('error', err))
  } ; 
    return (
      <View style={styles.container}>

        <View style = {{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'} }>
          
          <Image
            style={styles.logo}
            source={require('./assets/icon.png')}
            resizeMode = {'contain'}
            
          />
        </View>
       
      <View style = {{flex:1}}>
        <TextInput
        onChangeText={value=> onChangeText('username', value)}
        style={styles.input}
        placeholder='Enter your username'
        />
        <TextInput
        onChangeText={value=> onChangeText('password', value)}
        secureTextEntry={true}
        style={styles.input}
        placeholder='Enter your password'
        
        />

      <TouchableOpacity  title = 'sign in' onPress={signIn} style = 
        {{backgroundColor: "red",margin: 5, color: 'yellow', borderWidth: 1, borderColor: '#2196F3', height: 50, width: 140, alignSelf: 'center', justifyContent: 'center', borderRadius: 6}} > 
        <Text style = {{textAlign: 'center', textAlignVertical: 'center', color: '#2196F3' }}>Text here</Text>
      </TouchableOpacity >

      </View>
       
        

      </View>
    );
  }

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: '#2196F3',
    margin: 23,
    marginTop: 1,
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    //padding: 20,
    //lineHeight: 25,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
   
  }
});