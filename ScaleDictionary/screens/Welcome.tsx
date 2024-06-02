import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, StyleSheet, Button } from 'react-native';

type RootStackParamList = {
    Welcome: undefined;
    Interface: undefined;
};
type WelcomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Welcome'>;

export default function Welcome() {
    const navigation = useNavigation<WelcomeScreenNavigationProp>();
    return (
        <View style={styles.container}>
            <Text>Welcome. Click to get started</Text>
            <Button title="To Interface" onPress={() => { navigation.navigate("Interface")}} />
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