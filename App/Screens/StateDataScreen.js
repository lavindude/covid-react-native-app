import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const StateDataScreen = ({ navigation, route }) => {
    return (
        <View>
            <Text>Data about {route.params.state_name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default StateDataScreen