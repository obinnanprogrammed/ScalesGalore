
type key = "key" | "octave" | "clef";
type val = string | number;
type Data = "label" | "value";

/**
 * Instrument list with clef, key, and octave.
 * Will be used in instrument selection screen and in transposition for music generation.
 */
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
    "english-horn": {
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
        octave: 4
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

/**
 * Options for drop-down in instrument selection screen.
 */
export const options: Record<Data, string>[] = [
    { label: "Flute", value: "flute" },
    { label: "Oboe", value: "oboe" },
    { label: "English Horn", value: "english-horn" },
    { label: "Eb Clarinet", value: "clarinet-eb" },
    { label: "Bb Clarinet", value: "clarinet-bb" },
    { label: "Bass Clarinet", value: "clarinet-bass" },
    { label: "Soprano Saxophone", value: "saxophone-soprano" },
    { label: "Alto Saxophone", value: "saxophone-alto" },
    { label: "Tenor Saxophone", value: "saxophone-tenor" },
    { label: "Baritone Saxophone", value: "saxophone-baritone" },
    { label: "Horn in F", value: "horn-in-f" },
    { label: "Bb Trumpet", value: "trumpet-bb" },
    { label: "Trombone", value: "trombone" },
    { label: "Euphonium", value: "euphonium" },
    { label: "Tuba", value: "tuba" },
    { label: "Piano/Keyboard Mallet", value: "keyboard-mallet" },
    { label: "Violin", value: "violin" },
    { label: "Viola", value: "viola" },
    { label: "Cello", value: "cello" },
    { label: "Bass", value: "bass" }
]