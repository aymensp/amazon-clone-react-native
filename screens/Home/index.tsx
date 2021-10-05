import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/products/keyboard1.jpg'
          }}
        />
        <View style={styles.details}>
          <Text
            style={styles.title}
            numberOfLines={3}
          >
            Clean Architecture: A Craftsman's Guide to Software Structure and Design
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name='star' size={16} color={"#f78d24"} />
            <FontAwesome name='star' size={16} color={"#f78d24"} />
            <FontAwesome name='star' size={16} color={"#f78d24"} />
            <FontAwesome name='star-half-full' size={16} color={"#f78d24"} />
            <Text style={{ marginTop: 3, marginLeft: 3 }}>
              1325

            </Text>
          </View>
          <Text style={styles.price}>$20.98 
            <Text style={styles.oldPrice}> $30.49</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  column: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: "#d1d1d1",
    borderRadius: 3,

  },
  image: {
    height: 150,
    flex: 2,
    resizeMode: 'contain'
  },
  details: {
    padding: 10,
    flex: 3
  },
  title: {
    fontSize: 15

  },
  price: {
    fontWeight: "bold",
    fontSize:16
  },
  oldPrice: {
    color: 'gray',
    fontWeight: 'normal',
    fontSize:11,
    margin: 4 ,
    textDecorationLine:'line-through'
  }
});
