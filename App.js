
import React, {useState} from 'react';
//AWS


import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

import MainTabs from './components/MainTabs'
import { Analytics } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
Analytics.disable();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
         <div>
           <MainTabs/>
         </div> 
      )
  }
}
export default withAuthenticator(App, {
  // Render a sign out button once logged in
  includeGreetings: true, 
  // Show only certain components
  authenticatorComponents: [MainTabs],
  
});