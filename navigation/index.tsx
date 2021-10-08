import { AntDesign, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable, TextInput } from 'react-native';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from '../components/Themed';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ShoppingCardScreen from '../screens/ShoppingCardScreen';
import ProductScreen from '../screens/ProductScren';

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const headerGradient = (
  <View style={{ height: 110, width: '100%' }}>
    <LinearGradient start={[0.0, 0.5]} end={[0.6, 0.8]} locations={[0.2, 0.5, 1]} style={{ height: 110, width: '100%', flex: 1 }} colors={['#9bd4e0', '#a8dfd7', '#b2e5ce',]}>
      <View style={{
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: 'white', height: 45, width: "94%", marginTop: 55, marginHorizontal: 12, borderWidth: 1, borderColor: 'rgb(180, 184, 183)', borderRadius: 8
      }}>
        <AntDesign name='search1' size={20} color="black" />
        <TextInput
          style={{
            flex: 0.80,
            fontSize: 18,
            margin: 10,
            height: 40,
            fontWeight: '500'
          }}
          placeholder="Search Amazon"
          placeholderTextColor="gray"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 0.25 }}>
          <Ionicons name='scan-outline' size={22} color='gray' />
          <Ionicons name="ios-mic-outline" size={24} color='gray' />
        </View>

      </View>
    </LinearGradient>
  </View>
)

const HomeTab = createNativeStackNavigator<RootTabParamList>();
function HomeScreenStack() {
  return (
    <HomeTab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <HomeTab.Screen name='Home' component={HomeScreen} />
      <HomeTab.Screen name='Details' component={ProductScreen} />
    </HomeTab.Navigator>
  )
}
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  const CustomTabButton = (props: any) => (
    <Pressable
      {...props}
      style={
        props.accessibilityState.selected
          ? [props.style, { borderTopColor: '#3d7d8e', borderTopWidth: 4 }]
          : props.style
      }
    />
  );
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={
        {
          headerTitle: '',
          header: () => (headerGradient),
          tabBarButton: CustomTabButton,
          tabBarActiveTintColor: '#3d7d8e',
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel: false,
        }
      }
    >

      <BottomTab.Screen
        name="Home"
        component={HomeScreenStack}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          tabBarIcon: ({ color }) => <AntDesign name='home' color={color} size={22} />,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={ShoppingCardScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={ShoppingCardScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name='shoppingcart' size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={ShoppingCardScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name='menu-outline' size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

