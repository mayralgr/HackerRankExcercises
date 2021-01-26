function getMinimumCost(k, c) {
    // k = friends
    // n = number of flowers
    let arrayOrdered = c.sort((a,b)=> b-a);
    let sumMin = 0;
    let vuelta = 0;
    let n = arrayOrdered.length - 1;
    // for of array first approach, min to max
    /*while(n !== -1) {
        for(let j = 0 ; j < k ; j++ ) {
            sumMin += (vuelta + 1) * arrayOrdered[ n ];
            n--;
            if (n < 0) {
                break;
            }
        }
        vuelta++;
    }*/
    // second approach, desdent
    let i = 0;
    while( i < arrayOrdered.length ){
        for(let j = 0 ; j < k && i < arrayOrdered.length; j++ ) {
            sumMin += (vuelta + 1) * arrayOrdered[ i ];
            i++;
        }
        vuelta++;
    }
    return sumMin;
}