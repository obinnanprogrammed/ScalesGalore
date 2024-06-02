import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import MusicNotation from './MusicNotation';

type RootStackParamList = {
    Welcome: undefined;
    Interface: undefined;
};
type InterfaceScreenNavigationProp = NavigationProp<RootStackParamList, 'Interface'>;

export default function Interface() {
    const navigation = useNavigation<InterfaceScreenNavigationProp>();
    
    return (
        <View style={styles.container}>
            <Text>This interface is so mid.</Text>
            <MusicNotation />
            <Button title="Return Home" onPress={() => {navigation.navigate("Welcome")}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
