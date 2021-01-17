'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the isValid function below.
function isValid(s) {
    console.log(s);
    let mapOfLetters = new Map();
    let currentLetter;
    let count;
    for(let i = 0 ; i < s.length ; i++ ) {
        currentLetter = s[ i ];
        count = mapOfLetters.get( currentLetter ) || 0;
        mapOfLetters.set(currentLetter, count + 1);   
    }
    // check que map
    let same = 0;
    let eliminate = false;
    let equals = true;
    mapOfLetters.forEach( (value,key) => {
        if ( same === 0 ) {
            same = value;
        }
        if ( same !== value) {
            if ( (same === value - 1) || (value - 1 === 0) && !eliminate ) {
                eliminate = true;
            }
            else {
                equals = false;
                return;
            }
        }
    });
    return equals ? 'YES': 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
