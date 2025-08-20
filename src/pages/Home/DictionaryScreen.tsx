import React from "react";
import { View, FlatList } from "react-native";
import LetterCard from "../../components/Alphabet/LetterCard";
import { letterProps } from "../../components/Alphabet/types";
import { useRoute } from "@react-navigation/native";
import basicHiragana from "../../data/basic-hiragana.json";
import basicKatakana from "../../data/basic-katakana.json";
import fullHiragana from "../../data/hiragana.json"
import fullKatakana from "../../data/katakana.json"
import styles from "./styles";

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
        <View style = {styles.dictionaryContainer}>
 <FlatList
                data={letterData}
                renderItem={renderLetter}
                numColumns={3}
                key="3-columns" // Force re-render when numColumns changes
                columnWrapperStyle={{ 
                    justifyContent: "space-between",
                    marginBottom: 12,
                    paddingHorizontal: 5
                }}
                contentContainerStyle={{
                    paddingVertical: 10,
                    flexGrow: 1
                }}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                showsVerticalScrollIndicator={false}
                bounces={true}
                removeClippedSubviews={true}
                maxToRenderPerBatch={15}
                windowSize={10}
                initialNumToRender={12}
            />

        </View>
    );
};

export default Dictionary;