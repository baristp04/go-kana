import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: "#e3e2df",
        justifyContent: "flex-end",
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 30,
        marginTop: 30,
        justifyContent: "flex-start"
    },
    buttonWrapper: {
        padding: 10,
        marginBottom: 24,
    },

    pageContainer: {
        flex: 1,
        backgroundColor: "#e3e2df",
        alignContent: "center",
    },
    japaneseLetterContainer: {
        width: 150,
        height: 150,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "#9a1750",
        borderRadius: 10,
        borderWidth: 5,
    },
    pageTitle: {
        textAlign: "center",
        fontSize: 30,
        marginTop: 30,
        justifyContent: "flex-start"
    },
    innerContainer: {
        flex: 1, 
        justifyContent: "flex-end", 
        alignItems: "center", 
        marginBottom: 40,
    },
    counter: {
        fontSize: 22,
        textAlign: "center",
        paddingBottom: 28,
    },
    japanese: {
        textAlign: "center",
        fontSize: 80,
        paddingBottom: 16,
    },
    inputContainer: {
        backgroundColor: "#E3AFBC",
        padding: 10,
        borderRadius: 10,
        fontSize: 18,
        alignSelf: "center",
        width: "80%",
        textAlign: "center",
        marginBottom: 16,
    },
    buttonContainer: {
        flex: 1,
        width: "80%",
        alignSelf: "center",
    },
    resetContainer: {
        width: "80%",
        alignSelf: "center",
        marginBottom: 20,
    },
    notificationText: {
        textAlign: "center",
        fontSize: 20,
        margin: 10,
    },
    streakText: {
        textAlign: "center",
        fontSize: 20,
        margin: 10,
        paddingBottom: 28,
    },
});

export default styles;
