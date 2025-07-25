import {useEffect} from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const onDisableBack = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const beforeRemoveHandler = (e:any) => {
            e.preventDefault();
            Alert.alert(
                "Exit Quiz",
                "Are you sure you want to quit? All unsaved progress will be lost.",
                [
                    {text: "Stay", onPress: () => {}},
                    {text: "Exit", onPress: () => {navigation.dispatch(e.data.action);}}
                ]
            )
        }
        navigation.addListener("beforeRemove",beforeRemoveHandler);
        return () => {
            navigation.removeListener("beforeRemove",beforeRemoveHandler)
        }
    })
} 

export default onDisableBack;