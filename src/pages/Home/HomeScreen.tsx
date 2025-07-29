import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Button from "../../components/Button/Button";
import { getAuth, signOut } from '@react-native-firebase/auth';
import styles from "./Home.styles"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {

    const navigation = useNavigation<NavigationProp>();
    const title: string = "Welcome To GoKana!"

    const handleLogOut = () => {
        signOut(getAuth()).then(() => {
            return console.log("user signed out");
        })
    }

    return (
        <View style={styles.homeContainer}>
            <Text style={styles.title}> {title} </Text>
            <View style={styles.buttonWrapper}>
                <Button
                    press={() => navigation.navigate("DictionaryScreen",{ dataType: "hiragana" })}
                    label="Learn Hiragana"
                     />
                <Button
                    press={() => navigation.navigate("DictionaryScreen",{ dataType: "katakana" })}
                    label="Learn Katakana"
                     />
                <Button
                    press={handleLogOut}
                    label="Log Out"/>
            </View>
        </View>
    );
};

export default Home;