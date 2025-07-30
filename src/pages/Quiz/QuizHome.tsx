import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button/Button";
import styles from "./Quiz.styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const QuizHome = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.homeContainer}>
            <Text style={styles.title}> Which Quiz Do You Want To Take?</Text>
            <View style={styles.buttonWrapper}>
                <Button
                    press={() => { navigation.navigate("QuizScreen", { dataType: "hiragana" }) }}
                    label="Hiragana Quiz"
                    japanese = "ひらがな くいず"
                />
                <Button
                    press={() => { navigation.navigate("QuizScreen", { dataType: "katakana" }) }}
                    label="Katakana Quiz"
                    japanese="カタカナ クイズ"
                />
            </View>

        </View>
    )
}
export default QuizHome; 