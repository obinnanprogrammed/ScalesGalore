import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MusicNotation from './MusicNotation';

type RootStackParamList = {
    Welcome: undefined;
    Interface: undefined;
};
type InterfaceScreenNavigationProp = NavigationProp<RootStackParamList, 'Interface'>;

export default function Interface() {
    const navigation = useNavigation<InterfaceScreenNavigationProp>();

    const [note, setNote] = useState("");
    const [mode, setMode] = useState("");
    const [submitted, setSubmitted] = useState(false);
    type Data = "label" | "value";
    const notes: Record<Data, string>[] = [
        { label: "E", value: "E" }, 
        { label: "F", value: "F" }, 
        { label: "F#/Gb", value: "F#/Gb" }, 
        { label: "G", value: "G" }, 
        { label: "G#/Ab", value: "G#/Ab" }, 
        { label: "A", value: "A" }, 
        { label: "A#/Bb", value: "A#/Bb" }, 
        { label: "B", value: "B" }, 
        { label: "C", value: "C" }, 
        { label: "C#/Db", value: "C#/Db" }, 
        { label: "D", value: "D" }, 
        { label: "D#/Eb", value: "D#/Eb" }
    ];
    const modes: Record<Data, string>[] = [
        { label: "Major", value: "Major" }, 
        { label: "Minor", value: "Minor" }
    ]
    return (
        <View style={styles.container}>
            <Text>This interface is so mid.</Text>
            <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value" 
            data={notes} placeholder="Select note...." value={note} onChange={item => setNote(item.value)}>
            </Dropdown>
            <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value" 
            data={modes} placeholder="Select mode...." value={mode} onChange={item => setMode(item.value)}>
            </Dropdown>
            <Button title="Submit" onPress={() => setSubmitted(true)} />
            {submitted && <Text>{note + " " + mode}</Text>}
            <Button title="Reset" onPress={() => {
                setSubmitted(false);
                setNote("");
                setMode("");
            }} />
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

const dropdownStyles = StyleSheet.create({
    dropdown: {
      margin: 16,
      width: 200,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
  });