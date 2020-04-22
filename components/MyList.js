import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import List from './List.js'
import Compare from './Compare.js'

const Stack = createStackNavigator();

export default function MyList() {
  return (
    <Stack.Navigator
    >
      <Stack.Screen name="My To-Do List" component={List} />
      <Stack.Screen name="Compare" component={Compare}/>
    </Stack.Navigator>
  );

}
