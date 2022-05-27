
function add(a, b) {
    return a+b;
}

function substract(a, b) {
    return a-b;
}

function multiple(a, b) {
    return a*b;
}
function divide(a, b) {
    return a/b;
}

function operate(operator, a, b) {
    if(operator == '+') {
        return add(a, b);
    }
    else if(operator == '-') {
        return substract(a, b);
    }
    else if(operator == '*') {
        return multiple(a, b);
    }
    else {
        if(b == 0) return "NO";
        return divide(a, b);
    }
}

let initialNumber = "";
let secondNumber = "";

console.log(operate('+', 1, 2));
console.log(operate('-', 1, 2));
console.log(operate('*', 3, 2));
console.log(operate('/', 1, 2));
