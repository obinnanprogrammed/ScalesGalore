import { ReactNativeSVGContext, NotoFontPack } from 'standalone-vexflow-context';
import { View } from 'react-native';
import Vex from 'vexflow';

export default function MusicNotation() {
    const VF = Vex.Flow;
    const context = new ReactNativeSVGContext(NotoFontPack, { width: 400, height: 400 });
    const stave = new VF.Stave(100, 150, 200);
    stave.setContext(context);
    stave.addClef('bass');
    stave.addTimeSignature('4/4');
    stave.draw();

    const notes = [
        new VF.StaveNote({ clef: 'bass', keys: ['a/2'], duration: 'h' }),
        new VF.StaveNote({ clef: 'bass', keys: ['e/3'], duration: 'h' }).setStemDirection(-1)
    ];
    VF.Formatter.FormatAndDraw(context, stave, notes);
    return (
        <View>{ context.render() }</View>
    )
}