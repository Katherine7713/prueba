import { StyleSheet } from "react-native";

export const colors = {
    blue: "#006491",
    red: "#E31837",
    light: "#F5F5F5",
    white: "#FFFFFF",
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
        padding: 20,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.blue,
        marginBottom: 20,
    },

    input: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
    },

    button: {
        backgroundColor: colors.red,
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
    },

    buttonText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 16,
    },
});