// Lavindu Devadithya

import * as React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { ProgressBar } from 'react-native-paper'

const StateDataScreen = ({ navigation, route }) => {
    //if coming from search (in other words only 1 argument)
    if (Object.keys(route.params).length === 1) {
        const [isLoading, setLoading] = useState(true) //might be able to delete this
        const [data, setData] = useState({})

        const getData = async () => {
            try {
                const response = await fetch('https://api.covidactnow.org/v2/state/' + route.params.stateName + 
                                                                '.json?apiKey=721986277dca400bbbc8519b9ed4054a')
                const json = await response.json()
                setData(json)
            }
            catch (error) {
                Alert.alert(
                    "Error",
                    "Invalid state name",
                    [
                        {
                            text: "OK"
                        }
                    ]
                )

                navigation.navigate('Home')
                //scroll view is never rendered
            }
            finally {
                setLoading(false)
            }
        }

        useEffect(() => {
            getData()
        }, [])

        const renderProgressBar = () => {
            return (
                <ProgressBar progress={0.5} color='#FF0F00' />
            )
        }

        return (
            <View>
                {isLoading ? renderProgressBar() : (
                    <View>
                        <Text style={styles.title}>Data about {route.params.stateName}</Text>
                        <Text>Cases: {data.actuals.cases}</Text>
                        <Text>Deaths: {data.actuals.deaths}</Text>
                        <Text>New cases: {data.actuals.newCases}</Text>
                        <Text>New deaths: {data.actuals.newDeaths}</Text>
                        <Text>Population: {data.population}</Text>
                    </View>
                )}
            </View>
        )
    }

    else {
        return (
            <View>
                <Text style={styles.title}>Data about {route.params.stateName}</Text>
                <Text>Cases: {route.params.cases}</Text>
                <Text>Deaths: {route.params.deaths}</Text>
                <Text>New cases: {route.params.newCases}</Text>
                <Text>New deaths: {route.params.newDeaths}</Text>
                <Text>Population: {route.params.population}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    }
})

export default StateDataScreen