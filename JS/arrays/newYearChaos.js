'use strict';

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

// Complete the minimumBribes function below.
function minimumBribes(q) {
    let totalSwaps = 0;
    let swapsCount = new Map();
    for ( let i = 1; i < q.length; i++ ) {
        if ( q[ i ] < q[ i - 1 ]) { // bribe happened, swap
            totalSwaps += 1;
            let temp    = q[ i ];
            q [ i ]     = q [ i - 1 ];
            q [ i - 1 ]  = temp;
            const count = swapsCount.get(q[ i ]) + 1 || 1;
            if ( count > 2 ) {
                console.log('Too chaotic');
                return;
            } else {
                swapsCount.set(q[ i ], count );
            }
            i-=2;
        }
    }
    console.log(totalSwaps);
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
