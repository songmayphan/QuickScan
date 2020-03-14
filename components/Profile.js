import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//AWS
import { withAuthenticator } from 'aws-amplify-react-native'

//create a new Date instance----------------------
const date = new Date()
const hours = date.getHours()
//Styling------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#ffffff",
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

//Profile class--------------------------------------------
class Profile extends React.Component {
  render() {
    return (
      <View>
          <Text style={styles}>
            It's currently about {date.getHours()} o'clock!
            Good {timeOfDay}!
          </Text>
     </View>
      
    );
  }
}

export default withAuthenticator(Profile, { includeGreetings: true })

