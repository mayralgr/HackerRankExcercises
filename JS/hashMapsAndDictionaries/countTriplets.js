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

// Complete the countTriplets function below.
function countTriplets(arr, r) {
    let mapTripletsLeft = new Map();
    let mapTripletsRight = new Map();
    let triplets = 0;
    // get the frequency of each element of the array in a map
    for (let i = 0; i < arr.length ; i++ ) {
        if ( mapTripletsRight.has(arr[i]) ) {
                let qty = mapTripletsRight.get(arr[i]) + 1;
                mapTripletsRight.set(arr[i],qty);
        } else {
            mapTripletsRight.set(arr[i],1);
        }
    }
    // check for every a if a/r and a * r exist to form a geometric progression
    for (let i = 0; i < arr.length ; i++ ) {
        // actual value
        let a = arr[i];
        if ( mapTripletsRight.has( a ) ){
            let qty = mapTripletsRight.get(a)-1;
            mapTripletsRight.set(a,qty);
        }
        // if a / r exists and a * r exist, we have a triplet
        if ( mapTripletsLeft.has(a/r) && a%r === 0 && mapTripletsRight.has(a * r)) {
            let tripletsCount = mapTripletsLeft.get(a/r) *  mapTripletsRight.get(a * r);
            triplets += tripletsCount;
        }
        // push it to the left size because the mayor values will use it
        if ( mapTripletsLeft.has(a) ) {
            let qty = mapTripletsLeft.get(a) + 1;
            mapTripletsLeft.set(a,qty);
        } else {
            mapTripletsLeft.set(a,1);
        }
    }
    return triplets;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}
