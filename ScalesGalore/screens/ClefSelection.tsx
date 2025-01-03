/**
 * TODO: change out clef selection for instrument selection
 * New file for instrument to clef, octave, key
 * ISSUE: Response issues with drop down
 */
import { useState, useCallback } from 'react';
import { NavigationProp, useTheme, useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { styles, dropdownStyles } from '../utilities/styles';
import { RootStackParamList } from '../utilities/types';
import { options } from '../utilities/instrumentInfo';

type ClefSelectionScreenNavigationProp = NavigationProp<RootStackParamList, 'ClefSelection'>;
/**
 * Clef selection component. This will be used in the first release version.
 * Subsequent releases will replace this with an instrument selection feature.
 * Testing, testing, 1, 2, 3...preparing for instrument selection.
 */
export default function ClefSelection() {
    const navigation = useNavigation<ClefSelectionScreenNavigationProp>();
    const [instrument, setInstrument] = useState("");
    const { colors } = useTheme();
    let [fontsLoaded, fontError] = useFonts({
      JosefinSans_400Regular
    });
    const scale = useSharedValue(0);

    // magnify content when transitioning from Welcome
    const contentStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }]
      };
    });

    useFocusEffect(useCallback(() => {
      scale.value = 0;
      scale.value = withTiming(1, { duration: 500 });
    }, [scale]))

    const toInterface = () => {
      // will change for instrument
      navigation.navigate("Interface", { instrument: instrument });
    }

    // scale down, transition to main interface!
    const handlePress = () => {
      scale.value = withTiming(0, { duration: 500 }, () => {
        runOnJS(toInterface)();
      })
    }

    if(!fontsLoaded && !fontError) {
      return null;
    }

    return (
        <ImageBackground source={require("../assets/ScalesGalore-background.png")} style={styles.background}>
          <View style={styles.container}>
              <Text style={{ fontFamily: styles.container.fontFamily, 
                color: colors.text, fontSize: 25, position: "absolute", top: 26 }}>ScalesGalore!</Text>

              <Animated.Text style={[{ fontFamily: styles.container.fontFamily, color: colors.text, 
                fontSize: 25 }, contentStyle]}>Select instrument to get started!</Animated.Text>
              <Animated.View style={[contentStyle]}>
                <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value"
                data={options} placeholder="Select instrument...." value={instrument} onChange={item => setInstrument(item.value)}>
                </Dropdown>
              </Animated.View>
              <Animated.View style={[contentStyle]}>
                <Pressable style={[styles.button, { backgroundColor: (instrument === "" ? "gray" : colors.primary) }]}
                disabled={instrument === "" ? true : false} onPress={handlePress}>
                  <Text>Go</Text>
                </Pressable>
              </Animated.View>

              <Pressable style={styles.homeButton} onPress={() => {navigation.navigate("Welcome")}}>
                <Ionicons name="home" size={48} color={colors.primary}></Ionicons>
              </Pressable>
          </View>
        </ImageBackground>
    )
}