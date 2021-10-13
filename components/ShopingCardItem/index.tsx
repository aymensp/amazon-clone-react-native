import React from 'react'
import { styles } from './styles'
import { Image } from 'react-native'
import { Text, View } from '../../components/Themed';
import QuantitySelector from '../QuantitySelector';
import { Button } from 'react-native-elements';
import { CartProduct, Product } from '../../src/models';
import { DataStore } from '@aws-amplify/datastore';
import ProductItem from '../ProductItem';


interface cardItemProps {
    cardItem: CartProduct
}
const ShoppingCardItem = ({ cardItem }: cardItemProps) => {
    const { product, ...cartProduct } = cardItem;

    const updateQuantity = async (newQuantity: number) => {
        const original = await DataStore.query(CartProduct, cartProduct.id);

        await DataStore.save(
            CartProduct.copyOf(original, updated => {
                updated.qunatity = newQuantity;
            }),
        );
    };
    const deleteItem = async (id:string) => {

        const todelete = await DataStore.query(CartProduct,id);
        await DataStore.delete(todelete);
    };
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
                        uri: product?.image
                    }}
                />
                <View style={styles.details}>
                    <Text
                        style={styles.title}
                        numberOfLines={2}
                    >
                        {product?.title}
                    </Text>

                    <View style={styles.price}>
                        <Text style={styles.priceCurrency}>
                            $
                        </Text>
                        <Text
                            style={styles.priceAmount}
                        >
                            {product?.price}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: "500", color: 'green' }}>In Stock.</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <QuantitySelector quantity={cartProduct.qunatity} setQuantity={updateQuantity} deleteAction={()=>deleteItem(cartProduct.id)} />
                <View style={styles.buttons} >
                    <Button
                        titleStyle={{ color: 'black', fontSize: 14 }}
                        title='Delete'
                        buttonStyle={styles.button}
                        onPress={()=>deleteItem(cartProduct.id)}
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


