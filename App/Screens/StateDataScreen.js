// Lavindu Devadithya

import * as React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { ProgressBar } from 'react-native-paper'
import { strings } from '../Constants/lang'

const StateDataScreen = ({ navigation, route }) => {
    //if coming from search (in other words only 1 argument)
    if (Object.keys(route.params).length === 1) {
        const [isLoading, setLoading] = useState(true) //might be able to delete this
        const [data, setData] = useState({})

        //get data for a specific state
        const getData = async () => {
            try {
                const response = await fetch('https://api.covidactnow.org/v2/state/' + route.params.stateName + 
                                                                '.json?apiKey=721986277dca400bbbc8519b9ed4054a')
                const json = await response.json()
                setData(json)
            }
            catch (error) {
                Alert.alert(
                    strings.error,
                    strings.state_screen_error_msg,
                    [
                        {
                            text: strings.ok
                        }
                    ]
                )

                navigation.navigate('Home') //scroll view is never rendered, navigates right away back to home
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
            <View style={styles.body}>
                {isLoading ? renderProgressBar() : (
                    <View>
                        <Text style={styles.title}>{strings.data_about} {route.params.stateName}</Text>
                        <Text>{strings.cases} {data.actuals.cases}</Text>
                        <Text>{strings.deaths} {data.actuals.deaths}</Text>
                        <Text>{strings.new_cases} {data.actuals.newCases}</Text>
                        <Text>{strings.new_deaths} {data.actuals.newDeaths}</Text>
                        <Text>{strings.population} {data.population}</Text>
                    </View>
                )}
            </View>
        )
    }

    /* if coming from StateComponent item (in other words, all args are already 
        passed so no need for another API call):
    */
    else {
        return (
            <View style={styles.body}>
                <Text style={styles.title}>{strings.data_about} {route.params.stateName}</Text>
                <Text>{strings.cases} {route.params.cases}</Text>
                <Text>{strings.deaths} {route.params.deaths}</Text>
                <Text>{strings.new_cases} {route.params.newCases}</Text>
                <Text>{strings.new_deaths} {route.params.newDeaths}</Text>
                <Text>{strings.population} {route.params.population}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
})

export default StateDataScreen