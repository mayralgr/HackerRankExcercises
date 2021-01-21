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

// Complete the substrCount function below.
function substrCount(n, s) {
    let counter = 0; 
    for ( let i = 0 ; i < n ; i++ ) {
        let currentLetter = s[ i ];
        for ( let j = i + 1 ; j < n ; j++) {
            if ( currentLetter === s[j] ) {
                counter += 1;
            } else {
                if ( (2 * j - i ) < n ) {
                    let subLeft     = s.substring(i,j);
                    let subRight    = s.substring(j+1, (2 * j - i + 1));
                    if (subLeft === subRight) {
                        counter +=1;
                    }
                }
                break;
            }
        }
        
    }
    return counter + n;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
