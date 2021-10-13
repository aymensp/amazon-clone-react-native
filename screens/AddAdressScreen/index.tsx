import Auth from '@aws-amplify/auth'
import { DataStore } from '@aws-amplify/datastore'
import React, { useState } from 'react'
import {
    View, Text, TextInput, KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { Button } from 'react-native-elements'
import { CartProduct } from '../../src/models'
import { RootTabScreenProps } from '../../types'
import { styles } from './styles'

const AddAdressScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {

    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');
    const [city, setCity] = useState('');

    const saveOrder = async () => {
        // get user details
        const userData = await Auth.currentAuthenticatedUser();
        // create a new order
        const newOrder = await DataStore.save(
          new Order({
            userSub: userData.attributes.sub,
            fullName: fullname,
            phoneNumber: phone,
            city,
            address,
          }),
        );
    
        // fetch all cart items
        const cartItems = await DataStore.query(CartProduct, cp =>
          cp.userSub('eq', userData.attributes.sub),
        );
    
        // attach all cart items to the order
        await Promise.all(
          cartItems.map(cartItem =>
            DataStore.save(
              new OrderProduct({
                quantity: cartItem.qunatity,
                option: cartItem.option,
                productID: cartItem.productID,
                orderID: newOrder.id,
              }),
            ),
          ),
        );
    
        // delete all cart items
        await Promise.all(cartItems.map(cartItem => DataStore.delete(cartItem)));
    
        // redirect home
        navigation.navigate('HomeStack');
      };
    
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <View style={styles.container}>
                <Text style={styles.title}>Add a new address</Text>
                <Text style={styles.label}>Full name (First and Last name)</Text>
                <TextInput
                    style={styles.input}
                    placeholder='John Doe'
                    value={fullname}
                    onChangeText={setFullname}
                />
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                    style={styles.input}
                    placeholder='+49 8783 3876'
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType={'phone-pad'}
                />
                <Text style={styles.label}>Address</Text>
                <View style={{ marginBottom: 10, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                    <TextInput
                        style={styles.doubleInput}
                        placeholder='Street address or P.O Box'
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        style={styles.doubleInput}
                        placeholder='Apt, Suite, Unit, Building (optional)'
                    />
                </View>
                <Text style={styles.label}>City</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Cologne'
                    value={city}
                    onChangeText={setCity}
                />
                <Button
                    buttonStyle={{ backgroundColor: '#FFD814', borderRadius: 10, height: 45 }}
                    titleStyle={{ color: 'black' }}
                    title={`Use this Address`}
                    onPress={saveOrder} 
                />
            </View>
        </KeyboardAvoidingView>

    )
}

export default AddAdressScreen
