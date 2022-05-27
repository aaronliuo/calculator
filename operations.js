
function add(a, b) {
    display.textContent = a+b;
}

function substract(a, b) {
    display.textContent = a-b;
}

function multiple(a, b) {
    display.textContent =  a*b;
}
function divide(a, b) {
    if(b == 0) display.textContent = -1;
    else display.textContent = a/b;
}

function operate() {
    const a = parseInt(initialNumber);
    const b = parseInt(secondNumber);
    if(operatorValue == '+') {
        add(a, b);
    }
    else if(operatorValue == '-') {
        substract(a, b);
    }
    else if(operatorValue == '*') {
        multiple(a, b);
    }
    else {
        divide(a, b);
    }
    const equals = document.querySelector('.equal');
    equals.removeEventListener('click', operate);
    operatorPressed = false;
    secondNumber = "";
    initialNumber = display.textContent;
}

function joinNumber(num) {
    const value = num.target.textContent;
    if(!operatorPressed) {
        initialNumber += value;
        display.textContent = initialNumber;
    }
    else {
        secondNumber += value;
        display.textContent = secondNumber;
    }
}

function setOperator(operator) {
    if(operatorPressed == true || initialNumber == "") return;
    operatorValue = operator.target.textContent;
    operatorPressed = true;

    const equals = document.querySelector('.equal');
    equals.addEventListener('click', operate);

}

function setEventListeners() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach((num) => {
        num.addEventListener('click', joinNumber);
    })

    const operations = document.querySelectorAll('.operation');
    operations.forEach((operation) => {
        operation.addEventListener('click', setOperator);
    })

}

const display = document.querySelector('.display');
let initialNumber = "";
let secondNumber = "";
let operatorValue = "";
let operatorPressed = false;

setEventListeners();
