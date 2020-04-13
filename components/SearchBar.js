import React from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import {Feather} from '@expo/vector-icons'

const SearchBar = ({term, onTermChange}) => {

    return(
        <View style= {styles.backgroundStyle}>
            <Feather name='search' style={styles.iconStyle}/>
            <TextInput
                style= {styles.inputStyle}
                placeHolder = 'search'
                value = {term}
                onChangeText = {newTerm = onTermChange(newTerm)}
            
            />

        </View>

    )
}

const styles = StyleSheet.create({
    backgroundStyle:{
        flex: 1,
        flexDirection: 'column',
        height: 50,
        borderRadius: 5,
        backgroundColor: '#8baab5',
        justifyContent: 'center',
        flexDirection: 'row'

    },

    inputStyle: {
        flex: 1,
        fontSize: 20,
    },

    iconStyle: {
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 15,

    }


})

export default SearchBar