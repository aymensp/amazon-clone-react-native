import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 15,
        
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
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'red',
        opacity: 0.3,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});