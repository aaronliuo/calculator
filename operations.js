function add(a, b) {
    primaryDisplay.textContent = a+b;
}

function substract(a, b) {
    primaryDisplay.textContent = a-b;
}

function multiple(a, b) {
    primaryDisplay.textContent =  a*b;
}
function divide(a, b) {
    if(b == 0) primaryDisplay.textContent = -1;
    else primaryDisplay.textContent = a/b;
}

function operate() {
    const a = Number(initialNumber);
    const b = Number(secondNumber);
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
    justEqueled = true;
    secondNumber = "";
    initialNumber = primaryDisplay.textContent;
}

function joinNumber(num) {
    const value = num.target.textContent;
    if(!operatorPressed && !justEqueled) {
        initialNumber += value;
        primaryDisplay.textContent = initialNumber;
    }
    else if(!operatorPressed && justEqueled) {
        secondaryDisplay.textContent = initialNumber;
        initialNumber = value;
        primaryDisplay.textContent = initialNumber;
        justEqueled = false;
    }
    else {
        secondNumber += value;
        primaryDisplay.textContent = operatorValue + " " + secondNumber;
    }
}

function setOperator(operator) {
    if(operatorPressed == true || initialNumber == "") return;
    operatorValue = operator.target.textContent;
    operatorPressed = true;
    primaryDisplay.textContent = operatorValue;
    secondaryDisplay.textContent = initialNumber;

    const equals = document.querySelector('.equal');
    equals.addEventListener('click', operate);

}

function resetCalculator() {
    primaryDisplay.textContent = "";
    secondaryDisplay.textContent = "";
    initialNumber = "";
    secondNumber = "";
    operatorValue = "";
    operatorPressed = false;
    justEqueled = false;
}

function delNumber() {
    let currNumber = primaryDisplay.textContent;
    if(currNumber.length == 0 && operatorPressed) {
        operatorValue = "";
        operatorPressed = false;
        console.log("EXEcUTED");
        return;
    }

    //Removes last character and tailing negative/decimal signs
    if(currNumber.length > 0) {
        currNumber = currNumber.slice(0, -1);
    }
    if(currNumber.length > 0 && (currNumber[currNumber.length-1] == '-' || currNumber[currNumber.length-1] == '.')) {
        currNumber = currNumber.slice(0, -1);
    }

    //update information
    primaryDisplay.textContent = currNumber;
    if(!operatorPressed) {
        initialNumber = currNumber;
    }
    else {
        secondNumber = currNumber;
    }
    console.log(currNumber);
    console.log(operatorValue);
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
    
    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', resetCalculator);

    const delButton = document.querySelector('.delete');
    delButton.addEventListener('click', delNumber);
}

const primaryDisplay = document.querySelector('.primary-display');
const secondaryDisplay = document.querySelector('.secondary-display');
let initialNumber = "";
let secondNumber = "";
let operatorValue = "";
let operatorPressed = false;
let justEqueled = false;

setEventListeners();
