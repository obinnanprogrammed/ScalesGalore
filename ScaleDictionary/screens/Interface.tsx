/**
 * TODO: continue formatting overhaul
 */
import { useState, useEffect } from 'react';
import { NavigationProp, RouteProp, useTheme } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MusicNotation from './MusicNotation';
import { majorScales, minorScales } from '../utilities/scales';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { Audio } from 'expo-av';
import soundFiles from '../utilities/soundImports';

type RootStackParamList = {
    Welcome: undefined;
    ClefSelection: undefined;
    Interface: { clef: string };
};
type InterfaceScreenNavigationProp = NavigationProp<RootStackParamList, 'Interface'>;
type InterfaceScreenRouteProp = RouteProp<RootStackParamList, 'Interface'>;

type Props = {
  navigation: InterfaceScreenNavigationProp,
  route: InterfaceScreenRouteProp
};

type SoundFiles = Record<string, any>;
export default function Interface({ navigation, route }: Props) {
    // states
    const [note, setNote] = useState("");
    const [mode, setMode] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [scaleNotes, setScaleNotes] = useState<string[]>([]);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    // clef passed in from ClefSelection
    const { clef } = route.params;

    // theme and styling stuff
    const { colors } = useTheme();
    let [fontsLoaded, fontError] = useFonts({
      JosefinSans_400Regular
    })

    // sound stuff: only available with treble clef major scales
    async function playSound() {
      const sFiles: SoundFiles = soundFiles;
      const soundKey = `${note}-${mode}-${clef}`;
      const soundFile = sFiles[soundKey];
      
      if (!soundFile) {
        console.error("Sound file not found for:", note, mode, clef);
        return;
      }
      console.log("Loading scale...");
      const { sound } = await Audio.Sound.createAsync(soundFile);
      setSound(sound);

      console.log("Playing scale...");
      await sound.playAsync();
    }

    // useEffect for sound
    useEffect(() => {
      return sound ? () => {
        console.log("Unloading sound....");
        sound.unloadAsync();
      }: undefined;
    }, [sound]);

    if(!fontsLoaded && !fontError) {
      return null;
    }

    // submission handling
    const handleSubmit = () => {
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
    }
    
    // resetting parameters
    const handleReset = () => {
      setSubmitted(false);
      setNote("");
      setMode("");
      setScaleNotes([]);
      setSound(null);
    }


    // notes and modes dictionaries
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
            {!submitted && 
              <View style={styles.container}>
                <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>Pick your scale here!</Text>
                <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value" 
                data={notes} placeholder="Select note...." value={note} onChange={item => setNote(item.value)}>
                </Dropdown>
                <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value" 
                data={modes} placeholder="Select mode...." value={mode} onChange={item => setMode(item.value)}>
                </Dropdown>
                <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSubmit}><Text>Submit</Text></Pressable>
              </View>}
            
            
            {submitted && (scaleNotes.length === 0 ?
            <View style={styles.container}>
              <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>This scale is impractical!</Text>
              <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>It likely contains double flats or double sharps.</Text>
              <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleReset}><Text>Reset</Text></Pressable>
              <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>Click the reset button to generate a different scale.</Text>
            </View>
            : <View style={styles.container}>
                <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>{note + " " + mode}</Text>
                <MusicNotation clef={clef} notes={scaleNotes} />
                <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={playSound}><Text>Listen!</Text></Pressable>
                <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleReset}><Text>Reset</Text></Pressable>
                <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>Click the reset button to generate a different scale.</Text>
              </View>)}
            
            <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => {navigation.navigate("Welcome")}}><Text>Return Home</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 5,
        fontFamily: "JosefinSans_400Regular"
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 25,
      paddingVertical: 10,
      margin: 4,
      borderRadius: 8,
      elevation: 4,
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