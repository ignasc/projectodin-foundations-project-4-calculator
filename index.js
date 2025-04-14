const BTN_0 = "0";
const BTN_1 = "1";
const BTN_2 = "2";
const BTN_3 = "3";
const BTN_4 = "4";
const BTN_5 = "5";
const BTN_6 = "6";
const BTN_7 = "7";
const BTN_8 = "8";
const BTN_9 = "9";
const BTN_DOT = ".";
const BTN_ADD = "+";
const BTN_SUB = "-";
const BTN_MUL = "*";
const BTN_DIV = "/";
const BTN_EQL = "=";
const BTN_CLR = "clr";

const BTN_CLASS_NUM = "number";
const BTN_CLASS_OPER = "operator";
const BTN_CLASS_OTHER = "other";

const BTN_ALL = [
    {"btn_value": BTN_CLR, "class": BTN_CLASS_OTHER + ", row-1"},
    {"btn_value": BTN_DIV, "class": BTN_CLASS_OPER + ", row-1"},
    {"btn_value": BTN_MUL, "class": BTN_CLASS_OPER + ", row-1"},
    {"btn_value": BTN_7, "class": BTN_CLASS_NUM + ", row-2"},
    {"btn_value": BTN_8, "class": BTN_CLASS_NUM + ", row-2"},
    {"btn_value": BTN_9, "class": BTN_CLASS_NUM + ", row-2"},
    {"btn_value": BTN_SUB, "class": BTN_CLASS_OPER + ", row-2"},
    {"btn_value": BTN_4, "class": BTN_CLASS_NUM + ", row-3"},
    {"btn_value": BTN_5, "class": BTN_CLASS_NUM + ", row-3"},
    {"btn_value": BTN_6, "class": BTN_CLASS_NUM + ", row-3"},
    {"btn_value": BTN_ADD, "class": BTN_CLASS_OPER + ", row-3"},
    {"btn_value": BTN_1, "class": BTN_CLASS_NUM + ", row-4"},
    {"btn_value": BTN_2, "class": BTN_CLASS_NUM + ", row-4"},
    {"btn_value": BTN_3, "class": BTN_CLASS_NUM + ", row-4"},
    {"btn_value": BTN_0, "class": BTN_CLASS_NUM + ", row-5"},
    {"btn_value": BTN_DOT, "class": BTN_CLASS_OTHER + ", row-5"},
    {"btn_value": BTN_EQL, "class": BTN_CLASS_OTHER + ", row-6"},
];

let numberOne = [];
let numberTwo = [];
let operator = "";
let calcDisplayContent = 0;
let decimalPoint = 1;
let decimalPointActive = false;
let numberOneActive = true;
let numberTwoActive = false;
let operationComplete = false;

function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    return a / b;
};

//Main calculator elements

const mainApp = document.querySelector("#root");

const calcDisplay = document.querySelector("#row-0");
const mainAppRow1 = document.querySelector("#row-1");
const mainAppRow2 = document.querySelector("#row-2");
const mainAppRow3 = document.querySelector("#row-3");
const mainAppRow4 = document.querySelector("#row-4");
const mainAppRow5 = document.querySelector("#row-5");
const mainAppRow6 = document.querySelector("#row-6");

const calcButton = document.createElement("button");

calcDisplay.textContent = calcDisplayContent;

BTN_ALL.forEach(element => {
    let newButton = calcButton.cloneNode();
    newButton.addEventListener("click", (e)=>{
        buttonPressed(e.target.getAttribute("value"), e.target.getAttribute("class").split(", ")[0]);
        updateDisplay();
    });

    newButton.textContent = element["btn_value"];
    newButton.setAttribute("id", "btn-" + element["btn_value"]);
    newButton.setAttribute("class", element["class"]);
    newButton.setAttribute("value", element["btn_value"]);

    switch (newButton.getAttribute("class").split(", ")[1]) {
        case "row-1":
            mainAppRow1.appendChild(newButton);
            break;
        case "row-2":
            mainAppRow2.appendChild(newButton);
            break;
        case "row-3":
            mainAppRow3.appendChild(newButton);
            break;
        case "row-4":
            mainAppRow4.appendChild(newButton);
            break;
        case "row-5":
            mainAppRow5.appendChild(newButton);
            break;
        case "row-6":
            mainAppRow6.appendChild(newButton);
            break;
    }
});

function buttonPressed(buttonValue, buttonClass){
    if(buttonValue == BTN_EQL){
        if(numberOne.length > 0 && numberTwo.length > 0){
            let answer = operate();
            resetCalculator();
            numberOne.push(answer + "");
            updateDisplay();
            operationComplete = true;
            decimalPointActive = false;
        };
        return;
    };

    let newNumber;

    if(numberTwoActive){
        newNumber = [...numberTwo];
    } else {
        newNumber = [...numberOne];
    };
    
    if(buttonValue == BTN_DOT && !decimalPointActive && !operationComplete){
        if(newNumber.length == 0){newNumber.push("0")};
        newNumber.push(buttonValue);
        decimalPointActive = true;
    };

    if(buttonClass == BTN_CLASS_NUM && !operationComplete){
        newNumber.push(buttonValue);
    } else if(buttonClass == BTN_CLASS_NUM && operationComplete){
        newNumber = [buttonValue];
    };
    
    if(buttonClass == BTN_CLASS_OPER && numberTwo.length == 0){
        operator = buttonValue;
        numberTwoActive = true;
        decimalPointActive = false;
        operationComplete = false;
        updateDisplay();
        return;
    } else if (buttonClass == BTN_CLASS_OPER && numberTwoActive){
        if(numberOne.length > 0 && numberTwo.length > 0){
            let answer = operate();
            resetCalculator();
            numberOne.push(answer + "");
            numberTwoActive = true;
            decimalPointActive = false;
            operator = buttonValue;
            updateDisplay();
        };
        return;
    };

    if(buttonValue == BTN_CLR){
        resetCalculator();
        return;
    };

    /*Update number with new value*/
    if(numberTwoActive){
        numberTwo = [...newNumber];
    } else {
        numberOne = [...newNumber];
    };

    updateDisplay();
};

function resetCalculator(){
    numberOne = [];
    numberTwo = [];
    operator = "";
    numberTwoActive = false;
    operationComplete = false;
};

function updateDisplay(){
    let firstDigit = "";
    let secondDigit = "";

    numberOne.forEach((element)=>{
        firstDigit += element;
    });

    numberTwo.forEach((element)=>{
        secondDigit += element;
    });

    if(firstDigit.length == 0){
        firstDigit = "0";
    };

    calcDisplay.textContent = firstDigit + operator + secondDigit;
};

function getDigit(numberArray){
    let digit = "";
    numberArray.forEach((element)=>{
        digit += element;
    });
    
    return parseFloat(digit);
};

function operate(){
    let firstDigit = getDigit(numberOne);
    let secondDigit = getDigit(numberTwo);
    let answer;

    switch (operator) {
        case BTN_ADD:
            answer = add(firstDigit, secondDigit);
            break;
        case BTN_SUB:
            answer = subtract(firstDigit, secondDigit);
            break;
        case BTN_MUL:
            answer = multiply(firstDigit, secondDigit);
            break;
        case BTN_DIV:
            answer = divide(firstDigit, secondDigit);
            break;
    }

    return Math.round(answer*100)/100;
};
