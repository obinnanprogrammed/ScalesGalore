type key = "key" | "octave" | "clef";
type val = string | number;

export const instruments: Record<string, Record<key, val>> = {
    "flute": {
        clef: "treble",
        key: "C",
        octave: 4
    },
    "oboe": {
        clef: "treble",
        key: "C",
        octave: 4
    },
    "clarinet-eb": {
        clef: "treble",
        key: "Eb",
        octave: 4
    },
    "clarinet-bb": {
        clef: "treble",
        key: "Bb",
        octave: 3
    },
    "clarinet-bass": {
        clef: "treble",
        key: "Bb",
        octave: 3
    },
    "saxophone-soprano": {
        clef: "treble",
        key: "Bb",
        octave: 4
    },
    "saxophone-alto": {
        clef: "treble",
        key: "Eb",
        octave: 4
    },
    "saxophone-tenor": {
        clef: "treble",
        key: "Bb",
        octave: 3
    },
    "saxophone-baritone": {
        clef: "treble",
        key: "Eb",
        octave: 3
    },
    "horn-in-f": {
        clef: "treble",
        key: "F",
        octave: 3
    },
    "trumpet-bb": {
        clef: "treble",
        key: "Bb",
        octave: 4
    },
    "trombone": {
        clef: "bass",
        key: "C",
        octave: 3
    },
    "euphonium": {
        clef: "bass",
        key: "C",
        octave: 3
    },
    "tuba": {
        clef: "bass",
        key: "C",
        octave: 2
    },
    "keyboard-mallet": {
        clef: "treble",
        key: "C",
        octave: 4
    },
    "violin": {
        clef: "treble",
        key: "C",
        octave: 4
    },
    "viola": {
        clef: "alto",
        key: "C",
        octave: 4
    },
    "cello": {
        clef: "bass",
        key: "C",
        octave: 3
    },
    "bass": {
        clef: "bass",
        key: "C",
        octave: 3
    }
}