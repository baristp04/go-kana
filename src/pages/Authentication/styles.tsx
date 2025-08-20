import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#e3e2df",
        flex: 1,
        justifyContent: "center",
    },
    inputFrame: {
        width: "90%",
        alignSelf: "center",
        borderWidth: 1,
        backgroundColor: "ivory",
        borderColor: "#ccc",
        borderRadius: 10,
        margin: 12,
        padding: 10,
        elevation: 8,
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
        height: 30,
        borderRadius: 10,
        marginBottom: 9,
    },
    buttonContainer: {
        margin: 8,
        alignContent: "center",
    },
    match:{
        fontSize:12,
        paddingTop: 20,
        fontWeight:"bold"
    },
    createText:{
        textAlign:"center",
        fontSize:15,

    }
});

export default styles;