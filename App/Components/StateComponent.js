import React from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet } from 'react-native'

const StateComponent = (data) => {
    console.log(data.item.state)
    return (
        <Text>{data.item.state}</Text>
    )
}

const StateComponentStyles = StyleSheet.create({

})

export default StateComponent