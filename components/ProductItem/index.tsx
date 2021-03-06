import React from 'react'
import { Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from '../../components/Themed';
import { styles } from './styles'
import { Product } from '../../src/models';

interface ProductItemProps {
    item: Product
}

const ProductItem = ({item} : ProductItemProps ) => {

    return (
        <View style={styles.column}
            key={item.id}
            
        >
            <Image
                style={styles.image}
                source={{
                    uri: item.image
                }}
            />
            <View style={styles.details}>
                <Text
                    style={styles.title}
                    numberOfLines={3}
                >
                    {item.title}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {[0, 0, 0, 0, 0].map((el,index) =>
                    <FontAwesome key={index} name={index< Math.floor(Number(item.avgRatingg))? 'star' : 'star-o'} size={16} color={"#f78d24"} />
                    )
                    }

                    <Text style={{ marginTop: 3, marginLeft: 3 }}>
                        {item.ratings}
                    </Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.priceCurrency}>
                        $
                    </Text>
                    <Text
                        style={styles.priceAmount}
                    >
                        {item.price.toFixed(2)}
                    </Text>
                    {item.oldPrice ? <Text style={styles.oldPrice}> ${item.oldPrice.toFixed(2)}</Text> : null}
                </View>

            </View>
        </View>

    )
}

export default ProductItem
