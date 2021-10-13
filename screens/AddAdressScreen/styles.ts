import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        lineHeight: 50
    },
    label: {
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 35
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 17,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 15
    },
    doubleInput: {
        height: 45,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'gray',
        fontSize: 17,
        backgroundColor: 'white',
        padding: 10,
    }
});