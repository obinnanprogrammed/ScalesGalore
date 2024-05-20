import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

function Interface() {
    const navigation = useNavigation();
    const htmlContent = `<!DOCTYPE html>
    <html>
        <head>
            <script src="https://unpkg.com/vexflow/releases/vexflow-min.js"></script>
        </head>
        <body>
            <div id="vf-container">
    
            </div>
            <script>
                window.onload = function() {
                    const VF = Vex.Flow;
                    const div = document.getElementById("vf-container");
                    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
                    renderer.resize(1000, 300);
                    const context = renderer.getContext();
                    const stave = new VF.Stave(250, 40, 500);
                    stave.addClef("bass").addTimeSignature("4/4");
                    stave.setContext(context).draw();
    
                    const notes = [
                        new VF.StaveNote({
                        clef: "bass",
                        keys: ["a/2"],
                        duration: "q"
                        }),
                        new VF.StaveNote({
                        clef: "bass",
                        keys: ["c#/3"],
                        duration: "q"
                        }).addAccidental(0, new VF.Accidental("#")),
                        new VF.StaveNote({
                        clef: "bass",
                        keys: ["e/3"],
                        duration: "q"
                        }).setStemDirection(-1),
                        new VF.StaveNote({
                        clef: "bass",
                        keys: ["a/3"],
                        duration: "q"
                        }).setStemDirection(-1)
                    ];
    
                    VF.Formatter.FormatAndDraw(context, stave, notes);
                };
            </script>
        </body>
    </html>`
    return (
        <View style={styles.container}>
            <Text>This interface is so mid.</Text>
            <View style={{ height: 100 }}>
                <WebView source={{ html: htmlContent }} style={{ height: 100, width: 300  }} />
            </View>
            <Button title="Return Home" onPress={() => {navigation.navigate("Welcome")}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default Interface;