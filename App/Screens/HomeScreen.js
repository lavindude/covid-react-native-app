// Lavindu Devadithya

import * as React from 'react'
import { useState, useEffect } from 'react'
import { Text, View, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { strings } from '../Constants/lang'
import { Input } from 'react-native-elements'

const HomeScreen = ({ navigation }) => {
    const [state, setState] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [connectionIssue, setConnectionIssue] = useState(false)

    //this function gets all COVID data for all states in the US
    const getData = async () => {
        try {
            const response = await fetch('https://api.covidactnow.org/v2/states.json?apiKey=721986277dca400bbbc8519b9ed4054a')
            const json = await response.json()
            setData(json)
        }
        catch (error) {
            setConnectionIssue(true)
        }
        finally {
            if (!connectionIssue) {
                setLoading(false)
            }

            else { //display an alert if API call fails
                Alert.alert(
                    strings.error,
                    strings.check_connection,
                    [
                        {
                            text: strings.ok
                        }
                    ]
                )
            }
        }
    }

    useEffect(() => {
        getData();
    }, [])

    // made a custom component for the list items in the home screen
    const StateComponent = (data) => {
        const sendData = { //args passed into state_data screen
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
                    onPress={() => navigation.navigate(strings.state_data, sendData)}  
                >
                    <Text style={styles.title}>{data.item.state}</Text>
                    <Text>{strings.cases} {data.item.actuals.cases}</Text>
                    <Text>{strings.deaths} {data.item.actuals.deaths}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.body}>
            <Input
                onChangeText={(text) => {
                    setState(text)
                }}
                placeholder={strings.enter_state}
                placeholderTextColor={"#007000"}
                style={styles.input}
            />
            <Button
                title={strings.search}
                onPress={() => navigation.navigate('State Data', {stateName: state.toUpperCase()})}
                style={styles.button}
            />
            {isLoading ? <Text>{strings.waiting}</Text> : (
                <FlatList data={data} renderItem={StateComponent} style={styles.list}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#39c673"
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    input: {
        place: "#000000"
    },
    info_box: {
        borderWidth: 1,
        borderColor: '#000000'
    }
})

export default HomeScreen