// Lavindu Devadithya

import * as React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { placeholders } from '../Constants/lang'
import { Input } from 'react-native-elements'

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

    const StateComponent = (data) => {
        const sendData = {
            stateName: data.item.state,
            cases: data.item.actuals.cases,
            deaths: data.item.actuals.deaths,
            newCases: data.item.actuals.newCases,
            newDeaths: data.item.actuals.newDeaths,
            population: data.item.population
        }
    
        return (
            <View style={styles.info_box}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('State Data', sendData)}  
                >
                    <Text style={styles.title}>{data.item.state}</Text>
                    <Text>Cases: {data.item.actuals.cases}</Text>
                    <Text>Deaths: {data.item.actuals.deaths}</Text>
                </TouchableOpacity>
            </View>
        )
    }

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
                onPress={() => navigation.navigate('State Data', {stateName: state.toUpperCase()})}
                style={styles.button}
            />
            {isLoading ? <Text>Waiting</Text> : (
                <FlatList data={data} renderItem={StateComponent} style={styles.list}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    input: {

    },
    button: {
        
    },
    info_box: {
        borderWidth: 1,
        borderColor: '#000000'
    }
})

export default HomeScreen