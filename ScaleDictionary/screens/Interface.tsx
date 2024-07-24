/**
 * TODO: continue formatting overhaul
 * make Josefin-Sans font family global so that I don't have to call it every time - doing this is a little
 * unfun so I will leave what I have as is.
 * Possibly change note selection to scroll, mode selection to buttons?
 */
import { useState, useEffect } from 'react';
import { NavigationProp, RouteProp, useTheme } from '@react-navigation/native';
import { View, Text, Pressable, ImageBackground, Animated } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MusicNotation from './MusicNotation';
import { majorScales, minorScales } from '../utilities/scales';
import { notes, modes } from '../utilities/noteMode';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { Audio } from 'expo-av';
import soundFiles from '../utilities/soundImports';
import { styles, dropdownStyles } from '../utilities/styles';
import { RootStackParamList } from '../utilities/types';

type InterfaceScreenNavigationProp = NavigationProp<RootStackParamList, 'Interface'>;
type InterfaceScreenRouteProp = RouteProp<RootStackParamList, 'Interface'>;

type Props = {
  navigation: InterfaceScreenNavigationProp,
  route: InterfaceScreenRouteProp
};

type SoundFiles = Record<string, any>;
/**
 * Main interface component.
 */
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

    // sound stuff
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

    return (
        <ImageBackground source={require("../assets/ScaleDictionary-background.png")} style={styles.background}>
          <View style={styles.container}>
              {!submitted && 
                <View style={styles.inner}>
                  <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>Pick your scale here!</Text>
                  <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value" 
                  data={notes} placeholder="Select note...." value={note} onChange={item => setNote(item.value)}>
                  </Dropdown>
                  <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value" 
                  data={modes} placeholder="Select mode...." value={mode} onChange={item => setMode(item.value)}>
                  </Dropdown>
                  <Pressable style={[styles.button, { backgroundColor: (note === "" || mode === "" ? "gray" : colors.primary) }]} 
                    disabled={note === "" || mode === "" ? true : false } onPress={handleSubmit}><Text>Submit</Text></Pressable>
                </View>}
              
              
              {submitted && (scaleNotes.length === 0 ?
              <View style={styles.inner}>
                <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>This scale is impractical!</Text>
                <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>It likely contains double flats or double sharps.</Text>
                <Pressable style={[styles.button, { backgroundColor: colors.primary, margin: 4 }]} onPress={handleReset}><Text>Reset</Text></Pressable>
                <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>Click the reset button to generate a different scale.</Text>
              </View>
              : <View style={styles.inner}>
                  <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>{note + " " + mode}</Text>
                  <MusicNotation clef={clef} notes={scaleNotes} />
                  <Pressable style={[styles.button, { backgroundColor: colors.primary, margin: 4 }]} onPress={playSound}><Text>Listen!</Text></Pressable>
                  <Pressable style={[styles.button, { backgroundColor: colors.primary, margin: 4 }]} onPress={handleReset}><Text>Reset</Text></Pressable>
                  <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>Click the reset button to generate a different scale.</Text>
                </View>)}
              
              <Pressable style={styles.homeButton} onPress={() => {navigation.navigate("Welcome")}}>
                <Ionicons name="home" size={24} color={colors.primary}></Ionicons>
              </Pressable>
          </View>
        </ImageBackground>
    )
}