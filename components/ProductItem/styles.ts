import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    column: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: "#d1d1d1",
        borderRadius: 3,
        margin: 5
    },
    image: {
        height: 150,
        flex: 2,
        resizeMode: 'contain'
    },
    details: {
        padding: 10,
        flex: 3
    },
    title: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22
    },
    price: {
        flexDirection: 'row', 
        alignItems:'baseline'
    },
    priceCurrency:{
        lineHeight: 25,
        fontSize:10
    },
    priceAmount: {
        fontWeight: "400",
        fontSize: 20,
    },
    oldPrice: {
        color: 'gray',
        fontWeight: 'normal',
        fontSize: 14,
        textDecorationLine: 'line-through',

    }
})

