import * as React from 'react'
import { useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { placeholders } from '../Constants/lang'
import { Input } from 'react-native-elements'

const HomeScreen = ({ navigation }) => {
    const [state, setState] = useState('')

    return (
        <View>
            <Input
                onChangeText={(text) => {
                    setState(text)
                }}
                placeholder={placeholders.enter_state}
                style={styles.input}
            />
            <Button
                title="Search"
                onPress={() => navigation.navigate('State Data', {state_name: state})}
                style={styles.button}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {

    },
    button: {
        
    }
})

export default HomeScreen