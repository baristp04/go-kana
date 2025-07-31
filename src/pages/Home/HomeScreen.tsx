import React, { useState } from "react";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Button from "../../components/Button/Button";
import styles from "./Home.styles"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {
    const navigation = useNavigation<NavigationProp>();
    const [combinationAllowed, setCombinationAllowed] = useState(false)

    return (
        <View style={styles.homeContainer}>
            <Text style={styles.title}> Which Kana Would You Like To Learn? </Text>
            <View style={styles.buttonWrapper}>
                <Button
                    press={() => navigation.navigate("DictionaryScreen", { dataType: "hiragana", isCombinationAllowed: combinationAllowed })}
                    label="Learn Hiragana"
                    japanese="ひらがな を まなぶ"
                />
                <Button
                    press={() => navigation.navigate("DictionaryScreen", { dataType: "katakana", isCombinationAllowed: combinationAllowed })}
                    label="Learn Katakana"
                    japanese="カタナ ヲ マナブ"
                />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "medium", fontSize: 14 }}> Allow Combinations For Each Alphabet</Text>
                    <Checkbox
                        status={combinationAllowed ? "checked" : "unchecked"}
                        onPress={() => { setCombinationAllowed(!combinationAllowed) }}
                        color="#9a1750"
                    />
                </View>
            </View>

        </View>
    );
};

export default Home;