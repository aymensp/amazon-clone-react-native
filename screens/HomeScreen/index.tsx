import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from '../../components/ProductItem';
import { View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import products from '../../assets/data/products'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) =>
          <TouchableWithoutFeedback onPress={()=>navigation.navigate('Details',item)}>
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
