import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, StyleSheet, Button } from 'react-native';

function Welcome() {
    const navigation = useNavigation();
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
export default Welcome;