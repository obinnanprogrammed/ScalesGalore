import { ReactNativeSVGContext, NotoFontPack } from 'standalone-vexflow-context';
import { View } from 'react-native';
import Vex from 'vexflow';

export default function MusicNotation() {
    // setting up the staff
    const { Stave, StaveNote, Formatter, Accidental, Beam } = Vex.Flow;
    const context = new ReactNativeSVGContext(NotoFontPack, { width: 400, height: 400 });
    const stave = new Stave(50, 50, 300);
    stave.setContext(context);
    stave.addClef('bass');
    stave.addTimeSignature('4/4');
    stave.draw();

    // notes - A Major Scale, ascending
    const quarter = [
        new StaveNote({ clef: 'bass', keys: ['a/2'], duration: 'q' }),
    ];
    const m1Group1 = [
        new StaveNote({ clef: 'bass', keys: ['b/2'], duration: '8' }),
        new StaveNote({ clef: 'bass', keys: ['c#/3'], duration: '8' }).addAccidental(0, new Accidental("#"))
    ]
    const m1Group2 = [
        new StaveNote({ clef: 'bass', keys: ['d/3'], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: 'bass', keys: ['e/3'], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: 'bass', keys: ['f#/3'], duration: '8' }).addAccidental(0, new Accidental("#")).setStemDirection(-1),
        new StaveNote({ clef: 'bass', keys: ['g#/3'], duration: '8' }).addAccidental(0, new Accidental("#")).setStemDirection(-1),
    ]
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
        new StaveNote({ clef: 'bass', keys: ['a/3'], duration: 'q' }).setStemDirection(-1),
    ];
    const m2Group1 = [
        new StaveNote({ clef: 'bass', keys: ['g#/3'], duration: '8' }).addAccidental(0, new Accidental("#")).setStemDirection(-1),
        new StaveNote({ clef: 'bass', keys: ['f#/3'], duration: '8' }).addAccidental(0, new Accidental("#")).setStemDirection(-1)
    ]
    const m2Group2 = [
        new StaveNote({ clef: 'bass', keys: ['e/3'], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: 'bass', keys: ['d/3'], duration: '8' }).setStemDirection(-1),
        new StaveNote({ clef: 'bass', keys: ['c#/3'], duration: '8' }).addAccidental(0, new Accidental("#")).setStemDirection(-1),
        new StaveNote({ clef: 'bass', keys: ['b/2'], duration: '8' }).setStemDirection(-1),
    ]
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
        new StaveNote({ clef: 'bass', keys: ['a/2'], duration: 'q' })
    ];
    Formatter.FormatAndDraw(context, oneMore, lastNote);
    return (
        <View>{ context.render() }</View>
    )
}