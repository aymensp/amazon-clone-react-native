import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View } from 'react-native'
import ShoppingCardItem from '../../components/ShopingCardItem'

import cart from "../../assets/data/cart"
import { styles } from './styles'
import { Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'

const ShoppingCardScreen = () => {


    return (
        <ScrollView style={styles.container}>
            <View style={{ padding: 15, justifyContent: 'space-between', height: 120, borderBottomWidth: 0.5, borderBottomColor: "#d1d1d1" }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={styles.subtotal}>Subtotal </Text>
                    <View style={styles.price}>
                        <Text style={styles.priceCurrency}>
                            $
                        </Text>
                        <Text
                            style={styles.priceAmount}
                        >
                            299.8
                        </Text>
                    </View>
                </View>
                <Button
                    buttonStyle={{ backgroundColor: '#FFD814', borderRadius: 10, height: 45 }}
                    titleStyle={{ color: 'black' }}
                    title= {`Proceed to checkout (${cart.length} items)`}
                />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                {cart.map((item) =>
                (
                    <ShoppingCardItem
                        key={item.id}
                        cardItem={item} />
                ))}
            </View>

        </ScrollView>
    )
}

export default ShoppingCardScreen

