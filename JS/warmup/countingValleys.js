'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'countingValleys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER steps
 *  2. STRING path
 */

function countingValleys(steps, path) {
    // Write your code here
    let res = 0; // sea level
    let down = false;
    let valleys = 0;
    for(let i = 0; i < path.length ; i++) {
        if (path[i] === 'U') {
            res +=1;
            if (res === 0 ) {
                if (down) {
                    valleys +=1;
                }
                down = false;
            }
        } else {
            if (res === 0 ) {
                down = true;
            }
            res -=1;
        }
    }
    console.log(valleys);
    return valleys;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const steps = parseInt(readLine().trim(), 10);

    const path = readLine();

    const result = countingValleys(steps, path);

    ws.write(result + '\n');

    ws.end();
}
