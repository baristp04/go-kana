import React from "react";
import { View, FlatList } from "react-native";
import LetterCard from "../../components/Alphabet/LetterCard";
import { letterProps } from "../../components/Alphabet/types";
import { useRoute } from "@react-navigation/native";
import hiraganaData from "../../data/basic-hiragana.json";
import katakanaData from "../../data/katakana.json";

const Dictionary = () => {

    const route = useRoute();
    const { dataType } = route.params as { dataType: "hiragana" | "katakana" };
    const letterData = dataType === "hiragana" ? hiraganaData : katakanaData;

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