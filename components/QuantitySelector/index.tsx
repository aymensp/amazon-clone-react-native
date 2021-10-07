import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const QuantitySelector = () => {
    const [quantity, setquantity] = useState(1)
    const ChangeQte = (action: string) => {
        if (action === "plus") {
            setquantity(quantity + 1)
        }
        else if (quantity > 1) {
            setquantity(quantity - 1)
        }
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#f7f8fa', '#e7e9ec']}
                style={styles.button}>
                <TouchableOpacity style={styles.button} onPress={quantity===1 ? ()=>console.log("delete"): () => ChangeQte('minus')}>
                    {quantity === 1 ? <FontAwesome size={18} name='trash-o' /> : <Text style={styles.buttonText}>-</Text>}
                </TouchableOpacity>
            </LinearGradient>
            <View style={{ width: 1, height: "100%", backgroundColor: '#b9b4b4' }} />
            <Text style={styles.quantity}>{quantity}</Text>
            <View style={{ width: 1, height: "100%", backgroundColor: '#b9b4b4' }} />
            <LinearGradient
                // Button Linear Gradient
                colors={['#f7f8fa', '#e7e9ec']}
                style={styles.button}>
                <TouchableOpacity onPress={() => ChangeQte('plus')}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </LinearGradient>

        </View>
    )
}

export default QuantitySelector

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 34,
        width: 135,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#adb1b8'
    },
    button: {

        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 3
    },
    buttonText: {
        fontSize: 22
    },
    quantity: {
        flex: 1.4,
        textAlign: 'center',
        fontSize: 18,
        color: '#007185',

    }
})
