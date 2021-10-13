import React from 'react'
import { Alert, Image, Text, View } from 'react-native'
import { styles } from './styles'
import { FontAwesome } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'react-native-elements'
import { RootTabScreenProps } from '../../types'
import Auth from '@aws-amplify/auth'
import { CartProduct } from '../../src/models'
import { DataStore } from '@aws-amplify/datastore'

const ProductScreen = ({ route, navigation }: RootTabScreenProps<'Details'>) => {
    const product = route.params
    const onAddToCart = async () => {
        const userData = await Auth.currentAuthenticatedUser();
        if (!userData || !product) {
            return;
        }
        const newCartProduct = new CartProduct({
            userSub: userData.attributes.sub,
            qunatity: 1,
            option: 'Black',
            productID: product.id
        })

        await DataStore.save(newCartProduct)
            .then(() => navigation.navigate("ShoppingCardStack"))
            .catch((error) => alert(error));

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.storeAndRating}>
                    <Text style={styles.store}>Visit the Amazon Basics Store</Text>
                    <View style={styles.ratingContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            {[0, 0, 0, 0, 0].map((el, index) =>
                                <FontAwesome key={index} name={index < Math.floor(Number(product.avgRatingg)) ? 'star' : 'star-o'} size={12} color={"#f78d24"} />
                            )}
                        </View>
                        <Text style={styles.store}>{product.ratings}</Text>
                    </View>
                </View>
                <Text style={{ lineHeight: 20, }}>{product.title}</Text>
                <Image
                    style={styles.image}
                    source={{
                        uri: product.image
                    }}
                />

            </View>
            <View style={styles.seperator} />
            <View style={styles.container}>
                <Text style={{ fontSize: 16, lineHeight: 22 }}>
                    Features  details
                    - MAGSPEED WHEEL: Ultra-fast, precise, quiet MagSpeed electromagnetic scrolling
                    - DARKFIELD 4000 DPI SENSOR: Darkfield 4000 DPI sensor for precise tracking on any surface, even glass (up to 4mm in thickness)
                    - COMFORTABLE DESIGN: Tactile reference for hand positioning makes it easy to stay oriented and in your flow
                    - FLOW CROSS-COMPUTER CONTROL: Supports flow cross-computer control across multiple screens. Pair up to 3 devices via Bluetooth Low Energy or Unifying USB receiver
                </Text>
            </View>
            <View style={styles.seperator} />
            <View style={styles.container}>
                <View style={styles.price}>
                    <Text style={styles.priceCurrency}>
                        $
                    </Text>
                    <Text
                        style={styles.priceAmount}
                    >
                        {product.price}
                    </Text>
                    {product.oldPrice ? <Text style={styles.oldPrice}> ${product.oldPrice}</Text> : null}
                </View>
                <Text style={styles.totalCoast}>Estimated Total cost: $ {product.oldPrice} </Text>

                <View style={{ height: 260, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16 }}>Arrives:
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}> Oct 8 - 21</Text>
                    </Text>
                    <View style={styles.deliveryPlace}>
                        <FontAwesome name="map-marker" size={16} color='gray' />
                        <Text style={{ color: '#007185', fontSize: 17, fontWeight: "500" }}>  Deliver to Italy</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: "500", color: 'green' }}>In Stock.</Text>
                    <Text style={{ borderWidth: 2, fontSize: 16, padding: 8, borderRadius: 10 }}>Qty:  1 </Text>
                    <View >
                        <Button
                            buttonStyle={{ backgroundColor: '#FFD814', borderRadius: 10, height: 45 }}
                            titleStyle={{ color: 'black' }}
                            title="Add to Cart"
                            onPress={onAddToCart}
                        />
                        <View style={{ height: 10 }} />
                        <Button
                            buttonStyle={{ backgroundColor: '#FFA41C', borderRadius: 10, height: 45 }}
                            titleStyle={{ color: 'black' }}
                            title="Buy Now"
                        />
                    </View>
                </View>


            </View>


        </ScrollView >
    )
}

export default ProductScreen

