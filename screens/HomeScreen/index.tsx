import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet ,View} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import ProductItem from '../../components/ProductItem';
import { RootTabScreenProps } from '../../types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Product } from '../../src/models';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    DataStore.query(Product).then(setProducts);
  }, [products])
  if (products.length===0) {
    return <ActivityIndicator/>
  } 
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) =>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Details', item)}>
            <ProductItem item={item} />
          </TouchableWithoutFeedback>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
