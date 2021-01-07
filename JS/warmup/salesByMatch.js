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

// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
    const uniqueElements = [...new Set(ar)];
    let totalPairs = 0;
    // Search index of elements with reduce
    for(let i = 0 ; i < uniqueElements.length; i++) {
        let reducedColor = ar.reduce((totalColor, currentSock) => {
            if (currentSock === uniqueElements[i]) {
                totalColor+=1;
            }
            return totalColor;
        }, 0);
        totalPairs += Math.floor(reducedColor / 2);
    }
    return totalPairs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = sockMerchant(n, ar);

    ws.write(result + "\n");

    ws.end();
}