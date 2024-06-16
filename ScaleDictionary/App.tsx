import * as React from 'react';
import { NavigationContainer, DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import Interface from './screens/Interface';
import { registerRootComponent } from 'expo';

const Theme: NavigationTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#DCE014',
    background: '#403C3C',
    card: 'black',
    text: 'white',
    border: '#403C3C',  // This was 'background', set it explicitly
    notification: '#DCE014'  // This was 'primary', set it explicitly
  }
};

type RootStackParamList = {
  Welcome: undefined;
  Interface: { clef: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome}></Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="Interface" component={Interface}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


registerRootComponent(App);
