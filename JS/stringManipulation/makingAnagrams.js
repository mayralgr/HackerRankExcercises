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

// Complete the makeAnagram function below.
function makeAnagram(a, b) {
    let string1 = new Map();
    let string2 = new Map();
    for (let i = 0; i < a.length ; i++ ) {
        let qty = string1.get(a[i]) || 0;
        string1.set(a[i],qty + 1);
    }
    for (let i = 0; i < b.length ; i++ ) {
        let qty = string2.get(b[i]) || 0;
        string2.set(b[i],qty + 1);
    }
    let deletions = 0;
    string1.forEach((number, key) => {
        if(string2.has(key)) {
            if(string2.get(key) !== string1.get(key)) {
                let number = Math.abs(string2.get(key) - string1.get(key));
                deletions += number;
                if (string2.get(key) > string1.get(key)) {
                    string2.set(key, string2.get(key)-number);
                } else {
                    string1.set(key, string1.get(key)-number);
                }
            }
        } else {
            // delete from string 1
            deletions += number;
            string1.set(key, 0);
        }
    });
    string2.forEach((number, key) => {
        if(string1.has(key)) {
            if(string1.get(key) !== string2.get(key)) {
                let number = Math.abs(string1.get(key) - string2.get(key));
                deletions += number;
                if (string1.get(key) > string2.get(key)) {
                    string1.set(key, string1.get(key)-number);
                } else {
                    string2.set(key, string2.get(key)-number);
                }
            }
        } else {
            // delete from string 2
            deletions += number;
            string2.set(key, 0);
        }
    });
    return deletions;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}
