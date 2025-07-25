import React from "react";
import { View, Text} from "react-native";
import { letterProps } from "./types";
import styles from "./LetterCard.styles";

const LetterCard = (letter: letterProps) => {
    return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.japanese}> {letter.japanese} </Text>
                    <Text style={styles.romaji}>{letter.romaji}</Text>
                </View>
            </View>
    );
};

export default LetterCard;