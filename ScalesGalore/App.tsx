/**
 * TODO: animations, overhaul formatting
 * smoothen out transition between screens
 * 12/31/24: CURRENTLY ON BRANCH instrument-selection
 */
import { NavigationContainer, DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import ClefSelection from './screens/ClefSelection';
import Interface from './screens/Interface';
import { RootStackParamList } from './utilities/types';

const Theme: NavigationTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#98FB98',
    background: '#5ce1e6',
    card: 'black',
    text: 'white',
    border: '#9ab7e6',  
    notification: '#98FB98'
  }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome}></Stack.Screen>
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ClefSelection" component={ClefSelection}></Stack.Screen>
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Interface" component={Interface}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
