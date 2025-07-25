import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#e3e2df",
        flex: 1,
        justifyContent: "center",
    },
    loginText: {
        textAlign: "center",
        fontSize: 40,
    },
    registerText: {
        textAlign: "center",
        fontSize: 40,
    },
    inputContainer: {
        backgroundColor: "#E3AFBC",
        margin: 8,
        alignContent: "center",
        padding: 10,
        borderRadius: 10,
        marginBottom: 9,
    },
    buttonContainer: {
        margin: 8,
        alignContent: "center",
    },
    passwordMatchSuccess: {
        color: "#ee4c7c",
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center"
    },
    passwordMatchFail: {
        color: "#9a1750",
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center"
    }
});

export default styles;