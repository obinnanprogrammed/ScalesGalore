/**
 * TODO: Change Go! button to an icon button (possibly)
 * Replace text with image of app name.
 * change color to gray on animation start (too unfeasible, will change to something else, probably a fly off)
 * Examine why TypeScript keeps throwing "error" when using runOnJS(navigation.navigate)("ClefSelection")
 */
import { useRef, useCallback } from 'react';
import { useNavigation, NavigationProp, useTheme, useFocusEffect } from '@react-navigation/native';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
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
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const titleStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateY: translateY.value },
          { scale: scale.value }
        ]
      };
    });

    const toClefSelection = () => {
      navigation.navigate("ClefSelection");
    };

    const handlePress = () => {
      translateY.value = withTiming(-340, { duration: 500 });
      scale.value = withTiming(0.5, { duration: 500 }, () => {
        runOnJS(toClefSelection)();
      });
    };

    useFocusEffect(useCallback(() => {
      translateY.value = 0;
      scale.value = 1;
    }, [translateY, scale]))

    if(!fontsLoaded && !fontError) {
      return null;
    }
    return (
        <ImageBackground source={require("../assets/ScalesGalore-background.png")} style={styles.background}>
          <View style={styles.container}>
              <Animated.Text 
                style={[{ fontFamily: styles.container.fontFamily, 
                color: colors.text, fontSize: 50 }, titleStyle]}>ScalesGalore!</Animated.Text>
              <Pressable style={[styles.button, { backgroundColor: colors.primary }]} 
                onPress={handlePress}><Text>Go</Text></Pressable>
          </View>
        </ImageBackground>
    )
}
