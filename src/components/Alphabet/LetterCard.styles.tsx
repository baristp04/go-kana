import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e3e2df",
        alignItems:"center",
    },
    wrapper: {
        padding: 6,
        backgroundColor: "#9a1750",
        borderWidth: 4,
        borderRadius: 6,
        borderColor: "black",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 10,
        width: 120,
        height: 120,
    },
    japanese: {
        fontSize: 40,
        textAlign: "center",
        color:"black",
    },
    romaji: {
        fontSize: 20,
        textAlign: "center",
        color: "black",
        width: "100%",
        includeFontPadding: false,
    }
});

export default styles;