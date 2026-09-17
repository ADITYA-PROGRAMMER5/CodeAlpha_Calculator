const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;


function addNumber(number) {

    if (display.value === "Error") {
        clearDisplay();
    }

    if (waitingForSecondNumber) {

        display.value = number;

        waitingForSecondNumber = false;

    } 
    else {

        if (display.value === "0") {
            display.value = number;
        } 
        else {
            display.value += number;
        }
    }
}

function addDecimal() {

    if (waitingForSecondNumber) {

        display.value = "0.";

        waitingForSecondNumber = false;

        return;
    }

    if (!display.value.includes(".")) {
        display.value += ".";
    }
}

function chooseOperator(selectedOperator) { 
    const currentNumber = parseFloat(display.value); 
    
    if (isNaN(currentNumber)) { return; } 
     
    if (operator !== null && !waitingForSecondNumber) { 
        calculate(); 
    } 
    
    firstNumber = parseFloat(display.value); 
    operator = selectedOperator; 
    waitingForSecondNumber = true; 
}

function calculate() {

    if (operator === null || firstNumber === null) {
        return;
    }

    const secondNumber = parseFloat(display.value);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;


        case "-":
            result = firstNumber - secondNumber;
            break;


        case "*":
            result = firstNumber * secondNumber;
            break;


        case "/":

            if (secondNumber === 0) {

                display.value = "Error";

                resetCalculator();

                return;
            }

            result = firstNumber / secondNumber;

            break;


        case "%":
            result = firstNumber % secondNumber;
            break;
    }


    display.value = result;


    firstNumber = result;

    operator = null;

    waitingForSecondNumber = true;
}

function clearDisplay() {

    display.value = "0";

    resetCalculator();
}

function resetCalculator() {

    firstNumber = null;

    operator = null;

    waitingForSecondNumber = false;
}

function deleteNumber() {

    if (display.value.length > 1) {

        display.value = display.value.slice(0, -1);

    } 
    else {

        display.value = "0";

    }
}
document.addEventListener("keydown", function(event) {

    const key = event.key;


    if (key >= "0" && key <= "9") {

        addNumber(key);

    }


    else if (key === ".") {

        addDecimal();

    }


    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        chooseOperator(key);

    }


    // Enter key to Calculate
    else if (key === "Enter" || key === "=") {

        calculate();

    }


    // Escape key to Clear
    else if (key === "Escape") {

        clearDisplay();

    }


    // Backspace key to Delete
    else if (key === "Backspace") {

        deleteNumber();

    }

});