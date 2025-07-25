import React from "react";
import { View, Text } from "react-native";
import { loadFromAsyncStorage } from "../state/AsyncStorage";

const Statistics = () => {

    const loadValue = async (state: string) => {
        return await loadFromAsyncStorage(state)
    }

    const userName = loadValue("auth")
    const streak = loadValue("counter")

    return(
        <View>
            <Text style = {{color:"red",fontSize:30,textAlign:"left"}}>Username: {userName} </Text>
            <Text style = {{color:"red",fontSize:30,textAlign:"left"}}>User Streak: {streak} </Text>
        </View>
    )
}
export default Statistics; 