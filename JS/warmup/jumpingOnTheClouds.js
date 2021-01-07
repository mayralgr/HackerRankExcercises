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

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c) {
    // C IS THE ARRAY OF THE CLOUDS
    let jumps = 0;
    for(let i = 0; i < c.length; i) {
        // next max position is the position + 2 or 1
        let nextPosition = i + 2;
        if ( nextPosition < c.length ) {
            if ( c[nextPosition] !== 1 ) {
                i = nextPosition;
            } else {
                i = i+1;
            }
            jumps +=1;
        } else {
            if ( i === c.length - 1 ) {
                return jumps;
            }
            else {
                i = i+1;
                jumps +=1;
                return jumps;
            }
        }
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c);

    ws.write(result + "\n");

    ws.end();
}