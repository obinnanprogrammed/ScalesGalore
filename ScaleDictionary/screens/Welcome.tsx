/**
 * TODO: Change Go! button to an icon button
 * title animation: front and center on welcome screen, move to top for clef selection and interface.
 * Considering name change to Pierce the Scale; ScaleBook
 * Replace text with image of app name.
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

    const handlePress = () => {
      Animated.timing(translateY, {
        toValue: -340,
        duration: 500,
        useNativeDriver: true
      }).start(() => navigation.navigate("ClefSelection", { translateY: translateY }));
    }

    useFocusEffect(useCallback(() => {
      translateY.setValue(0);
    }, [translateY]))

    if(!fontsLoaded && !fontError) {
      return null;
    }
    return (
        <ImageBackground source={require("../assets/ScaleDictionary-background.png")} style={styles.background}>
          <View style={styles.container}>
              <Animated.Text 
                style={{ fontFamily: styles.container.fontFamily, 
                color: colors.text, fontSize: 50, 
                transform: [{ translateY }, { scale }] }}>ScaleDictionary!</Animated.Text>
              <Pressable style={[styles.button, { backgroundColor: colors.primary }]} 
              onPress={handlePress}><Text>Go</Text></Pressable>
          </View>
        </ImageBackground>
    )
}
