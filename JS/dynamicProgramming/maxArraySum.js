// See kadane algorithm for reference on adjacent 

// DP with modifications of kadane to obtain the non adjacent sum

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

// Complete the maxSubsetSum function below.
function maxSubsetSum(arr) {
    let bestSum     = 0 ;
    let currentSum  = 0;
    let arrayOfSums = [];
    if ( arr.length === 0 ) {
        return 0;
    } else if (arr.length === 2 ) {
        return Math.max( arr[0],  arr[1] );
        }
        else {
            arrayOfSums.push(arr[0]);
            arrayOfSums.push(Math.max( arr[0],  arr[1] ));
            for( let i = 2; i < arr.length; i++ ) {
                // current
                let currentValue = arr[ i ];
                // current value + the max sum 2 positions before in the arrayOfSums
                let currensPlusNonAdjacent = arrayOfSums[ i - 2 ] + arr[ i ];
                // the value in the middle in the arrayOfSums
                let middle = arrayOfSums[ i - 1 ];
                // the max of current and sum
                let maxOfCurrents = Math.max(currensPlusNonAdjacent, currentValue);
                // the max of the 3 is store
                arrayOfSums[i] = Math.max( maxOfCurrents, middle );
            }
    }
    return arrayOfSums[ arrayOfSums.length -1 ];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = maxSubsetSum(arr);

    ws.write(res + '\n');

    ws.end();
}
