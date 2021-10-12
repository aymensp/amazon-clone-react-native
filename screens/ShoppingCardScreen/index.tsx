import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import ShoppingCardItem from '../../components/ShopingCardItem'
import { styles } from './styles'
import { Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { CartProduct } from '../../src/models'
import { DataStore } from '@aws-amplify/datastore'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'
import { listCartProducts, listProducts } from '../../src/graphql/queries'
import { graphqlOperation } from 'aws-amplify'

const ShoppingCardScreen = () => {
    const [products, setproducts] = useState<CartProduct[]>([]);
    const [userSub, setUserSub] = useState("")

    useEffect(() => {
        Auth.currentAuthenticatedUser().then((result) => setUserSub(result.attributes.sub));
        const fetchProducts = async () => {
            const fetch = await API.graphql(graphqlOperation(listCartProducts, { userSub: userSub }))
            setproducts(fetch.data.listCartProducts.items)
            // DataStore.query(CartProduct,c=>c.userSub("eq",userSub)).then((results) => setproducts(results));
        }
        fetchProducts();
    }, [])
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
                    title={`Proceed to checkout (${products.length} items)`}
                />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                {products.map((item) =>
                (
                    <ShoppingCardItem
                        key={item.id}
                        cardItem={item}
                    />
                ))}
            </View>

        </ScrollView>
    )
}

export default ShoppingCardScreen

