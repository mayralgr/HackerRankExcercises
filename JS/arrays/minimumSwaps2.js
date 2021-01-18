'use strict';

const fs = require('fs');

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

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
    let swap = 0;
    let temp = 0;
    let i    = 0;
    while( i < arr.length ) {
        if ( arr[i] === i+1 ) {
            i++;
        } else {
            // swap
            temp    = arr[i];
            arr[i]  = arr [ temp - 1 ];
            arr[ temp - 1 ] = temp;
            swap++;
        }
    }
    return swap;
}



function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}
