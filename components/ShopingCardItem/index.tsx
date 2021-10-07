import React from 'react'
import { styles } from './styles'
import { Image } from 'react-native'
import { Text, View } from '../../components/Themed';
import QuantitySelector from '../QuantitySelector';
import { Button } from 'react-native-elements';


interface cardItemProps {
    cardItem: {
        id: string,
        quantity: number,
        option?: string,
        item: {
            id: string,
            title: string,
            image: string,
            avgRating: number
            ratings: number,
            price: number,
            oldPrice?: number
        }

    }
}
const ShoppingCardItem = ({ cardItem }: cardItemProps) => {
    return (
        <View style={{
            borderBottomWidth: 0.5,
            borderBottomColor: "#d1d1d1",
            padding: 12
        }} 
        key={cardItem.id}
        >
            <View style={styles.column}

            >
                <Image
                    style={styles.image}
                    source={{
                        uri: cardItem.item.image
                    }}
                />
                <View style={styles.details}>
                    <Text
                        style={styles.title}
                        numberOfLines={2}
                    >
                        {cardItem.item.title}
                    </Text>

                    <View style={styles.price}>
                        <Text style={styles.priceCurrency}>
                            $
                        </Text>
                        <Text
                            style={styles.priceAmount}
                        >
                            {cardItem.item.price}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'green' }}>In Stock.</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <QuantitySelector  />
                <View style={styles.buttons} >
                    <Button
                        titleStyle={{ color: 'black', fontSize: 14 }}
                        title='Delete'
                        buttonStyle={styles.button}
                    />
                    <Button

                        titleStyle={{ color: 'black', fontSize: 14 }}
                        title='Save for later'
                        buttonStyle={styles.button} />
                </View>
            </View>

        </View>
    )
}

export default ShoppingCardItem


