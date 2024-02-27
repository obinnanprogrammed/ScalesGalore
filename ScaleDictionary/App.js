import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screen from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Screen.Welcome}></Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="Interface" component={Screen.Interface}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
