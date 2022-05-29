function add(a, b) {
    initialNumber = "" + (a+b);
}
function substract(a, b) {
    initialNumber = "" + (a-b);
}
function multiple(a, b) {
    initialNumber =  "" + (a*b);
}
function divide(a, b) {
    if(b == 0) initialNumber = "0";
    else initialNumber = "" + (a/b);
}
function modular(a, b) {
    if(b == 0) initialNumber = "0";
    else  initialNumber = "" + (a%b);
}

function operate() {
    //conditions to operate
    if(!operatorPressed || initialNumber.length == 0 || secondNumber.length == 0) return;
    if(secondNumber.length == 1 && secondNumber[0] == '-') return;
    
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
    else if(operatorValue == '/') {
        divide(a, b);
    }
    else {
        modular(a, b);
    }
    operatorPressed = false;
    secondaryDisplay.textContent = initialNumber;
    primaryDisplay.textContent = "";
    secondNumber = "";
}

function updatePrimaryDisplay() {
    if(!operatorPressed) {
        primaryDisplay.textContent = secondNumber;
    }
    else {
        primaryDisplay.textContent = operatorValue + " " + secondNumber;
    }
}

function joinNumber(num) {
    const value = num.target.textContent;
    if(!operatorPressed) {
        secondNumber += value;
    }
    else {
        secondNumber += value;
    }
    updatePrimaryDisplay();
}

function setOperator(operator) {
    // condition where operator cannot be inputted into calc
    if(secondNumber.length == 1 && secondNumber[0] == '-') return;

    if(operatorPressed) {
        operate();
    }
    operatorValue = operator.target.textContent;
    operatorPressed = true;
    primaryDisplay.textContent = operatorValue;
    //Only update secondary display and initialNumber if it wasn't done through operate.
    if(secondNumber.length != 0) {
        secondaryDisplay.textContent = secondNumber;
        initialNumber = secondNumber;
    }
    secondNumber = "";
}

function resetCalculator() {
    primaryDisplay.textContent = "";
    secondaryDisplay.textContent = "";
    initialNumber = "";
    secondNumber = "";
    operatorValue = "";
    operatorPressed = false;
}

function delNumber() {
    //Cannot delete result number and cannot delete when there is nothing.
    if(primaryDisplay.textContent.length == 0) return;

    //get current value that is being deleted
    let currNumber = secondNumber;

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
    secondNumber = currNumber;
    updatePrimaryDisplay();
}

function changeSign() {
    if(secondNumber[0] == '-') {
        secondNumber = secondNumber.slice(1);
    }
    else {
        secondNumber = '-' + secondNumber;
    }
    updatePrimaryDisplay();
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

    const signButton = document.querySelector('.flip-sign');
    signButton.addEventListener('click', changeSign);
}

const primaryDisplay = document.querySelector('.primary-display');
const secondaryDisplay = document.querySelector('.secondary-display');
let initialNumber = "";
let secondNumber = "";
let operatorValue = "";
let operatorPressed = false;

setEventListeners();
