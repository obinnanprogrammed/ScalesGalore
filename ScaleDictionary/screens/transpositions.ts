/**
 * Transposition map
 * Maps key of instrument to map of key in concert pitch to key for instrument
 * Example: Bb Trumpet -> F (concert pitch) -> G (Bb trumpet pitch) (Bb trumpet sounds one whole step lower than written)
 * Example: Eb Alto Saxophone -> Ab (concert pitch) -> F (Eb alto sax pitch) (Eb alto sax sounds a major sixth lower than written)
 * Currently limited to most common keys of instruments (minus C, as they don't transpose), plus D and G for support
 * of legacy instruments (G bugles, D trumpet, D clarinet)
 */

export const transpositions: Record<string, Record<string, string>> = {
    "Bb": {
        "E": "F#",
        "F": "G",
        "F#": "G#",
        "Gb": "Ab",
        "G": "A",
        "G#": "A#",
        "Ab": "Bb",
        "A": "B",
        "Bb": "B",
        "B": "C#",
        "Cb": "Db",
        "C": "D",
        "C#": "D#",
        "Db": "Eb",
        "D": "E",
        "D#": "E#",
        "Eb": "F"
    },
    "D": {
        "E": "D",
        "F": "Eb",
        "F#": "E",
        "Gb": "Fb",
        "G": "F",
        "G#": "F#",
        "Ab": "Gb",
        "A": "G",
        "Bb": "Ab",
        "B": "A",
        "Cb": "Bbb",
        "C": "Bb",
        "C#": "B",
        "Db": "Cb",
        "D": "C",
        "D#": "C#",
        "Eb": "Db"
    },
    "Eb": {
        "E": "C#",
        "F": "D",
        "F#": "D#",
        "Gb": "Eb",
        "G": "E",
        "G#": "E#",
        "Ab": "F",
        "A": "F#",
        "Bb": "G",
        "B": "G#",
        "Cb": "Ab",
        "C": "A",
        "C#": "A#",
        "Db": "Bb",
        "D": "B",
        "D#": "B#",
        "Eb": "C"
    },
    "F": {
        "E": "B",
        "F": "C",
        "F#": "C#",
        "Gb": "Db",
        "G": "D",
        "G#": "D#",
        "Ab": "Eb",
        "A": "E",
        "Bb": "F",
        "B": "F#",
        "Cb": "Gb",
        "C": "G",
        "C#": "G#",
        "Db": "Ab",
        "D": "A",
        "D#": "A#",
        "Eb": "Bb"
    },
    "G": {
        "E": "A",
        "F": "Bb",
        "F#": "B",
        "Gb": "Cb",
        "G": "C",
        "G#": "C#",
        "Ab": "Db",
        "A": "D",
        "Bb": "Eb",
        "B": "E",
        "Cb": "Fb",
        "C": "F",
        "C#": "F#",
        "Db": "Gb",
        "D": "G",
        "D#": "G#",
        "Eb": "Ab"
    }
}