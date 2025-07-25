import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#9a1750",
        borderRadius: 8,
        marginVertical: 5,
        paddingVertical: 10,
        alignItems: 'center',

    },
    buttonLabel: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
    },

    buttonContainerDisabled: {
        backgroundColor: "#cccccc",
        borderRadius: 8,
        marginVertical: 5,
        paddingVertical: 10,
        alignItems: 'center',
        opacity: 0.6,
    },
    buttonLabelDisabled: {
        textAlign: "center",
        color: "#888888",
        fontSize: 20,
    },
});

export default styles;
