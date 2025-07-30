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

    return (
        <View style={styles.homeContainer}>
            <Text style={styles.title}> Which Kana Would You Like To Learn? </Text>
            <View style={styles.buttonWrapper}>
                <Button
                    press={() => navigation.navigate("DictionaryScreen",{ dataType: "hiragana" })}
                    label="Learn Hiragana"
                    japanese = "ひらがな を まなぶ"
                     />
                <Button
                    press={() => navigation.navigate("DictionaryScreen",{ dataType: "katakana" })}
                    label="Learn Katakana"
                    japanese = "カタナ ヲ マナブ"
                     />
            </View>
        </View>
    );
};

export default Home;