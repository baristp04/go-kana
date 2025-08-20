import { StyleSheet,Dimensions } from "react-native";

const { height,width } = Dimensions.get("window");
const isSmall = height < 700;
const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: "#e3e2df",
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        marginTop: 30,
        justifyContent: "flex-start"
    },
    buttonWrapper: {
        flex:1,
        justifyContent:"center",
        padding: 10,
        marginBottom: 24,
    },

    pageContainer: {
        flex: 1,
        backgroundColor: "#e3e2df",
        alignContent: "center",
    },
    japaneseLetterContainer: {
        width: isSmall ? 120 : 150,
        height: isSmall ? 120 : 150,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "#9a1750",
        borderRadius: 10,
        borderWidth: isSmall ? 3 : 5,
    },
    pageTitle: {
        textAlign: "center",
        fontSize: isSmall ? 24 : 30,
        marginTop: isSmall ? 15 : 30,
        marginBottom: isSmall ? 10 : 0,
    },
    innerContainer: {
        flex: isSmall ? 0.6 : 1,
        justifyContent: "center", 
        alignItems: "center",
        minHeight: isSmall ? 150 : 200,
        paddingVertical: isSmall ? 10 : 20,
        maxHeight: isSmall ? height * 0.4 : height * 0.5,
    },
    bottomSection: {
        flex: isSmall ? 0.4 : 0,
        paddingHorizontal: 20,
        paddingBottom: isSmall ? 20 : 40,
        minHeight: isSmall ? 250 : 300,
        justifyContent: 'flex-start',
    },
    counter: {
        fontSize: isSmall ? 18 : 22,
        textAlign: "center",
        paddingBottom: isSmall ? 15 : 28,
    },
    japanese: {
        textAlign: "center",
        fontSize: isSmall ? 60 : 80,
        paddingBottom: isSmall ? 8 : 16,
    },
    inputContainer: {
        backgroundColor: "#E3AFBC",
        padding: isSmall ? 8 : 10,
        borderRadius: 10,
        fontSize: isSmall ? 16 : 18,
        alignSelf: "center",
        width: "80%",
        textAlign: "center",
        marginBottom: isSmall ? 12 : 16,
    },
    buttonContainer: {
        width: "80%",
        alignSelf: "center",
        marginBottom: isSmall ? 8 : 16,
    },
    resetContainer: {
        width: "80%",
        alignSelf: "center",
        marginBottom: isSmall ? 10 : 20,
    },
    notificationText: {
        textAlign: "center",
        fontSize: isSmall ? 16 : 18,
        margin: isSmall ? 5 : 10,
        minHeight: isSmall ? 20 : 25,
    },
    streakText: {
        textAlign: "center",
        fontSize: isSmall ? 16 : 18,
        margin: isSmall ? 5 : 8,
        paddingBottom: isSmall ? 5 : 8,
    },
});

export default styles;