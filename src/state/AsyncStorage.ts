import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToAsyncStorage = async (state: string, value: any) => {
    try {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(`@${state}`, stringValue);
    } catch (error) {
        console.error("Failed to save to async storage:", error);
    }
};

export const loadFromAsyncStorage = async (state: string, defaultValue: any = null) => {
    try {
        const value = await AsyncStorage.getItem(`@${state}`);

        if (value === null) {
            return defaultValue;
        }

        try {
            return JSON.parse(value);
        } catch (parseError) {
            const numValue = Number(value);
            if (!isNaN(numValue) && isFinite(numValue)) {
                return numValue;
            }
            return value;
        }
    } catch (error) {
        console.error("Failed to load from async storage:", error);
        return defaultValue;
    }
};

export const removeFromAsyncStorage = async (state: string) => {
    try {
        await AsyncStorage.removeItem(`@${state}`);
    } catch (error) {
        console.error("Failed to remove from async storage:", error);
    }
}