import { NavigationContainer, DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import ClefSelection from './screens/ClefSelection';
import Interface from './screens/Interface';
import { registerRootComponent } from 'expo';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';

const Theme: NavigationTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#DCE014',
    background: '#9ab7e6',
    card: 'black',
    text: 'white',
    border: '#9ab7e6',  
    notification: '#DCE014'
  }
};

type RootStackParamList = {
  Welcome: undefined;
  ClefSelection: undefined;
  Interface: { clef: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    JosefinSans_400Regular,
  })

  if(!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome}></Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="ClefSelection" component={ClefSelection}></Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="Interface" component={Interface}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


registerRootComponent(App);
