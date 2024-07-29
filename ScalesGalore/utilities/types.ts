import { Animated } from 'react-native';

export type RootStackParamList = {
    Welcome: undefined;
    ClefSelection: { translateY: Animated.Value, translateButton: Animated.Value };
    Interface: { clef: string };
};