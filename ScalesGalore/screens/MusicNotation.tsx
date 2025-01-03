/**
 * TODO: Might need to alter starting octave depending on instrument and scale (e.g. tuba on anything beyond F scales)
 */
import { useState, useEffect } from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';

interface MusicNotationProps {
    clef: string,
    octave: number,
    notes: string[]
}

const { height, width } = Dimensions.get("window");
/**
 * This component renders the sheet music for the scale.
 * It accepts the clef and notes passed in from Interface and sends them to a Node/Express backend server
 * to build the SVG for the sheet music. 
 */
export default function MusicNotation({ clef, octave, notes }: MusicNotationProps) {
    const [windowHeight, setWindowHeight] = useState<number>(height);
    const [windowWidth, setWindowWidth] = useState<number>(width);
    const [loading, setLoading] = useState<boolean>(true);
    const [svg, setSvg] = useState<string | null>(null);
    useEffect(() => {
        const dimChange = Dimensions.addEventListener("change", ({ window }) => {
            setWindowHeight(window.height);
            setWindowWidth(window.width);
        });
        return () => dimChange?.remove();
    });
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 10.0.0.126 for home home, 10.30.25.15 for apartment, 10.244.220.28 for school
                const response = await axios.post("http://10.0.0.126:3000/render", {
                    clef: clef,
                    notes: notes,
                    startingOctave: octave
                });
                setSvg(response.data);
                setLoading(false);
            } catch(e) {
                console.error(e);
                setLoading(false);
            }
        }
        
        fetchData();
    }, [])

    if(loading) {
        return <ActivityIndicator />;
    }
    
    // scaling for different-sized screens
    const svgWidth = 400;
    const svgHeight = 300;
    const scaleFactor = Math.min(windowWidth / svgWidth, windowHeight / svgHeight);
    const viewBox = `0 0 ${svgWidth} ${svgHeight}`;
    const scaledWidth = svgWidth * scaleFactor;
    const scaledHeight = svgHeight * scaleFactor;
    const offsetX = (windowWidth - svgWidth) / 2;
    const offsetY = (windowHeight - svgHeight) / 64;

    return (
        <View>
            <SvgXml xml={svg} 
                width={scaledWidth} 
                height={scaledHeight}
                viewBox={viewBox} 
                style={{ marginLeft: offsetX, marginTop: offsetY }} />
        </View>
    )
}