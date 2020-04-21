import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import { withAuthenticator, Authenticator, SignIn } from 'aws-amplify-react-native'
import  {Auth}  from 'aws-amplify';
import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)
import MainTabs from './components/MainTabs';
export default class App extends React.Component {
  
//----------------------------------------SIGN in----------------------------

signIn() {
  const {username, password } = this.state
  Auth.signIn(username, password)
  .then(user => {
      this.setState({user});
      this.authenticate(true)
  })
  .catch(err => console.log('error', err))
} 
/////////////////////////////////////////////////////////
signUp() {
  Auth.signUp({
    username: this.state.username,
    password: this.state.password,
    attributes:{
      email: this.state.email,
      phone_number: this.state.phone_number,
      name: this.state.name
    }
  })
  .then(() => console.log('success'))
  .catch(err => console.log('error', err))

}

//
signOut() {
  Auth.signOut()
    .then(data => {console.log(data)
      this.authenticate(false)
    })

    .catch(err => console.log(err));
}
//----------------------------------------CONFIRM SIGN UP---------------------------------

confirmSignUp(){
  Auth.confirmSignUp(this.state.username, this.state.confirmationCode)
  .then(() => console.log('success'))
  .catch(err => console.log('error', err))
}
//----------------------------------------RENDER APP.JS---------------------------------

  render() {
    if (this.state.isAuthenticated) {
      console.log('Auth: ', Auth);
      return (
          <MainTabs/>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Welcome to QuickScan</Text>

        <TextInput
        onChangeText={value=> this.onChangeText('username', value)}
        style={styles.input}
        placeholder='Enter username'
        />
        <TextInput
        onChangeText={value=> this.onChangeText('password', value)}
        secureTextEntry={true}
        style={styles.input}
        placeholder='Enter password'
        />
        <TouchableOpacity  onPress={<SignIn/>}>
            <Text style = {styles.button}>
               SIGN IN
            </Text>
         </TouchableOpacity> 
         <Text style={{textAlign:'center', marginTop:10}}>Don't have an account?</Text>
         <TouchableOpacity onPress={this.signUp.bind(this)} >
  
            <Text style={styles.signup}> Sign Up</Text>

         </TouchableOpacity>
      </View>
    );
  }
}


//------------------------------------------------------------------
// The override prop tells the Authenticator that the SignUp component is not hidden but overridden
<Authenticator hideDefault={true}>
  <SignIn />
  <MyCustomSignUp override={'SignUp'}/> 
</Authenticator>

class MyCustomSignUp extends React.Component { 
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

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
    marginVertical: 10,
    padding: 15

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  text:{
    fontSize: 23,
    alignContent: 'center',
    
  },
  button: {
    borderWidth: 1,
    padding: 25,
    borderColor: 'black',
    justifyContent: "center",
    alignContent:"center",
    textAlign: "center",
    backgroundColor: "#2196F3",
    textDecorationColor: "#ffffff",
    
 },
 signup:{
   color: "#2196f3",
   fontSize: 16,
   alignContent:'center',
   textAlign:'center',
   marginTop: 12
 }
});


export default withAuthenticator(CustomizedApp);