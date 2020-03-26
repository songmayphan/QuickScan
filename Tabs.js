import 'react-native-gesture-handler';
import React from './node_modules/react';
import { NavigationContainer } from './node_modules/@react-navigation/native';
import { createBottomTabNavigator } from './node_modules/@react-navigation/bottom-tabs';


import SignUp from './SignUp'
import SignIn from './SignIn'

const SignInTab = createBottomTabNavigator();

function SignInTabs() {

        return (
          <NavigationContainer independent={true}>
            <SignInTab.Navigator>
            <SignInTab.Screen
              name="Sign In"
              component={SignIn}
            />
            <SignInTab.Screen
            name="Sign Up"
            component={SignUp}
            />
            </SignInTab.Navigator>
             </NavigationContainer>
      );
      }

export default SignInTabs