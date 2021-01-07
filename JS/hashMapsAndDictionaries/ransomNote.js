'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the checkMagazine function below.
function checkMagazine(magazine, note) {
    let wordsInMagazine = new Map();
    magazine.forEach(word => {
        if (wordsInMagazine.has(word)) {
            const qty = wordsInMagazine.get(word) + 1;
            wordsInMagazine.set(word,qty);
        } else {
            wordsInMagazine.set(word, 1);
        }
    });
    let canBe = true;
    note.forEach(word => {
        if (wordsInMagazine.has(word) && wordsInMagazine.get(word) !== 0 ) {
            const qty = wordsInMagazine.get(word) - 1;
            wordsInMagazine.set(word,qty);
        } else {
            canBe = false;
            return;
        }
    });
    canBe ? console.log('Yes') : console.log('No');
}

function main() {
    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const magazine = readLine().split(' ');

    const note = readLine().split(' ');

    checkMagazine(magazine, note);
}
