import React, { useState } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button/Button";
import { Checkbox } from "react-native-paper";
import styles from "./Quiz.styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const QuizHome = () => {
    const navigation = useNavigation<NavigationProp>();
    const [combinationAllowed, setCombinationAllowed] = useState(false)

    return (
        <View style={styles.homeContainer}>
            <Text style={styles.title}> Which Quiz Do You Want To Take?</Text>
            <View style={styles.buttonWrapper}>
                <Button
                    press={() => { navigation.navigate("QuizScreen", { dataType: "hiragana", isCombinationAllowed: combinationAllowed }) }}
                    label="Hiragana Quiz"
                    japanese="ひらがな くいず"
                />
                <Button
                    press={() => { navigation.navigate("QuizScreen", { dataType: "katakana", isCombinationAllowed: combinationAllowed }) }}
                    label="Katakana Quiz"
                    japanese="カタカナ クイズ"
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
    )
}
export default QuizHome; 