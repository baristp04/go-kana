import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import basicHiragana from "../../data/basic-hiragana.json";
import basicKatakana from "../../data/basic-katakana.json";
import fullHiragana from "../../data/hiragana.json"
import fullKatakana from "../../data/katakana.json"
import Button from "../../components/Button/Button";
import styles from "./Quiz.styles";
import database from '@react-native-firebase/database';
import auth from "@react-native-firebase/auth";
import onDisableBack from "../../hooks/disableBackPress";
import onHideBottoMTab from "../../hooks/hideBotttomTab";

const QuizPage = () => {

    const userUid = auth().currentUser?.uid;

    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async () => {
            if (userUid) {
                try {
                    const snapshot = await database()
                        .ref(`users/${userUid}/streak`)
                        .once("value");

                    const savedStreak = snapshot.val() || 0;
                    setStreak(savedStreak);
                    console.log("Fetched streak:", savedStreak);
                } catch (error) {
                    console.log("Error fetching streak:", error);
                }
            }
        });

        return () => unsubscribe();
    }, [userUid]);

    const baseTabBarStyle = {
        backgroundColor: '#9a1750',
    }

    onDisableBack();
    onHideBottoMTab(baseTabBarStyle);

    const route = useRoute();
    const { dataType, isCombinationAllowed } = route.params as {
        dataType: "hiragana" | "katakana"
        isCombinationAllowed: boolean;
    };
    const letterData = dataType === "hiragana" ?
        (isCombinationAllowed ? fullHiragana : basicHiragana) :
        (isCombinationAllowed ? fullKatakana : basicKatakana);
    const randomIndex = Math.floor(Math.random() * letterData.length);


    const [count, setCount] = useState(0);
    const [input, setInput] = useState("");
    const [currentIndex, setCurrentIndex] = useState(randomIndex);
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const setRandomLetter = () => {

        const newIndex = Math.floor(Math.random() * letterData.length);
        setCurrentIndex(newIndex);
    }

    const [previousElement, setPreviousElement] = useState(letterData[currentIndex]);

    const onSubmit = async (input: string) => {
        if (input.toLowerCase() === letterData[currentIndex].romaji) {
            try {
                setSubmitted(true);

                const newStreak = streak + 1
                setStreak(newStreak)
                await database().ref(`users/${userUid}`).update({
                    streak: newStreak,
                });
                setCount(count + 1);
                setError(false)
            } catch (e) {
                console.log("Couldn't find user:", e)
            }
        }
        else {
            try {
                setSubmitted(true);
                setStreak(0)
                await database().ref(`users/${userUid}`).update({
                    streak: 0,
                });
                setError(true)
            } catch (e) {
                console.log("Couldn't find user:", e)
            }
        }
        setPreviousElement(letterData[currentIndex]);
        setInput("");
        setRandomLetter();

    }

    const onResetStreak = async () => {
        try {
            setStreak(0)
            await database().ref(`users/${userUid}`).update({
                streak: 0,
            });
        } catch (e) {
            console.log("Couldn't reset streak:", e)
        }

    }

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>{dataType === "hiragana" ? "Hiragana Quiz" : "Katakana Quiz"}</Text>
            <View style={styles.innerContainer}>
                <Text style={styles.counter}> Correct Answers: {count}</Text>
                <View style={styles.japaneseLetterContainer}>
                    <Text style={styles.japanese}>{letterData[currentIndex].japanese}</Text>
                </View>
            </View>
            <View>
                <TextInput
                    value={input}
                    onChangeText={(input) => setInput(input.toLowerCase())}
                    placeholder="Type the romaji"
                    style={styles.inputContainer} />
            </View>
            <View style={styles.buttonContainer}>
                <Button label="Submit" press={() => onSubmit(input)} />
            </View>
            {submitted && (
                error
                    ? <Text style={styles.notificationText} >Incorrect! Answer was {previousElement.romaji}</Text>
                    : <Text style={styles.notificationText}>Correct!</Text>
            )}
            <Text style={styles.streakText}> Correct Answer Streak: {streak}</Text>
            <View style={styles.resetContainer}>
                <Button label="End Streak" press={onResetStreak} />
            </View>

        </View>
    )
}

export default QuizPage;