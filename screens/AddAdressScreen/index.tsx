import { Auth, API, graphqlOperation, DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import countryList from "country-list";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";
import { Order } from "../../src/models";
import { OrderProduct, CartProduct } from "../../src/models";
import { RootTabScreenProps } from "../../types";
import { styles } from "./styles";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createPaymentIntent } from "../../src/graphql/mutations";
import { useStripe } from "@stripe/stripe-react-native";

const countries = countryList.getData();

const AddAdressScreen = ({ route , navigation }: RootTabScreenProps<"Address">) => {
  const [country, setCountry] = useState(countries[0].name);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [clientSecret, setclientSecret] = useState<string | null>(null);

  const totalPrice = route.params  ; 
  const amount = Math.floor(totalPrice*100);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const fetchPaymentIntent = async () => {
    const response = await API.graphql(
      graphqlOperation(createPaymentIntent, { amount: amount })
    );
    setclientSecret(response.data.createPaymentIntent.clientSecret);
  };

  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  useEffect(() => {
    if (clientSecret) {
      initSheet();
    }
  }, [clientSecret]);

  const initSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });

    if (error) {
      Alert.alert(error);
    }
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      saveOrder();
      Alert.alert("Success", "Your order is confirmed!");
    }
  };
  const saveOrder = async () => {
    // get user details
    const userData = await Auth.currentAuthenticatedUser();
    // create a new order
    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,
        fullName: fullname,
        phoneNumber: phone,
        country,
        city,
        address,
      })
    );

    // fetch all cart items
    const cartItems = await DataStore.query(CartProduct, (cp) =>
      cp.userSub("eq", userData.attributes.sub)
    );

    // attach all cart items to the order
    await Promise.all(
      cartItems.map((cartItem) =>
        DataStore.save(
          new OrderProduct({
            quantity: cartItem.qunatity,
            option: cartItem.option,
            productID: cartItem.productID,
            orderID: newOrder.id,
          })
        )
      )
    );

    // delete all cart items
    await Promise.all(cartItems.map((cartItem) => DataStore.delete(cartItem)));

    // redirect home

    navigation.navigate("Home");
  };

  const SelectCountry = (item: string) => {
    setCountry(item);
    setModalVisible(!modalVisible);
  };
 const _keyExtractor = (item : any, index : any) => item.name;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Add a new address</Text>
        <Modal isVisible={modalVisible}>
          <View
            style={{
              width: "80%",
              height: "70%",
              alignSelf: "center",
              backgroundColor: "white",
              borderRadius: 8,
            }}
          >
            <View
              style={{
                height: 55,
                borderBottomWidth: 1,
                borderColor: "#c5bfbf",
                backgroundColor: "#e2e2e2",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={toggleModal}
                style={{ alignSelf: "flex-end", marginRight: 10 }}
              >
                <Ionicons name="close-outline" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={countries}
              keyExtractor={_keyExtractor}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => SelectCountry(item.name)}
                  key={item.name}
                  style={{
                    flexDirection: "row",
                    height: 50,
                    padding: 10,
                    alignContent: "center",
                    borderColor: "#e0d8d8",
                    borderWidth: 0.5,
                  }}
                >
                  <Text style={{ alignSelf: "center", fontSize: 18 }}>
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Modal>
        <Pressable onPress={toggleModal}>
          <View style={[styles.input, styles.countriesLabel]}>
            <Text style={{ fontSize: 18 }}>{country}</Text>
            <Ionicons name="chevron-down-outline" color="black" size={25} />
          </View>
        </Pressable>
        <Text style={styles.label}>Full name (First and Last name)</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor="gray"
          value={fullname}
          onChangeText={setFullname}
        />
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="+49 8783 3876"
          placeholderTextColor="gray"
          value={phone}
          onChangeText={setPhone}
          keyboardType={"phone-pad"}
        />
        <Text style={styles.label}>Address</Text>
        <View
          style={{
            marginBottom: 10,
            borderBottomColor: "gray",
            borderBottomWidth: 1.2,
          }}
        >
          <TextInput
            style={styles.doubleInput}
            placeholder="Street address or P.O Box"
            placeholderTextColor="gray"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.doubleInput}
            placeholder="Apt, Suite, Unit, Building (optional)"
            placeholderTextColor="gray"
          />
        </View>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Cologne"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="gray"
        />
        <Button
          buttonStyle={{
            backgroundColor: "#FFD814",
            borderRadius: 10,
            height: 45,
          }}
          titleStyle={{ color: "black" }}
          title={`Use this Address`}
          onPress={openPaymentSheet}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddAdressScreen;
