import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "white",
    },
    storeAndRating: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'

    },
    store: {
        color: "#007185",
        fontWeight: "500",
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
    },
    image: {
        width: "100%",
        height: 350,
        resizeMode: 'contain'
    },
    seperator: {
        height: 5,
        backgroundColor: '#d7d9d9'
    }, price: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    priceCurrency: {
        lineHeight: 40,
        fontSize: 14
    },
    priceAmount: {
        fontWeight: "300",
        fontSize: 32,
    },
    oldPrice: {
        color: 'gray',
        fontWeight: 'normal',
        fontSize: 14,
        textDecorationLine: 'line-through',
    },
    totalCoast: {
        fontWeight: 'bold',
        color: '#606363',
        fontSize:17,
        lineHeight:26,
        marginBottom: 30
    },
    deliveryPlace: {
        flexDirection: 'row',
        color: '#007185',
        alignItems:'center'
    }
})