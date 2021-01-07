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

// Complete the repeatedString function below.
function repeatedString(s, n) {
    if ( s.indexOf("a") === -1 ) {
        return 0;
    }
    if ( s.length === 1) {
        return n;
    }
    const repetitions = s.split("").reduce((total,currentCharacter) => {
        if (currentCharacter === 'a') {
            total +=1 ;
        }
        return total;
    }, 0);
    // with the repetitions and the length we get the complete repetitions
    
    // number of repetitions 
    const number = Math.floor(n / s.length);
    // extra caracters to complete n
    const extra = n - (s.length * number);
    // extra repetitions for the completition of the string 
    const repetitionsExtra = s.substring(0,extra).split("").reduce((total,currentCharacter) => {
        if (currentCharacter === 'a') {
            total +=1 ;
        }
        return total;
    }, 0);
    // number of repetitions * the repetitions of a in the string + the extra to complete the length
    return (number * repetitions) + repetitionsExtra;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine(), 10);

    let result = repeatedString(s, n);

    ws.write(result + "\n");

    ws.end();
}
