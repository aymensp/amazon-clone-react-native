import React from 'react'
import { View } from 'react-native'
import ShoppingCardItem from '../../components/ShopingCardItem'

import cart from "../../assets/data/cart"
import { styles } from './styles'

const ShoppingCardScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{paddingHorizontal:10 }}>
            {cart.map((item) =>
            (
                <ShoppingCardItem cardItem={item} />
            ))}
            </View>
        
        </View>
    )
}

export default ShoppingCardScreen

