/**
 * Created by gaby on 22/04/16.
 */


var MAX_OCTAVES =  6;
var KEYS_PER_OCTAVE = 17;

function paeCodeForKeyAtIndex(keyIndex, baseOctave, duration) {
    var octaveOffset = Math.floor(keyIndex / KEYS_PER_OCTAVE);
    var octaveIndex = baseOctave + octaveOffset;
    var octaveSigns = [",,,", ",,", ",", "'", "''", "'''", "''''"];
    var octaveSign = octaveSigns[octaveIndex];
    console.log("octaveInd = " + baseOctave + " + " + octaveOffset);
    var notes = [duration + "c",
        "x" + duration + "c",
        "b" + duration + "d",
        duration + "d",
        "x" + duration + "d",
        "b" + duration + "e",
        duration + "e",

        duration + "f",
        "x" + duration + "f",
        "b" + duration + "g",
        duration + "g",
        "x" + duration + "g",
        "b" + duration + "a",
        duration + "a",
        "x" + duration + "a",
        "b" + duration + "b",
        duration + "b"];
    var note = notes[keyIndex % KEYS_PER_OCTAVE];
    note = octaveSign + note;
    return note;
}



