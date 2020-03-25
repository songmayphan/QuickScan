
import React, { useState } from 'react';
//AWS


// import Amplify from '@aws-amplify/core'
// import config from './aws-exports'
// Amplify.configure(config)

import MainTabs from './components/MainTabs'
//import { Analytics } from 'aws-amplify';
 import { Authenticator } from 'aws-amplify-react-native';
// Analytics.disable();
import App from '/.App.js'
import { View } from 'react-native-animatable';

class AppWithAuth extends Component {
    render(){
      return (
        <View>
        <Authenticator>
          <App />
        </Authenticator>
        </View>
      );
    }
  }
  
  export default AppWithAuth;