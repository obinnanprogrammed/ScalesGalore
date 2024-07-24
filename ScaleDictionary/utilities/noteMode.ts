type Data = "label" | "value";

/**
 * Notes for selection in Interface
 */
export const notes: Record<Data, string>[] = [
    { label: "E", value: "E" }, 
    { label: "F", value: "F" }, 
    { label: "F#", value: "F#" },
    { label: "Gb", value: "Gb" }, 
    { label: "G", value: "G" }, 
    { label: "G#", value: "G#" }, 
    { label: "Ab", value: "Ab" },
    { label: "A", value: "A" }, 
    { label: "A#", value: "A#" },
    { label: "Bb", value: "Bb" },
    { label: "B", value: "B" }, 
    { label: "C", value: "C" }, 
    { label: "C#", value: "C#" },
    { label: "Db", value: "Db" }, 
    { label: "D", value: "D" }, 
    { label: "D#", value: "D#" },
    { label: "Eb", value: "Eb" }
];

/**
 * Modes for selection in Interface. Currently limited to major and minor modes,
 * but the other modes may be added in a later release.
 */
export const modes: Record<Data, string>[] = [
    { label: "Major", value: "Major" }, 
    { label: "Minor", value: "Minor" }
];