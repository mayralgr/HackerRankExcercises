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
    let mapOfLetters = new Map();
    
    for(let i = 0 ; i < s.length ; i++ ) {
        let currentLetter = s[ i ];
        let count = mapOfLetters.get( currentLetter ) || 0;
        mapOfLetters.set(currentLetter, count + 1);   
    }
    
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let frequencies = new Set(mapOfLetters.values());
    if (frequencies.size === 1) {
        return 'YES'
    } else if ( frequencies.size > 2) {
        return 'NO'
    }
    
    min = Math.min(...Array.from(frequencies.values()));
    max = Math.max(...Array.from(frequencies.values()));
    // check que set with the map
    let equals = true;
    
    let minFrequency = 0;
    let maxFrequency = 0;
    
    mapOfLetters.forEach( value => {
        if (value === min ) {
            minFrequency += 1;
        }
        if (value === max) {
            maxFrequency += 1;
        }
    });
    // can eliminate the min
    if ( minFrequency === 1 && min === 1) {
        return 'YES';
    }
    // can eliminate because the diference is 1 and the frequency is 1
    if ( (max - min) === 1 && maxFrequency === 1 ) {
        return 'YES';
    }    
    return 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
