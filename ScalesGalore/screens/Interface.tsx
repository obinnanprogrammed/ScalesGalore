/**
 * TODO: implement transition animation (ClefSelection -> here, prompt -> scale rendering)
 * Also work out clef and stuff
 */
import { useState, useEffect, useCallback } from 'react';
import { NavigationProp, RouteProp, useTheme, useFocusEffect } from '@react-navigation/native';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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
import { instruments } from '../utilities/instrumentInfo';

// prop types
type InterfaceScreenNavigationProp = NavigationProp<RootStackParamList, 'Interface'>;
type InterfaceScreenRouteProp = RouteProp<RootStackParamList, 'Interface'>;
type Props = {
  navigation: InterfaceScreenNavigationProp,
  route: InterfaceScreenRouteProp
};
type SoundFiles = Record<string, number>;
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

    // instrument passed in from ClefSelection
    const { instrument } = route.params;
    const clef = instruments[instrument]["clef"] as string;
    //const key = instruments[instrument]["key"] as string;
    //const octave = instruments[instrument]["octave"] as number;
    
    // theme and styling stuff
    const { colors } = useTheme();
    
    let [fontsLoaded, fontError] = useFonts({
      JosefinSans_400Regular
    })
    
    const scale = useSharedValue(0);
    const contentStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }]
      };
    });
    useFocusEffect(useCallback(() => {
      scale.value = 0;
      scale.value = withTiming(1, { duration: 500 });
    }, [scale]))
    // playing sound
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
        <ImageBackground source={require("../assets/ScalesGalore-background.png")} style={styles.background}>
          <View style={styles.container}>
              <Pressable style={{ position: "absolute", top: 20, left: 10 }} onPress={() => navigation.navigate("ClefSelection")}>
                <Ionicons name="arrow-back-outline" size={48} color={colors.primary}></Ionicons>
              </Pressable>
              <Text style={{ fontFamily: styles.container.fontFamily, 
                color: colors.text, fontSize: 25, position: "absolute", top: 26 }}>ScalesGalore!</Text>
              {!submitted && 
                <View style={styles.inner}>
                  <Animated.Text style={[{ fontFamily: styles.container.fontFamily, fontSize: 40, color: colors.text }, contentStyle]}>Pick your scale here!</Animated.Text>
                  <Animated.View style={[contentStyle]}>
                    <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value" 
                    data={notes} placeholder="Select note...." value={note} onChange={item => setNote(item.value)}>
                    </Dropdown>
                  </Animated.View>
                  <Animated.View style={[contentStyle]}>
                    <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value" 
                    data={modes} placeholder="Select mode...." value={mode} onChange={item => setMode(item.value)}>
                    </Dropdown>
                  </Animated.View>
                  <Animated.View style={[contentStyle]}>
                    <Pressable style={[styles.button, { backgroundColor: (note === "" || mode === "" ? "gray" : colors.primary) }]} 
                      disabled={note === "" || mode === "" ? true : false } onPress={handleSubmit}><Text>Submit</Text></Pressable>
                  </Animated.View>
                </View>}

              {submitted && (scaleNotes.length === 0 ?
              <View style={styles.inner}>
                <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>This scale is impractical!</Text>
                <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>It likely contains double flats or double sharps.</Text>
                <Pressable style={[styles.button, { backgroundColor: colors.primary, margin: 4 }]} onPress={handleReset}><Text>Reset</Text></Pressable>
                <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>Click the reset button to generate a different scale.</Text>
              </View>
              : <View style={styles.inner}>
                  <Text style={{ fontFamily: styles.container.fontFamily, fontSize: 40, color: colors.text }}>{note + " " + mode}</Text>
                  <MusicNotation clef={clef} notes={scaleNotes} />
                  <Pressable style={[styles.button, { backgroundColor: colors.primary, margin: 4 }]} onPress={playSound}><Text>Listen!</Text></Pressable>
                  <Pressable style={[styles.button, { backgroundColor: colors.primary, margin: 4 }]} onPress={handleReset}><Text>Reset</Text></Pressable>
                  <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text }}>Click the reset button to generate a different scale.</Text>
                </View>)}
              
              <Pressable style={styles.homeButton} onPress={() => {navigation.navigate("Welcome")}}>
                <Ionicons name="home" size={48} color={colors.primary}></Ionicons>
              </Pressable>
          </View>
        </ImageBackground>
    )
}