import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native'

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

  const signUp = () => {
    Auth.signUp({
      username: userInfo.username,
      password: userInfo.password,
      attributes:{
        email: userInfo.email,
        phone_number: userInfo.phone_number,
        name: userInfo.name
      }
    })
    .then(() => console.log('success'))
    .catch(err => console.log('error', err))

  }

  const confirmSignUp = () => {
    Auth.confirmSignUp(userInfo.username, userInfo.confirmationCode)
    .then(() => {
      console.log('success')
      console.log(userInfo);
    })
    .catch(err => console.log('error', err))
  }
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
    backgroundColor: '#5f758e',
    justifyContent: 'center',
  },
  logo: {
    width: 175, 
    height: 175, 
    alignSelf: 'center' 
  }
});