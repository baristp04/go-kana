import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native"
import { TextInput } from "react-native-paper";
import Button from "../../components/Button/Button";
import { getAuth, createUserWithEmailAndPassword, signOut } from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { loadFromAsyncStorage } from "../../state/AsyncStorage";
import { setUserName } from "../../state/auth/authSlice";
import { setIsRegistering } from "../../state/auth/authSlice";
import { RootStackParamList } from '../types';
import styles from "./styles"

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Register = () => {
    const [userNames, setUserNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserNames = async () => {
            try {
                const snapshot = await database().ref("users").once("value");
                const users = snapshot.val() || {}
                const names: string[] = []
                Object.keys(users).forEach(userId => {
                    if (users[userId] && users[userId].userName) {
                        names.push(users[userId].userName)
                    }
                }
                )
                setUserNames(names)
            } catch (error) {
                console.log("Couldn't fetch user names:", error)
            }
        }
        fetchUserNames();
    }, [])

    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [nickName, setNickName] = useState("")
    const [password, setPassword] = useState("")
    const [mockPassword, setMockPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const isFormValid = () => {
        return (
            email.trim() !== "" &&
            password.trim() !== "" &&
            mockPassword.trim() !== "" &&
            password === mockPassword &&
            password.length >= 6 &&
            email.includes("@") &&
            !userNames.includes(nickName.trim())
        );
    };

    const handleNickName = (value: string) => {
        setNickName(value)
        dispatch(setUserName(value))
    }

    const handleSignIn = async () => {
        if (!isFormValid()) {
            Alert.alert("Error", "Please fill all fields correctly and ensure passwords match.");
            return;
        }

        setIsLoading(true)
        dispatch(setIsRegistering(true))

        try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password)
            const user = userCredential.user;

            await database().ref(`users/${user.uid}`).set({
                userName: nickName,
                streak: 0
            });

            await signOut(getAuth())
            navigation.navigate("LoginScreen")
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('This email is already in use!');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Invalid email format!');
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Password should be at least 6 characters!');
            } else {
                Alert.alert('Error', error.message);
            }
        } finally {
            setIsLoading(false)
            dispatch(setIsRegistering(false));
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.registerText}>Create Your Account</Text>
            <View>
                <TextInput
                    placeholder="Set Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.inputContainer}
                    mode="outlined"
                    outlineColor="#e3e2df"
                    activeOutlineColor="black" />
                <TextInput
                    placeholder="Set UserName"
                    value={nickName}
                    onChangeText={handleNickName}
                    autoCapitalize="none"
                    style={styles.inputContainer}
                    mode="outlined"
                    outlineColor="#e3e2df"
                    activeOutlineColor="black"
                    right={nickName != "" ? (
                        <TextInput.Affix
                            textStyle={styles.match}
                            text={userNames.includes(nickName.trim()) ? "User Name Is Already Taken" : "User Name Is Acceptable"} />
                    ) : null} />

                <TextInput
                    placeholder="Set Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    style={styles.inputContainer}
                    mode="outlined"
                    outlineColor="#e3e2df"
                    activeOutlineColor="black" />
                <TextInput
                    placeholder="Verify Password"
                    value={mockPassword}
                    onChangeText={(text) => { setMockPassword(text) }
                    }
                    secureTextEntry
                    style={styles.inputContainer}
                    mode="outlined"
                    outlineColor="#e3e2df"
                    activeOutlineColor="black"
                    right={(mockPassword != "") ? (
                        <TextInput.Affix
                            textStyle={styles.match}
                            text={mockPassword === password ? "Password Matches" : "Password Doesn't Match"} />
                    ) : null} />
            </View>
            <View style={styles.buttonContainer}>
                <Button label="Sign In" press={handleSignIn} disabled={!isFormValid() || isLoading} />
            </View>
        </View>
    )
}

export default Register;