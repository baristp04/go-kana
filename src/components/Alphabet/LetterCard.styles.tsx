import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e3e2df",
        alignItems: "center",
    },
    wrapper: {
        width: (width - 60) / 3,
        height: (width - 60) / 3,
        backgroundColor: "#9a1750",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    japanese: {
        fontSize: width > 400 ? 36 : 32,
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
    },
    romaji: {
        fontSize: width > 400 ? 20 : 18,
        color: "#000",
        textAlign: "center",
        marginTop: 5,
        includeFontPadding: false,
    }
});

export default styles;