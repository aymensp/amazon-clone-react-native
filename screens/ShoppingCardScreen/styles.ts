import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:'white'
    },
    price: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    priceCurrency: {
        lineHeight: 30,
        fontSize: 14,
        fontWeight: 'bold'
    },
    priceAmount: {
        fontWeight: "bold",
        fontSize: 24,
    },
    subtotal:{
        fontSize:22,
        fontWeight:"400"
    }
    
})