/**
 * TODO: Change Go! button to an icon button (possibly)
 * Considering name change to Scales Galore!
 * Replace text with image of app name.
 * change color to gray on animation start (too unfeasible, will change to something else, probably a fly off)
 */
import { useRef, useCallback } from 'react';
import { useNavigation, NavigationProp, useTheme, useFocusEffect } from '@react-navigation/native';
import { View, Text, Pressable, ImageBackground, Animated } from 'react-native';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { styles } from '../utilities/styles';
import { RootStackParamList } from '../utilities/types';


type WelcomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Welcome'>;

/**
 * Welcome screen component.
 */
export default function Welcome() {
    const navigation = useNavigation<WelcomeScreenNavigationProp>();
    const { colors } = useTheme();
    let [fontsLoaded, fontError] = useFonts({
      JosefinSans_400Regular
    })

    // title animation
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = translateY.interpolate({
      inputRange: [-340, 0],
      outputRange: [0.5, 1.0],
      extrapolate: "clamp"
    });

    // button animation
    const translateButtonY = useRef(new Animated.Value(0)).current;
    const animateColor = useRef(new Animated.Value(0)).current;
    const color = animateColor.interpolate({
      inputRange: [0, 1],
      outputRange: ["#98FB98", "gray"]
    });

    const handlePress = () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -340,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(translateButtonY, {
          toValue: 90,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(animateColor, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false
        })
      ]).start(() => navigation.navigate("ClefSelection", { translateY: translateY, translateButton: translateButtonY }));
    }

    useFocusEffect(useCallback(() => {
      translateY.setValue(0);
      translateButtonY.setValue(0);
      animateColor.setValue(0);
    }, [translateY, translateButtonY, animateColor]))

    if(!fontsLoaded && !fontError) {
      return null;
    }
    return (
        <ImageBackground source={require("../assets/ScalesGalore-background.png")} style={styles.background}>
          <View style={styles.container}>
              <Animated.Text 
                style={{ fontFamily: styles.container.fontFamily, 
                color: colors.text, fontSize: 50, 
                transform: [{ translateY }, { scale }] }}>ScalesGalore!</Animated.Text>
              <Animated.View style={{ transform: [ { translateY: translateButtonY }]}}>
                <Pressable style={[styles.button, { backgroundColor: colors.primary }]} 
                onPress={handlePress}><Text>Go</Text></Pressable>
              </Animated.View>
          </View>
        </ImageBackground>
    )
}
