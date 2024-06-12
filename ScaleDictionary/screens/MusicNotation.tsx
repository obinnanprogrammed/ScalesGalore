import { FC } from 'react'
import { ReactNativeSVGContext, NotoFontPack } from 'standalone-vexflow-context';
import { View } from 'react-native';
import Vex from 'vexflow';

interface MusicNotationProps {
    clef: string,
    notes: string[]
}

const MusicNotation: FC<MusicNotationProps> = ({ clef, notes }) => {
    let altOctaveKeys: string[] = ["Db", "D", "Eb"];

    // setting octave
    let currOctave: number = (clef === "treble" ? 4 : 2);
    // resetting for bass clef Db, D, Eb to avoid below the staff notes
    if(clef === "bass" && altOctaveKeys.includes(notes[0])) {
        currOctave = 3;
    }

    // setting the staff
    const { Stave, StaveNote, Formatter, Accidental, Beam } = Vex.Flow;
    const context = new ReactNativeSVGContext(NotoFontPack, { width: 400, height: 400 });
    const stave = new Stave(50, 50, 300);
    stave.setContext(context);
    stave.addClef(clef);
    stave.addTimeSignature('4/4');
    stave.draw();

    // ascending notes
    const quarter = [
        new StaveNote({ clef: clef, keys: [`${notes[0]}/${notes[0].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: 'q' }),
    ];
    // check for accidentals
    if(notes[0].includes("#")) {
        quarter[0].addAccidental(0, new Accidental("#"));
    } else if(notes[0].includes("b")) {
        quarter[0].addAccidental(0, new Accidental("b"));
    }
    quarter[0].autoStem();
    const m1Group1 = [
        new StaveNote({ clef: clef, keys: [`${notes[1]}/${notes[1].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: '8' }),
        new StaveNote({ clef: clef, keys: [`${notes[2]}/${notes[2].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: '8' })
    ]
    for(let i: number = 0; i < m1Group1.length; i++) {
        if(notes[i+1].includes("#")) {
            m1Group1[i].addAccidental(0, new Accidental("#"));
        } else if(notes[i+1].includes("b")) {
            m1Group1[i].addAccidental(0, new Accidental("b"));
        }
        m1Group1[i].autoStem();
    }
    const m1Group2 = [
        new StaveNote({ clef: clef, keys: [`${notes[3]}/${notes[3].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: '8' }),
        new StaveNote({ clef: clef, keys: [`${notes[4]}/${notes[4].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: '8' }),
        new StaveNote({ clef: clef, keys: [`${notes[5]}/${notes[5].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: '8' }),
        new StaveNote({ clef: clef, keys: [`${notes[6]}/${notes[6].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: '8' }),
    ]
    for(let i: number = 0; i < m1Group2.length; i++) {
        if(notes[i+3].includes("#")) {
            m1Group2[i].addAccidental(0, new Accidental("#"));
        } else if(notes[i+3].includes("b")) {
            m1Group2[i].addAccidental(0, new Accidental("b"));
        }
        m1Group2[i].autoStem();
    }
    // drawing notes and beams
    const m1Notes = quarter.concat(m1Group1, m1Group2);
    const m1Beams = Beam.generateBeams(m1Notes);
    Formatter.FormatAndDraw(context, stave, m1Notes);
    m1Beams.forEach((b) => { b.setContext(context).draw() })

    // descending notes
    const descendingStaff = new Stave(stave.getX(), stave.getBottomLineY(), stave.getWidth());
    descendingStaff.setContext(context);
    descendingStaff.draw();
    const secondQuarter = [
        new StaveNote({ clef: clef, keys: [`${notes[7]}/${notes[7].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: 'q' }),
    ];
    if(notes[7].includes("C")) {
        currOctave--;
    }
    if(notes[7].includes("#")) {
        secondQuarter[0].addAccidental(0, new Accidental("#"));
    } else if(notes[7].includes("b")) {
        secondQuarter[0].addAccidental(0, new Accidental("b"));
    }
    secondQuarter[0].autoStem();

    const m2Group1 = [
        new StaveNote({ clef: clef, keys: [`${notes[6]}/${notes[6].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }),
        new StaveNote({ clef: clef, keys: [`${notes[5]}/${notes[5].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' })
    ]
    for(let i: number = 0; i < m2Group1.length; i++) {
        if(notes[6-i].includes("#")) {
            m2Group1[i].addAccidental(0, new Accidental("#"));
        } else if(notes[6-i].includes("b")) {
            m2Group1[i].addAccidental(0, new Accidental("b"));
        }
        m2Group1[i].autoStem();
    }
    const m2Group2 = [
        new StaveNote({ clef: clef, keys: [`${notes[4]}/${notes[4].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }),
        new StaveNote({ clef: clef, keys: [`${notes[3]}/${notes[3].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }),
        new StaveNote({ clef: clef, keys: [`${notes[2]}/${notes[2].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }),
        new StaveNote({ clef: clef, keys: [`${notes[1]}/${notes[1].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }),
    ]
    for(let i: number = 0; i < m2Group2.length; i++) {
        if(notes[4-i].includes("#")) {
            m2Group2[i].addAccidental(0, new Accidental("#"));
        } else if(notes[4-i].includes("b")) {
            m2Group2[i].addAccidental(0, new Accidental("b"));
        }
        m2Group2[i].autoStem();
    }
    // beams again
    const m2Notes = secondQuarter.concat(m2Group1, m2Group2);
    const m2Beams = Beam.generateBeams(m2Notes);
    Formatter.FormatAndDraw(context, descendingStaff, m2Notes);
    m2Beams.forEach((b) => { b.setContext(context).draw() });
    
    // getting that last note in there
    const oneMore = new Stave(descendingStaff.getX()+descendingStaff.getWidth()*3/8, descendingStaff.getBottomLineY(), 75);
    oneMore.setContext(context);
    oneMore.draw();
    const lastNote = [
        new StaveNote({ clef: clef, keys: [notes[0]+"/"+currOctave.toString()], duration: 'q' })
    ];
    if(notes[0].includes("#")) {
        lastNote[0].addAccidental(0, new Accidental("#"));
    } else if(notes[0].includes("b")) {
        lastNote[0].addAccidental(0, new Accidental("b"));
    }
    lastNote[0].autoStem();
    Formatter.FormatAndDraw(context, oneMore, lastNote);

    return (
        <View>{ context.render() }</View>
    )
}

export default MusicNotation;
