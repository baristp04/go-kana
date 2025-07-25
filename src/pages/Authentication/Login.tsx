import React, { useState } from "react";
import { View, Text, TextInput,Alert } from "react-native"
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Button from "../../components/Button/Button";
import styles from "./styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AuthHome = () => {
    const navigation = useNavigation<NavigationProp>();

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const isFormValid = () => {
        return (
            userEmail.trim() !== "" &&
            userPassword.trim() !== "" &&
            userEmail.includes("@")
        );
    };

    const handleLogin = async () => {

        if (!isFormValid()) {
            Alert.alert("Error", "Please enter a valid email and password.");
            return;
        }

        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(getAuth(), userEmail, userPassword)
        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Error', 'No user found with this email.');
            } else if (error.code === 'auth/wrong-password') {
                Alert.alert('Error', 'Incorrect password.');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'Invalid email format.');
            } else if (error.code === 'auth/user-disabled') {
                Alert.alert('Error', 'This account has been disabled.');
            } else {
                Alert.alert('Error', 'Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Welcome!</Text>
            <View>
                <TextInput
                    placeholder="Email"
                    value={userEmail}
                    onChangeText={(text) => setUserEmail(text)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.inputContainer} />

                <TextInput
                    placeholder="Password"
                    value={userPassword}
                    onChangeText={(text) => setUserPassword(text)}
                    secureTextEntry
                    style={styles.inputContainer} />
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    label="Login"
                    press={handleLogin} />
                <Button
                    label="Create An Account"
                    press={() => navigation.navigate("RegisterationScreen")} />
            </View>

        </View>
    )
}

export default AuthHome
