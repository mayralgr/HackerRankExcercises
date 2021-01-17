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
                const qtyOfValue = mapIntegers.get(valueQuery) || 0;
                
                // sum to the qty 
                const newQty = qtyOfValue + 1;
                mapIntegers.set(valueQuery,newQty);
                
                // substract the number if previous ocurrances in the counter
                const originalQty = mapCounter.get(qtyOfValue);
                mapCounter.set(qtyOfValue, originalQty - 1);
                
                // sum to the new qty
                const qtyCounter = mapCounter.get(newQty) || 0;
                mapCounter.set(newQty,qtyCounter + 1)
                    
                break;
            case 2:
                // Delete one occurence of value from your data structure, if present.   
                if (mapIntegers.has(valueQuery)) {
                    const originalQty = mapIntegers.get(valueQuery) || 0 ;
                    const newQty = originalQty - 1;
                    if ( originalQty < 2) {
                        mapIntegers.delete(valueQuery);
                    } else {
                        mapIntegers.set(valueQuery, newQty);
                    }
                    // update the original ocurrence
                    const originalQtyUpdated = mapCounter.get(originalQty) - 1;
                    mapCounter.set(originalQty,originalQtyUpdated)
                    if (originalQtyUpdated < 1) {
                        mapCounter.delete(originalQty);
                    }
                    const qty = mapCounter.get(newQty) || 0;
                    // update the new ocurrence
                    mapCounter.set( newQty , qty +1 );
                }
                break;
            case 3: 
                // Check if any integer is present whose frequency is exactly . 
                // If yes, print 1 else 0
                mapCounter.has(valueQuery) && mapCounter.get(valueQuery) > 0 && valueQuery < queries.length ? arrayResponse.push(1) :arrayResponse.push(0);
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
