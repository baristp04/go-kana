import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import LetterCard from "../../components/Alphabet/LetterCard";
import { letterProps } from "../../components/Alphabet/types";
import { useRoute } from "@react-navigation/native";
import config from "../../config";
import styles from "./styles";

const Dictionary = () => {
    const route = useRoute();
    const { dataType, isCombinationAllowed } = route.params as {
        dataType: "hiragana" | "katakana"
        isCombinationAllowed: boolean;
    };

    const [letterData, setLetterData] = useState<letterProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
            const fetchKanaData = async () => {
                try {
                    setIsLoading(true);
                    setError(null);

                    // BASE_URL from config
                    const endpoint = `${config.BASE_URL}/api/kana?alphabet=${dataType}&combinations=${isCombinationAllowed}`;

                    const response = await fetch(endpoint);     
                
                if (!response.ok) {
                    throw new Error("Failed to fetch data from the server");
                }

                const json = await response.json();
                setLetterData(json.data); 
                
            } catch (err) {
                console.error("API Error: ", err);
                setError("Could not connect to the server. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchKanaData();
    }, [dataType, isCombinationAllowed]);

    const renderLetter = ({ item }: { item: letterProps }) => <LetterCard japanese={item.japanese} romaji={item.romaji} />

    if (isLoading) {
        return (
            <View style={[styles.dictionaryContainer, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#9a1750" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.dictionaryContainer, { justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ color: "#9a1750", fontWeight: "bold" }}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.dictionaryContainer}>
            <FlatList
                data={letterData}
                renderItem={renderLetter}
                numColumns={3}
                key="3-columns"
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