import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import ProductItem from '../../components/ProductItem';
import { View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Product } from '../../src/models';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const [products, setproducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const results = await DataStore.query(Product);
      setproducts(results)
    }
    fetchProducts();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={( {item} ) =>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Details', item)}>
            <ProductItem item={item} />
          </TouchableWithoutFeedback>

        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

});
