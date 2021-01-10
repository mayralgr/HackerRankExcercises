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

// Complete the freqQuery function below.
function freqQuery(queries) {
    let currentQuery;
    let queryType;
    let valueQuery;
    let mapIntegers = new Map();
    let mapCounter = new Map();
    let arrayResponse = [];
    for(let i = 0; i < queries.length ; i++) {
        currentQuery    = queries[i];
        queryType       = currentQuery[0];
        valueQuery      = currentQuery[1];
        switch(queryType) {
            case 1: 
                // Insert value in your data structure.
                let qty = 0;
                if (mapIntegers.has(valueQuery)) {
                    qty = mapIntegers.get(valueQuery) + 1;
                } else {
                    qty = 1;
                }
                mapIntegers.set(valueQuery,qty);
                if (mapCounter.has(qty)) {
                    const qtyCounter = mapCounter.get(qty) + 1;
                    mapCounter.set(qty,qtyCounter)
                } else {
                    mapCounter.set(qty,1)
                }
                break;
            case 2:
                // Delete one occurence of value from your data structure, if present.   
                if (mapIntegers.has(valueQuery)) {
                    const originalQty = mapIntegers.get(valueQuery);
                     // update the original ocurrence
                    const originalQtyUpdated = mapCounter.get(originalQty) - 1;
                    mapCounter.set(originalQty,originalQtyUpdated)
                    // delete one ocurrence
                    const qty = mapIntegers.get(valueQuery) - 1;
                    mapIntegers.set(valueQuery, qty );
                   // update the new ocurrence
                    const qtyCounterMinor = mapCounter.get( qty ) + 1;
                    mapCounter.set( qty ,qtyCounterMinor)   
                }
                break;
            case 3: 
                // Check if any integer is present whose frequency is exactly . 
                // If yes, print 1 else 0
                mapCounter.has(valueQuery) && mapCounter.get(valueQuery) > 0 ? arrayResponse.push(1) :arrayResponse.push(0);
                break;
            default:
                break;
        }
    }
    return arrayResponse;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = freqQuery(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
