'use strict';

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

// Complete the whatFlavors function below.
function whatFlavors(cost, money) {
    let mapOfIceCream = new Map(); // to store < cost, [IDs] >
    let iceCream1 = 0 , iceCream2 = 0;
    for ( let i = 0 ; i < cost.length ; i++) {
        let costOfFlavor = cost[i];
        let ids = mapOfIceCream.get(costOfFlavor) || [];
        ids.push(i+1);
        mapOfIceCream.set(costOfFlavor,ids);
    }
    for ( let j = 0 ; j < cost.length ; j++) {
        let costOfFlavor = cost[j];
        let complementLookFor = money - costOfFlavor;
        if (mapOfIceCream.has(complementLookFor)) 
        {
            if ( complementLookFor !== costOfFlavor) {
                iceCream1 = mapOfIceCream.get(costOfFlavor)[0];
                iceCream2= mapOfIceCream.get(complementLookFor)[0];
                break;
            } else {
                if ( mapOfIceCream.get(costOfFlavor).length > 1) {
                    iceCream1 = mapOfIceCream.get(costOfFlavor)[0];
                    iceCream2 = mapOfIceCream.get(costOfFlavor)[1];
                    break;
                }
            }
        }
    }
    if(iceCream1<iceCream2){
        console.log(iceCream1 + " " + iceCream2);
    }else{
        console.log(iceCream2 + " " + iceCream1);
    }
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const money = parseInt(readLine(), 10);

        const n = parseInt(readLine(), 10);

        const cost = readLine().split(' ').map(costTemp => parseInt(costTemp, 10));

        whatFlavors(cost, money);
    }
}
