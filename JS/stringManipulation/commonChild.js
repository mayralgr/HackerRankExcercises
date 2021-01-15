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

// Complete the commonChild function below.
function commonChild(s1, s2) {
    // Count frequency
    let arrayString1 = [...s1];
    let arrayString2 = [...s2];
    let arraySubsequence = Array(arrayString1.length +1 ).fill().map(() => Array(arrayString1.length + 1).fill(0));
    for (let i = 1 ; i <= arrayString1.length ; i++ ) {
        for (let j = 1 ; j <= arrayString2.length ; j++ ) {
            if ( arrayString1[ i - 1 ] === arrayString2[ j - 1 ] ) {
                arraySubsequence[ i ][ j ] = arraySubsequence[ i - 1 ][ j - 1 ] + 1;
            } else {
                let previousRow     = arraySubsequence[ i ][ j - 1 ];
                let previousColumn  = arraySubsequence[ i - 1 ][ j ];
                arraySubsequence[ i ][ j ] = Math.max( previousColumn, previousRow);
            }
        }
    }
    return arraySubsequence[ arrayString1.length ][ arrayString1.length ];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = commonChild(s1, s2);

    ws.write(result + "\n");

    ws.end();
}
