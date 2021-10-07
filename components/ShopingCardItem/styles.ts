import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    column: {
        flexDirection: 'row',
    },
    image: {
        height: 100,
        flex: 1.4,
        resizeMode: 'contain',

    },
    details: {
        paddingHorizontal: 10,
        flex: 3.8,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 23,
    },
    price: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    priceCurrency: {
        lineHeight: 26,
        fontSize: 14,
        fontWeight: 'bold'
    },
    priceAmount: {
        fontWeight: "bold",
        fontSize: 22,
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "48%",
        marginLeft:25
    },
    button: {
        height: 34,
        paddingHorizontal:12,
        borderRadius: 9,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#D5D9D9',
        color:'black',
       
    }

})

