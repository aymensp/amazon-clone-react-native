import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import ShoppingCardItem from '../../components/ShopingCardItem'
import { styles } from './styles'
import { Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { CartProduct } from '../../src/models'
import { DataStore } from '@aws-amplify/datastore'
import Auth from '@aws-amplify/auth'
import { Product } from '../../src/models'

const ShoppingCardScreen = () => {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

    const fetchCartProducts = async () => {
        const userData = await Auth.currentAuthenticatedUser();
        // TODO query only my cart items
        DataStore.query(CartProduct, cp =>
          cp.userSub('eq', userData.attributes.sub),
        ).then(setCartProducts);
      };
      useEffect(() => {
        fetchCartProducts();
      }, []);

      useEffect(() => {
        if (cartProducts.filter(cp => !cp.product).length === 0) {
          return;
        }
    
        const fetchProducts = async () => {
          const products = await Promise.all(
            cartProducts.map(cartProduct =>
              DataStore.query(Product, cartProduct.productID),
            ),
          );
    
          // assign the products to the cart items
          setCartProducts(currentCartProducts =>
            currentCartProducts.map(cartProduct => ({
              ...cartProduct,
              product: products.find(p => p?.id === cartProduct.productID),
            })),
          );
        };
    
        fetchProducts();
      }, [cartProducts]);
      useEffect(() => {
        const subscription = DataStore.observe(CartProduct).subscribe(msg =>
          fetchCartProducts(),
        );
        return subscription.unsubscribe;
      }, []);
    
      useEffect(() => {
        const subscriptions = cartProducts.map(cp =>
          DataStore.observe(CartProduct, cp.id).subscribe(msg => {
            if (msg.opType === 'UPDATE') {
              setCartProducts(curCartProducts =>
                curCartProducts.map(cp => {
                  if (cp.id !== msg.element.id) {
                    console.log('differnt id');
                    return cp;
                  }
                  return {
                    ...cp,
                    ...msg.element,
                  };
                }),
              );
            }
          }),
        );
    
        return () => {
          subscriptions.forEach(sub => sub.unsubscribe());
        };
      }, [cartProducts]);
    
      const totalPrice = cartProducts.reduce(
        (summedPrice, product) =>
          summedPrice + (product?.product?.price || 0) * product.qunatity,
        0,
      );
   
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
                            {totalPrice.toFixed(2)}
                        </Text>
                    </View>
                </View>
                <Button
                    buttonStyle={{ backgroundColor: '#FFD814', borderRadius: 10, height: 45 }}
                    titleStyle={{ color: 'black' }}
                    title={`Proceed to checkout (${cartProducts.length} items)`}
                />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                {cartProducts.map((item) =>
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

