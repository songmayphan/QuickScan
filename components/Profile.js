import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//AWS
import { withAuthenticator } from 'aws-amplify-react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar, ListItem } from 'react-native-elements';


const Stack = createStackNavigator();

function HomeScreen() {

  
  
  return (
    

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8baab5', }}>
      <Text>Home Screen</Text>

    </View>
  );
}



//Profile class--------------------------------------------
function Profile() {
  
//create a new Date instance----------------------
const date = new Date()
const hours = date.getHours()


//Styling------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8baab5',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#ffff",
  },
});



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

      <View>

        <Avatar
            size="large"
            rounded
          
            
            source={{
              uri:
                'https://i.imgur.com/icikekY.jpg',
              }}
            //showEditButton
          />


            <Text style = {{textAlign: 'center', textAlignVertical: 'center', 
            color: '#383961', fontWeight: 'bold',  flex: 0, marginTop: 40, 
            fontWeight: 'bold', fontSize: 30, backgroundColor: '#8baab5'}}>


              {"\n"}
              {"\n"}
              Good {timeOfDay}! 
              {"\n"}
              {"\n"}
              It's currently {date.getHours()} o'clock!
              {"\n"}
              {"\n"}
          </Text>
     </View>
      
    );
  
}
export default Profile;

