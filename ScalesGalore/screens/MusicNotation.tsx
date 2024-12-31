/**
 * TODO: N/A
 */
import { useState, useEffect } from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';

interface MusicNotationProps {
    clef: string,
    notes: string[]
}

const { height, width } = Dimensions.get("window");
/**
 * This component renders the sheet music for the scale.
 * It accepts the clef and notes passed in from Interface and sends them to a Node/Express backend server
 * to build the SVG for the sheet music. 
 */
export default function MusicNotation({ clef, notes }: MusicNotationProps) {
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
    
    // in bass clef, these will go too far below the staff (restriction to be removed and reworked later)
    let altOctaveKeys: string[] = ["Db", "D", "D#", "Eb"]; 

    // setting octave (will be reworked)
    let currOctave: number = (clef === "treble" ? 4 : 2);
    // resetting for bass clef Db, D, Eb to avoid below the staff notes
    if(clef === "bass" && altOctaveKeys.includes(notes[0])) {
        currOctave = 3;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 10.0.0.126 for home home, 10.30.25.15 for apartment, 10.244.220.28 for school
                const response = await axios.post("http://10.30.25.15:3000/render", {
                    clef: clef,
                    notes: notes,
                    startingOctave: currOctave
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