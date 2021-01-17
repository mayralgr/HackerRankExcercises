function processData(input) {
    //Enter your code here
    let lines = input.split('\n');
    let stack1 = [];
    let stack2 = [];
    let peek = [];
    let numberOfQueries = Number(lines[0]);
    for ( let i = 1 ; i < numberOfQueries+1 ; i++ ) {
        let values = lines[i].split(' ');
        const type = Number(values[0]);
        switch ( type ) {
            case 1: 
                // insert the value, enqueue
                const value = values[1];
                if (stack1.length === 0) {
                    peek = value;
                }
                stack1.push(value);
                break;
            case 2: // get the fisrt value, dequeue
                    dequeue(stack1,stack2);
                break;
            case 3:  // print it
                    let res = peekStack(stack1,stack2);
                    console.log(res);
                break;
        }
    }
    
} 


function peekStack (stack1,stack2) {
    let value;
    if ( stack2.length === 0) {
        // pass from the 1st stack to the second
        while( stack1.length !== 1 ) {
            stack2.push(stack1.pop())
        }
        // get eliminating and return it 
        value = stack1.pop();
        stack2.push(value);
    } else {
        value = stack2.pop();
        stack2.push(value);
    }
    return value;
}


function dequeue(stack1, stack2) {
    if ( stack2.length === 0) {
        // pass from the 1st stack to the second
        while( stack1.length !== 1 ) {
            stack2.push(stack1.pop())
        }
        // get eliminating
        stack1.pop();
    } else {
        stack2.pop();
    }   
}


process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
