import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./Button.styles"

interface ButtonProps {
    press: () => void;
    label: string;
    japanese?: string;
    disabled?: boolean
}

const Button = ({ press, label, disabled, japanese }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={disabled ? styles.buttonContainerDisabled : styles.buttonContainer}
            onPress={press}
            disabled={disabled}>
            <Text style={disabled ? styles.buttonLabelDisabled : styles.buttonLabel}>{label}</Text>
            {japanese && <Text style={styles.buttonLabel}>{japanese}</Text>}
        </TouchableOpacity>
    )
}

export default Button;