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
    if(b == 0) primaryDisplay.textContent = 0;
    else primaryDisplay.textContent = a/b;
}

function operate() {
    if(!operatorPressed || initialNumber.length == 0 || secondNumber.length == 0) return;
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
    if(operatorPressed == true && initialNumber == "") return;
    if(operatorPressed) {
        operate();
    }
    operatorValue = operator.target.textContent;
    operatorPressed = true;
    justEqueled = false;
    primaryDisplay.textContent = operatorValue;
    secondaryDisplay.textContent = initialNumber;
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
    //Cannot delete result number and cannot delete when there is nothing.
    if(justEqueled || primaryDisplay.textContent.length == 0) return;

    //get current value that is being deleted
    let currNumber;
    if(!operatorPressed) {
        currNumber = initialNumber;
    }
    else {
        currNumber = secondNumber;
    }
    //delete operator if it is the only thing left.
    if(currNumber.length == 0 && operatorPressed) {
        operatorValue = "";
        operatorPressed = false;
        primaryDisplay.textContent = "";
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
    if(!operatorPressed) {
        primaryDisplay.textContent = currNumber;
        initialNumber = currNumber;
    }
    else {
        primaryDisplay.textContent = operatorValue + " " + currNumber;
        secondNumber = currNumber;
    }
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

    const equals = document.querySelector('.equal');
    equals.addEventListener('click', operate);
}

const primaryDisplay = document.querySelector('.primary-display');
const secondaryDisplay = document.querySelector('.secondary-display');
let initialNumber = "";
let secondNumber = "";
let operatorValue = "";
let operatorPressed = false;
let justEqueled = false;

setEventListeners();
