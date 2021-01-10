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

// Complete the sherlockAndAnagrams function below.
function sherlockAndAnagrams(s) {
    let subs = new Map();
    for (let i = 0; i <= s.length ; i ++) {
        for (let j = i + 1; j < s.length + 1; j++) {
            let actualSubstring = s.substring(i,j);
            let arrayString = [...actualSubstring].sort();
            actualSubstring = arrayString.join("");
            if ( actualSubstring === '') {
                continue;
            }
            if ( subs.has(actualSubstring) ) {
                let qty = subs.get(actualSubstring) + 1;
                subs.set(actualSubstring,qty);
            } else {
                subs.set(actualSubstring,1);
            }
        }
    }
    let total = 0;
    subs.forEach(( number, currentString) => {
        if (number > 1) {
            total += (number * ( number - 1 ) / 2);
        }
    });
    return total;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = sherlockAndAnagrams(s);

        ws.write(result + "\n");
    }

    ws.end();
}
