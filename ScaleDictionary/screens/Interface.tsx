import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MusicNotation from './MusicNotation';
import { majorScales, minorScales } from './scales';

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
    const [scaleNotes, setScaleNotes] = useState<string[]>([]);
    type Data = "label" | "value";
    const notes: Record<Data, string>[] = [
        { label: "E", value: "E" }, 
        { label: "F", value: "F" }, 
        { label: "F#", value: "F#" },
        { label: "Gb", value: "Gb" }, 
        { label: "G", value: "G" }, 
        { label: "G#", value: "G#" }, 
        { label: "Ab", value: "Ab" },
        { label: "A", value: "A" }, 
        { label: "A#", value: "A#" },
        { label: "Bb", value: "Bb" },
        { label: "B", value: "B" }, 
        { label: "C", value: "C" }, 
        { label: "C#", value: "C#" },
        { label: "Db", value: "Db" }, 
        { label: "D", value: "D" }, 
        { label: "D#", value: "D#" },
        { label: "Eb", value: "Eb" }
    ];
    const modes: Record<Data, string>[] = [
        { label: "Major", value: "Major" }, 
        { label: "Minor", value: "Minor" }
    ]
    return (
        <View style={styles.container}>
            <Text>Pick your scale here!</Text>
            <Text>Click the reeset button to generate a different scale.</Text>
            <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value" 
            data={notes} placeholder="Select note...." value={note} onChange={item => setNote(item.value)}>
            </Dropdown>
            <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value" 
            data={modes} placeholder="Select mode...." value={mode} onChange={item => setMode(item.value)}>
            </Dropdown>
            <Button title="Submit" onPress={() => {
              setSubmitted(true);
              if(mode === "Major") {
                if((note + " " + mode) in majorScales) {
                  setScaleNotes(majorScales[note + " " + mode]);
                }
              } else if(mode === "Minor") {
                if((note + " " + mode) in minorScales) {
                  setScaleNotes(minorScales[note + " " + mode]);
                }
              }
            }} />
            {submitted && <Text>{note + " " + mode}</Text>}
            
            {submitted && 
            <View>
                {scaleNotes.length === 0 ? <Text>This scale is impractical!</Text>
                : <MusicNotation clef="bass" notes={scaleNotes} /> }
              </View>}
            <Button title="Reset" onPress={() => {
                setSubmitted(false);
                setNote("");
                setMode("");
                setScaleNotes([]);
            }} />
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