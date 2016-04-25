/**
 * Created by gaby on 22/04/16.
 */


var MAX_OCTAVES =  6;
var KEYS_PER_OCTAVE = 17;

var verovioToolkit = new verovio.toolkit();

function paeCodeForKeyAtIndex(keyIndex, baseOctave, duration) {
    var octaveOffset = Math.floor(keyIndex / KEYS_PER_OCTAVE)
    var octaveIndex = baseOctave + octaveOffset
    var octaveSigns = [",,,", ",,", ",", "'", "''", "'''", "''''"]
    var octaveSign = octaveSigns[octaveIndex]
    console.log("octaveInd = " + baseOctave + " + " + octaveOffset)
    var notes = [duration + "C",
        "x" + duration + "C",
        "b" + duration + "D",
        duration + "D",
        "x" + duration + "D",
        "b" + duration + "E",
        duration + "E",

        duration + "F",
        "x" + duration + "F",
        "b" + duration + "G",
        duration + "G",
        "x" + duration + "G",
        "b" + duration + "A",
        duration + "A",
        "x" + duration + "A",
        "b" + duration + "B",
        duration + "B"]
    var note = notes[keyIndex % KEYS_PER_OCTAVE]
    note = octaveSign + note
    return note
}

function notesSVGForPAECode(paeCode) {
    var data = "@clef:" + "G-2" + "\n"
    data += "@keysig:" + " " + "\n"
    data += "@timesig:" + " " + "\n"
    console.log("notes " + paeCode)
    data += "@data:" + paeCode

    var windowWidth = $(window).width()
    console.log("Window Width: " + windowWidth)
    var scale = 50
    if (windowWidth < 1000) {
        scale = 30
    } else if (windowWidth < 500) {
        scale = 15
    }

    options = JSON.stringify({
        inputFormat: 'pae',
        pageHeight: 500,
        pageWidth: windowWidth * (1 / scale),
        ignoreLayout: 1,
        border: 0,
        scale: scale,
        adjustPageHeight: 1
    });

    var notesSVG = verovioToolkit.renderData(data, options);
    return notesSVG
}


function pianoHTML(numberOfOctaves) {
    //back keys are seperated to fields sharp and flat; this enables specific input

    var html = '<ul class="pianokeyboard">'

    for (var i = 0; i < numberOfOctaves; i++) {
        html += '\
                <li class="whiteKey"></li>\
                <li class="blackKeySharp">♯</li>\
                <li class="blackKeyFlat"><br/>♭</li>\
                <li class="whiteKey"></li>\
                <li class="blackKeySharp"></li>\
                <li class="blackKeyFlat"></li>\
                <li class="whiteKey"></li>\
                <li class="whiteKey"></li>\
                <li class="blackKeySharp"></li>\
                <li class="blackKeyFlat"></li>\
                <li class="whiteKey"></li>\
                <li class="blackKeySharp"></li>\
                <li class="blackKeyFlat"></li>\
                <li class="whiteKey"></li>\
                <li class="blackKeySharp"></li>\
                <li class="blackKeyFlat"></li>\
                <li class="whiteKey"></li>'
    }
    html +=   '</ul>'
    return html
}
