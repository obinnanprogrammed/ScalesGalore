import { FC } from 'react'
import { ReactNativeSVGContext, NotoFontPack } from 'standalone-vexflow-context';
import { View } from 'react-native';
import Vex from 'vexflow';

interface MusicNotationProps {
    clef: string,
    notes: string[]
}

const MusicNotation: FC<MusicNotationProps> = ({ clef, notes }) => {
    let currOctave: number = 2;
    const { Stave, StaveNote, Formatter, Accidental, Beam } = Vex.Flow;
    const context = new ReactNativeSVGContext(NotoFontPack, { width: 400, height: 400 });
    const stave = new Stave(50, 50, 300);
    stave.setContext(context);
    stave.addClef(clef);
    stave.addTimeSignature('4/4');
    stave.draw();

    // notes - A Major Scale, ascending
    const quarter = [
        new StaveNote({ clef: clef, keys: [`${notes[0]}/${notes[0].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: 'q' }),
    ];
    if(notes[0].includes("#")) {
        quarter[0].addAccidental(0, new Accidental("#"));
    } else if(notes[0].includes("b")) {
        quarter[0].addAccidental(0, new Accidental("b"));
    }
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
    }
    const m1Group2 = [
        new StaveNote({ clef: clef, keys: [`${notes[3]}/${notes[3].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: clef, keys: [`${notes[4]}/${notes[4].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: clef, keys: [`${notes[5]}/${notes[5].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: clef, keys: [`${notes[6]}/${notes[6].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: '8' }).setStemDirection(-1),
    ]
    for(let i: number = 0; i < m1Group2.length; i++) {
        if(notes[i+3].includes("#")) {
            m1Group2[i].addAccidental(0, new Accidental("#"));
        } else if(notes[i+3].includes("b")) {
            m1Group2[i].addAccidental(0, new Accidental("b"));
        }
    }
    const group1Beam = new Beam(m1Group1);
    const group2Beam = new Beam(m1Group2);
    const m1Notes = quarter.concat(m1Group1, m1Group2);
    Formatter.FormatAndDraw(context, stave, m1Notes);
    group1Beam.setContext(context).draw();
    group2Beam.setContext(context).draw();

    // staff: A Major Scale, descending:
    const descendingStaff = new Stave(stave.getX(), stave.getBottomLineY(), stave.getWidth());
    descendingStaff.setContext(context);
    descendingStaff.draw();
    const secondQuarter = [
        new StaveNote({ clef: clef, keys: [`${notes[7]}/${notes[7].includes("C") ? (++currOctave).toString() : currOctave.toString()}`], duration: 'q' }).setStemDirection(-1),
    ];
    if(notes[7].includes("C")) {
        currOctave--;
    }
    if(notes[7].includes("#")) {
        secondQuarter[0].addAccidental(0, new Accidental("#"));
    } else if(notes[7].includes("b")) {
        secondQuarter[0].addAccidental(0, new Accidental("b"));
    }
    const m2Group1 = [
        new StaveNote({ clef: clef, keys: [`${notes[6]}/${notes[6].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: clef, keys: [`${notes[5]}/${notes[5].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }).setStemDirection(-1)
    ]
    for(let i: number = 0; i < m2Group1.length; i++) {
        if(notes[6-i].includes("#")) {
            m2Group1[i].addAccidental(0, new Accidental("#"));
        } else if(notes[6-i].includes("b")) {
            m2Group1[i].addAccidental(0, new Accidental("b"));
        }
    }
    const m2Group2 = [
        new StaveNote({ clef: clef, keys: [`${notes[4]}/${notes[4].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: clef, keys: [`${notes[3]}/${notes[3].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: clef, keys: [`${notes[2]}/${notes[2].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: clef, keys: [`${notes[1]}/${notes[1].includes("C") ? (currOctave--).toString() : currOctave.toString()}`], duration: '8' }).setStemDirection(-1),
    ]
    for(let i: number = 0; i < m2Group2.length; i++) {
        if(notes[4-i].includes("#")) {
            m2Group2[i].addAccidental(0, new Accidental("#"));
        } else if(notes[4-i].includes("b")) {
            m2Group2[i].addAccidental(0, new Accidental("b"));
        }
    }
    const group3Beam = new Beam(m2Group1);
    const group4Beam = new Beam(m2Group2);
    const m2Notes = secondQuarter.concat(m2Group1, m2Group2);
    Formatter.FormatAndDraw(context, descendingStaff, m2Notes);
    group3Beam.setContext(context).draw();
    group4Beam.setContext(context).draw();

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
    Formatter.FormatAndDraw(context, oneMore, lastNote);

    return (
        <View>{ context.render() }</View>
    )
}

export default MusicNotation;
