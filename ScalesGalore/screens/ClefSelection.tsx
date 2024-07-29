/**
 * TODO: Shared Element Transition: morph Go button into back button on top left
 */
import { useState, useEffect } from 'react';
import { NavigationProp, RouteProp, useTheme } from '@react-navigation/native';
import { View, Text, Pressable, ImageBackground, Animated } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { styles, dropdownStyles } from '../utilities/styles';
import { RootStackParamList } from '../utilities/types';


type ClefSelectionScreenNavigationProp = NavigationProp<RootStackParamList, 'ClefSelection'>;
type ClefSelectionScreenRouteProp = RouteProp<RootStackParamList, 'ClefSelection'>;
type Props = {
  navigation: ClefSelectionScreenNavigationProp,
  route: ClefSelectionScreenRouteProp
};
/**
 * Clef selection component. This will be used in the first release version.
 * Subsequent releases will replace this with an instrument selection feature.
 */
export default function ClefSelection({ navigation, route }: Props) {
    const [clef, setClef] = useState("");
    const { colors } = useTheme();
    let [fontsLoaded, fontError] = useFonts({
      JosefinSans_400Regular
    });

    const { translateY, translateButton } = route.params;
    const scale = translateY.interpolate({
      inputRange: [-250, 0],
      outputRange: [0.5, 1.0],
      extrapolate: "clamp"
    });

    useEffect(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -250,
          duration: 0,
          useNativeDriver: true
        }),
        Animated.timing(translateButton, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ]).start()
    }, [translateY, translateButton]);

    if(!fontsLoaded && !fontError) {
      return null;
    }
    type Data = "label" | "value";
    const options: Record<Data, string>[] = [
        { label: "Treble", value: "treble" },
        { label: "Bass", value: "bass" }
    ];

    return (
        <ImageBackground source={require("../assets/ScalesGalore-background.png")} style={styles.background}>
          <View style={styles.container}>
              <Animated.Text 
                    style={{ fontFamily: styles.container.fontFamily, 
                    color: colors.text, fontSize: 50, 
                    transform: [{ translateY }, { scale }] }}>ScalesGalore!</Animated.Text>
              <Text style={{ fontFamily: styles.container.fontFamily, color: colors.text, fontSize: 40 }}>Select clef to get started!</Text>
              <Dropdown style={dropdownStyles.dropdown} maxHeight={150} labelField="label" valueField="value"
              data={options} placeholder="Select clef...." value={clef} onChange={item => setClef(item.value)}>
              </Dropdown>
              <Animated.View style={{ transform: [{ translateY: translateButton }]}}>
                <Pressable style={[styles.button, { backgroundColor: (clef === "" ? "gray" : colors.primary) }]}
                disabled={clef === "" ? true : false} onPress={() => { navigation.navigate("Interface", { clef: clef })}}>
                  <Text>Go</Text>
                </Pressable>
              </Animated.View>
              
              <Pressable style={styles.homeButton} onPress={() => {navigation.navigate("Welcome")}}>
                <Ionicons name="home" size={24} color={colors.primary}></Ionicons>
              </Pressable>
          </View>
        </ImageBackground>
    )
}