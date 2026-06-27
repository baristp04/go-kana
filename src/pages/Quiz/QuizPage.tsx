import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import Button from "../../components/Button/Button";
import styles from "./Quiz.styles";
import onDisableBack from "../../hooks/disableBackPress";
import onHideBottoMTab from "../../hooks/hideBotttomTab";
import config from "../../config"; 

const QuizPage = () => {
    const baseTabBarStyle = { backgroundColor: '#9a1750' };
    onDisableBack();
    onHideBottoMTab(baseTabBarStyle);

    const route = useRoute();
    const { dataType, isCombinationAllowed } = route.params as {
        dataType: "hiragana" | "katakana";
        isCombinationAllowed: boolean;
    };

    const [isLoading, setIsLoading] = useState(true);
    const [streak, setStreak] = useState(0);
    const [count, setCount] = useState(0); 
    const [input, setInput] = useState("");
    const [currentJapanese, setCurrentJapanese] = useState("");
    
    const [feedback, setFeedback] = useState<{ show: boolean; isCorrect: boolean; message: string }>({
        show: false,
        isCorrect: false,
        message: ""
    });

    const getToken = async () => {
        const user = auth().currentUser;
        if (user) {
            return await user.getIdToken(); 
        }
        return null;
    };

    const fetchInitialData = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = await getToken();
            if (!token) return;

            const streakRes = await fetch(`${config.BASE_URL}/api/quiz/streak`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (streakRes.ok) {
                const streakData = await streakRes.json();
                setStreak(streakData.streak);
            }

            await fetchNextQuestion(token);
        } catch (error) {
            console.error("Başlangıç verileri alınırken hata:", error);
        } finally {
            setIsLoading(false);
        }
    }, [dataType, isCombinationAllowed]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const fetchNextQuestion = async (existingToken?: string | null) => {
        try {
            const token = existingToken || await getToken();
            const endpoint = `${config.BASE_URL}/api/quiz/generate?alphabet=${dataType}&combinations=${isCombinationAllowed}`;
            
            const response = await fetch(endpoint, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentJapanese(data.japanese); 
            }
        } catch (error) {
            console.error("Yeni soru alınırken hata:", error);
        }
    };

    const onSubmit = async () => {
        if (!input.trim()) return; 

        try {
            const token = await getToken();
            const response = await fetch(`${config.BASE_URL}/api/quiz/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    alphabet: dataType,
                    combinations: isCombinationAllowed,
                    japanese: currentJapanese,
                    user_answer: input, 
                }),
            });

            const data = await response.json();

            if (data.is_correct) {
                setCount(prev => prev + 1);
                setFeedback({ show: true, isCorrect: true, message: "Correct!" });
            } else {
                setFeedback({ 
                    show: true, 
                    isCorrect: false, 
                    message: `Incorrect! Answer was ${data.correct_answer}` 
                });
            }

            setStreak(data.new_streak);
            setInput(""); 
            
            await fetchNextQuestion(token);

        } catch (e) {
            console.error("Cevap gönderilirken hata:", e);
        }
    };

    const onResetStreak = async () => {
        try {
            const token = await getToken();
            const response = await fetch(`${config.BASE_URL}/api/quiz/reset-streak`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setStreak(data.new_streak); 
            }
        } catch (e) {
            console.error("Streak sıfırlanamadı:", e);
        }
    };

    if (isLoading) {
        return (
            <View style={[styles.pageContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#9a1750" />
            </View>
        );
    }

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>
                {dataType === "hiragana" ? "Hiragana Quiz" : "Katakana Quiz"}
            </Text>

            <View style={styles.innerContainer}>
                <Text style={styles.counter}> Correct Answers: {count}</Text>
                <View style={styles.japaneseLetterContainer}>
                    <Text style={styles.japanese}>{currentJapanese}</Text>
                </View>
            </View>
            
            <View style={styles.bottomSection}>
                <TextInput
                    value={input}
                    onChangeText={(text) => setInput(text.toLowerCase())}
                    placeholder="Type the romaji"
                    style={styles.inputContainer} 
                />

                <View style={styles.buttonContainer}>
                    <Button label="Submit" press={onSubmit} />
                </View>
                
                <Text style={styles.notificationText}>
                    {feedback.show && feedback.message}
                </Text>

                <Text style={styles.streakText}> Correct Answer Streak: {streak}</Text>

                <View style={styles.resetContainer}>
                    <Button label="End Streak" press={onResetStreak} />
                </View>
            </View>
        </View>
    );
};

export default QuizPage;