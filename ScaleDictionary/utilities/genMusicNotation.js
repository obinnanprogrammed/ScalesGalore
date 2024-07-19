const express = require('express');
const { JSDOM } = require('jsdom');
const { createCanvas } = require('canvas');
const Vex = require('vexflow');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/render', (req, res) => {
    const { clef, notes, startingOctave } = req.body;

    const { window } = new JSDOM(`<div id="vf-container"></div>`, { runScripts: "dangerously" });
    const { Renderer, Formatter, Stave, StaveNote, Beam, Accidental } = Vex.Flow;

    global.document = window.document;
    console.log(window.innerWidth, window.innerHeight);
    const container = window.document.getElementById("vf-container");
    const renderer = new Renderer(container, Renderer.Backends.SVG);

    renderer.resize(400, 300);
    const context = renderer.getContext();
    const stave = new Stave(50, 0, 300);
    stave.addClef(clef).addTimeSignature("4/4");
    stave.setContext(context).draw();

    
    let currOctave = startingOctave;
    const createNote = (note, duration, descending) => {
        const staveNote = new StaveNote({
            clef: clef,
            keys: [`${note}/${note.includes("C") ? (!descending? ++currOctave : currOctave--) : currOctave}`],
            duration: duration
        });
        if(note.includes("#")) {
            staveNote.addModifier(new Accidental("#"), 0);
        } else if(note.includes("b")) {
            staveNote.addModifier(new Accidental("b"), 0);
        }
        staveNote.autoStem();
        return staveNote;
    }

    // ascending notes
    const quarter = [createNote(notes[0], 'q', false)];
    const m1Group1 = [createNote(notes[1], '8', false), createNote(notes[2], '8', false)];
    const m1Group2 = [createNote(notes[3], '8', false), createNote(notes[4], '8', false), createNote(notes[5], '8', false), createNote(notes[6], '8', false)];
    const m1Notes = quarter.concat(m1Group1, m1Group2);
    const m1Beams = Beam.generateBeams(m1Notes);
    Formatter.FormatAndDraw(context, stave, m1Notes);
    
    m1Beams.forEach((b) => b.setContext(context).draw());
    
    const descending = new Stave(stave.getX(), stave.getBottomLineY(), stave.getWidth());
    descending.setContext(context).draw();

    const secondQuarter = [createNote(notes[7], 'q', true)];
    const m2Group1 = [createNote(notes[6], '8', true), createNote(notes[5], '8', true)];
    const m2Group2 = [createNote(notes[4], '8', true), createNote(notes[3], '8', true), createNote(notes[2], '8', true), createNote(notes[1], '8', true)];
    const m2Notes = secondQuarter.concat(m2Group1, m2Group2);
    const m2Beams = Beam.generateBeams(m2Notes);
    Formatter.FormatAndDraw(context, descending, m2Notes);
    m2Beams.forEach((b) => b.setContext(context).draw());

    // last note
    const oneMore = new Stave(descending.getX(), descending.getBottomLineY(), descending.getWidth());
    oneMore.setContext(context).draw();

    const lastNote = [createNote(notes[0], 'w', true)]
    Formatter.FormatAndDraw(context, oneMore, lastNote);
    
    let svg = container.innerHTML;
    svg = svg.replace(/pointer-events="bounding-box"/g, 'pointer-events="auto"');
    res.send(svg);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});