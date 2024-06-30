/**
 * Major Scales
 * Care is taken to avoid scales that use double sharps or double flats
 */
export const majorScales: Record<string, string[]> = {
    "E Major": ["E", "F#", "G#", "A", "B", "C#", "D#", "E"],
    "F Major": ["F", "G", "A", "Bb", "C", "D", "E", "F"],
    "F# Major": ["F#", "G#", "A#", "B", "C#", "D#", "E#", "F#"],
    "Gb Major": ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F", "Gb"],
    "G Major": ["G", "A", "B", "C", "D", "E", "F#", "G"],
    "Ab Major": ["Ab", "Bb", "C", "Db", "Eb", "F", "G", "Ab"],
    "A Major": ["A", "B", "C#", "D", "E", "F#", "G#", "A"],
    "Bb Major": ["Bb", "C", "D", "Eb", "F", "G", "A", "Bb"],
    "B Major": ["B", "C#", "D#", "E", "F#", "G#", "A#", "B"],
    "C Major": ["C", "D", "E", "F", "G", "A", "B", "C"],
    "C# Major": ["C#", "D#", "E#", "F#", "G#", "A#", "B#", "C#"],
    "Db Major": ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C", "Db"],
    "D Major": ["D", "E", "F#", "G", "A", "B", "C#", "D"],
    "Eb Major": ["Eb", "F", "G", "Ab", "Bb", "C", "D", "Eb"]
}

/**
 * Minor Scales
 * Care is taken to avoid scales that use double sharps or double flats
 */
export const minorScales: Record<string, string[]> = {
    "E Minor": ["E", "F#", "G", "A", "B", "C", "D", "E"],
    "F Minor": ["F", "G", "Ab", "Bb", "C", "Db", "Eb", "F"],
    "F# Minor": ["F#", "G#", "A", "B", "C#", "D", "E", "F#"],
    "G Minor": ["G", "A", "Bb", "C", "D", "Eb", "F", "G"],
    "G# Minor": ["G#", "A#", "B", "C#", "D#", "E", "F#", "G#"],
    "Ab Minor": ["Ab", "Bb", "Cb", "Db", "Eb", "Fb", "Gb", "Ab"],
    "A Minor": ["A", "B", "C", "D", "E", "F", "G", "A"],
    "A# Minor": ["A#", "B#", "C#", "D#", "E#", "F#", "G#", "A#"],
    "Bb Minor": ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab", "Bb"],
    "B Minor": ["B", "C#", "D", "E", "F#", "G", "A", "B"],
    "C Minor": ["C", "D", "Eb", "F", "G", "Ab", "Bb", "C"],
    "C# Minor": ["C#", "D#", "E", "F#", "G#", "A", "B", "C#"],
    "D Minor": ["D", "E", "F", "G", "A", "Bb", "C", "D"],
    "D# Minor": ["D#", "E#", "F#", "G#", "A#", "B", "C#", "D#"],
    "Eb Minor": ["Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db", "Eb"]
}