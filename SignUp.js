import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native'
import Dialog, { DialogContent } from 'react-native-popup-dialog'

import { Auth } from 'aws-amplify';


export default function SignUpPage() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    phone_number: '',
    email: '',
    name: '',
    confirmationCode: ''
  });

  const onChangeText = (key, value) => {
    setUserInfo({...userInfo, [key]: value})
};
//sign-up alerts--------------------------------------------------
  const signUp = () => {
    if(!userInfo.username || !userInfo.password || !userInfo.email || !userInfo.phone_number 
      || !userInfo.name )
      {
        Alert.alert('Missing fields', 'Please fill in all fields in the form')
      }
      else if( !validateEmail(userInfo.email)){ console.log('entered else if')
      Alert.alert('Please enter valid email','')}
      else if(userInfo.password.length < 4 ){
        Alert.alert('Please enter password longer than 4', 'Requires letter and numbers')
      }
      else if(!validatePhoneNumber(userInfo.phone_number)){
        Alert.alert('Invalid phone number','Please enter valid 10 or 11 digit number.')
      }

      else{ 

//sign up Authentication-------------------------------------
    Auth.signUp({
      username: userInfo.username,
      password: userInfo.password,
      attributes:{
        email: userInfo.email,
        phone_number: userInfo.phone_number,
        name: userInfo.name
      }
    })

  
//sign up messages--------------------------------------------------
    .then(() => {console.log('success') 
      Alert.alert('email confirmation', 'Please check email box for confirmation code')
      } )

    .catch(err => {console.log('error', err)
        Alert.alert('User Already Exists', ' Please try a new user')
  })
      }    
  } 
//Validate email and phone number--------------------------------
  function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  }

  function validatePhoneNumber(number){
  
    var phonePattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/  
    return phonePattern.test(number)
    //return true
    }
//Confirm sign-up---------------------------------------
  const confirmSignUp = () => {

    if(!userInfo.username || !userInfo.password || !userInfo.email || !userInfo.phone_number 
      || !userInfo.name || !userInfo.confirmationCode)
      {
        Alert.alert('Missing Confirmation Code', 'Please fill in code field ')
      }
      else if( !validateEmail(userInfo.email)){ console.log('entered else if')
      Alert.alert('Please enter valid email','')}
      else{

      Auth.confirmSignUp(userInfo.username, userInfo.confirmationCode)


    .then(() => {
      console.log('success')
      Alert.alert('Sign-up Successful','Please go to sign-in page')
      console.log(userInfo);
    })
    .catch(err => {console.log('error', err)
      Alert.alert('Sign-up code error',err)
  
  })
}//else

  }

  //Returns---------------------------------------
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./assets/icon.png')}
          resizeMode = {'contain'}
        />
        <TextInput
        onChangeText={value=> onChangeText('username', value)}
        style={styles.input}
        placeholder='username'
        />
        <TextInput
        onChangeText={value=> onChangeText('password', value)}
        secureTextEntry={true}
        style={styles.input}
        placeholder='password'
        />
        <TextInput
        onChangeText={value=> onChangeText('email', value)}
        style={styles.input}
        placeholder='email'
        />
         <TextInput
        onChangeText={value=> onChangeText('phone_number', value)}
        style={styles.input}
        placeholder='phone'
        />
        <TextInput
        onChangeText={value=> onChangeText('name', value)}
        style={styles.input}
        placeholder='name'
        />

        <Button 
          color= '#FFFF'
          
          fontWeight= 'bold'
          title='sign up' 
          onPress={signUp}
        />


        <TextInput
        
          onChangeText={value=> onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder='code'
        />

        <Button 
          
          color= '#FFFF'
          title='confirm sign up' 
          onPress={confirmSignUp}
        />

      </View>
    );
  }

//export default withAuthenticator(App, { includeGreetings: true })


//Styles---------------------------------------
const styles = StyleSheet.create({
  input: {
    height: 35,
    borderWidth: 1,
    borderColor: '#3b1f2b',
    margin: 23,
    marginTop: 1,
    borderRadius: 3,
    textAlign: 'center',
    fontSize: 25,
    color: '#FFFF',
    //fontFamily: 'Times New Roman',
    fontWeight: 'bold',


  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8baab5',
    justifyContent: 'center',
  },
  logo: {
    width: 175, 
    height: 175, 
    alignSelf: 'center' 
  }
});