import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import Amplify, { Auth } from 'aws-amplify'
import config from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import {StripeProvider} from '@stripe/stripe-react-native'


Amplify.configure(config)

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
     
      <SafeAreaProvider>
         <StripeProvider publishableKey="pk_test_vLKCodGS4RNdCDdWgq7ZvYnZ00XJ1JB5ko" >
         <Navigation />
         <StatusBar />
        </StripeProvider>
      </SafeAreaProvider>
    );
  }
}
export default withAuthenticator(App)

