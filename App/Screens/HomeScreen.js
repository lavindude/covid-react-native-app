import * as React from 'react'
import { useState } from 'react'
import { View, Text, Button } from 'react-native'
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
            />
            <Text>Hello</Text>
            <Button
                title="TestBtn"
                onPress={() => navigation.navigate('State Data')}
            />
        </View>
    )
}

export default HomeScreen