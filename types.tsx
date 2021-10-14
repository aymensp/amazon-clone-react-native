/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from './src/models';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }

  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  HomeStack: undefined;
  Home: Product;
  ShoppingCard:undefined;
  TabTwo: undefined;
  ShoppingCardStack: undefined;
  Details: Product;
  TabFour: undefined;
  Address: Number;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,

  NativeStackScreenProps<RootStackParamList>
>;
