import * as React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, Button, StyleSheet, FlatList } from 'react-native'
import { placeholders } from '../Constants/lang'
import { Input } from 'react-native-elements'
import StateComponent from '../Components/StateComponent'

const HomeScreen = ({ navigation }) => {
    const [state, setState] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const response = await fetch('https://api.covidactnow.org/v2/states.json?apiKey=721986277dca400bbbc8519b9ed4054a')
            const json = await response.json()
            setData(json)
        }
        catch (error) {
            console.log(error) //display an error message
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData();
    }, [])

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
            {isLoading ? <Text>Waiting</Text> : (
                <FlatList data={data} renderItem={StateComponent} />
            )}
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