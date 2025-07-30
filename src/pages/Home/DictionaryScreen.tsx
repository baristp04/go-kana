import React from "react";
import { View, FlatList } from "react-native";
import LetterCard from "../../components/Alphabet/LetterCard";
import { letterProps } from "../../components/Alphabet/types";
import { useRoute } from "@react-navigation/native";
import basicHiragana from "../../data/basic-hiragana.json";
import basicKatakana from "../../data/basic-katakana.json";
import fullHiragana from "../../data/hiragana.json"
import fullKatakana from "../../data/katakana.json"

const Dictionary = () => {

    const route = useRoute();
    const { dataType, isCombinationAllowed } = route.params as {
        dataType: "hiragana" | "katakana"
        isCombinationAllowed: boolean;
    };
    const letterData = dataType === "hiragana" ? 
    (isCombinationAllowed ? fullHiragana : basicHiragana) : 
    (isCombinationAllowed ? fullKatakana : basicKatakana);

    const renderLetter = ({ item }: { item: letterProps }) => <LetterCard japanese={item.japanese} romaji={item.romaji} />

    return (
        <View>
            <FlatList
                data={letterData}
                renderItem={renderLetter}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: "space-between" }}
            />

        </View>
    );
};

export default Dictionary;