/**
 * Created by gaby on 22/04/16.
 */


var octaves = {
    CONTRA : 0,
    GREAT : 1,
    SMALL : 2,
    LINE1 : 3,
    LINE2 : 4,
    LINE3 : 5,
    LINE4 : 6
}


var MAX_OCTAVES =  octaves.LINE4;
var KEYS_PER_OCTAVE = 17;
var _displayedOctaves = 3;
var _startOctave = 3;

var verovioToolkit = new verovio.toolkit();

function numberOfDisplayedOctaves() {
    return _displayedOctaves
}

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

function svgNotesForPlaineEasieCode(paeCode) {
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


function htmlForKeyboardWithOctaves(numberOfOctaves, startOctave) {
    if (typeof(numberOfOctaves)==='undefined') numberOfOctaves = 3
    if (typeof(startOctave)==='undefined') startOctave = octaves.LINE1

    //back keys are seperated to fields sharp and flat; this enables specific input
    _displayedOctaves = limitToRange(numberOfOctaves, 0, MAX_OCTAVES)
    _startOctave = limitToRange(startOctave, octaves.CONTRA, octaves.LINE3)

    var html = '<ul class="pianokeyboard">'

    for (var i = 0; i < _displayedOctaves; i++) {
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



function bindKeysToFunction(callback) {

    $(".pianokeyboard li").click(function () {
        var indexOfKey = $(this).index()
        var paeNote = paeCodeForKeyAtIndex(indexOfKey, _startOctave, 4)
        callback(paeNote)
    });

    $("#raiseOctave").click(function () {
        _startOctave = Math.min(_startOctave + 1, MAX_OCTAVES - numberOfDisplayedOctaves())
    })

    $("#lowerOctave").click(function () {
        _startOctave = Math.max(_startOctave - 1, 0)
    })

    function setChangeOctaveButtonsEnabled() {
        var isMax = _startOctave == MAX_OCTAVES
        var isMin = _startOctave == 0
        $("#raiseOctave").prop('disabled', isMax)
        $("#lowerOctave").prop('disabled', isMin)
    }
    
}


function limitToRange(number, min, max) {
    return Math.min(Math.max(min, number), max)
}
