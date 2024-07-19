/**
 * TODO: figure out how to appropriately scale notation to fit smaller screens
 */
import { FC, useState, useEffect } from 'react'
import { View, Image, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import { SvgXml } from 'react-native-svg';

interface MusicNotationProps {
    clef: string,
    notes: string[]
}

const { height, width } = Dimensions.get("window");
const MusicNotation: FC<MusicNotationProps> = ({ clef, notes }) => {
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

    // setting octave
    let currOctave: number = (clef === "treble" ? 4 : 2);
    // resetting for bass clef Db, D, Eb to avoid below the staff notes
    if(clef === "bass" && altOctaveKeys.includes(notes[0])) {
        currOctave = 3;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://10.0.0.126:3000/render", {
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

    return (
        <View>
            <SvgXml xml={svg} width={windowWidth} height={windowWidth*(3/4)} />
        </View>
    )
}

export default MusicNotation;
