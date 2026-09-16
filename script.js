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
