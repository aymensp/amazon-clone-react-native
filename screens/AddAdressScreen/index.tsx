import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { styles } from './styles'

const AddAdressScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a new address</Text>
            <Text style={styles.label}>Full name (First and Last name)</Text>
            <TextInput style={styles.input} placeholder='John Doe' />
            <Text style={styles.label}>Phone number</Text>
            <TextInput style={styles.input} placeholder='+49 8783 3876' />
            <Text style={styles.label}>Address</Text>
            <View style={{ marginBottom: 10 ,borderBottomColor:'gray' ,borderBottomWidth:1 }}>
                <TextInput style={styles.doubleInput} placeholder='Street address or P.O Box' />
                <TextInput style={styles.doubleInput} placeholder='Apt, Suite, Unit, Building (optional)' />
            </View>
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.input} placeholder='Cologne' />
            <Button
                    buttonStyle={{ backgroundColor: '#FFD814', borderRadius: 10, height: 45 }}
                    titleStyle={{ color: 'black' }}
                    title={`Use this Address`}
                />
        </View>
    )
}

export default AddAdressScreen
