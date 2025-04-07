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
    {"btn_value": BTN_0, "class": BTN_CLASS_NUM},
    {"btn_value": BTN_1, "class": BTN_CLASS_NUM},
    {"btn_value": BTN_2, "class": BTN_CLASS_NUM},
    {"btn_value": BTN_3, "class": BTN_CLASS_NUM},
    {"btn_value": BTN_4, "class": BTN_CLASS_NUM},
    {"btn_value": BTN_5, "class": BTN_CLASS_NUM},
    {"btn_value": BTN_6, "class": BTN_CLASS_NUM},
    {"btn_value": BTN_7, "class": BTN_CLASS_NUM},
    {"btn_value": BTN_8, "class": BTN_CLASS_NUM},
    {"btn_value": BTN_9, "class": BTN_CLASS_NUM},
    {"btn_value": BTN_DOT, "class": BTN_CLASS_OTHER},
    {"btn_value": BTN_ADD, "class": BTN_CLASS_OPER},
    {"btn_value": BTN_SUB, "class": BTN_CLASS_OPER},
    {"btn_value": BTN_MUL, "class": BTN_CLASS_OPER},
    {"btn_value": BTN_DIV, "class": BTN_CLASS_OPER},
    {"btn_value": BTN_EQL, "class": BTN_CLASS_OPER},
    {"btn_value": BTN_CLR, "class": BTN_CLASS_OTHER},
];

let numberOne = [];
let numberTwo = [];
let operator = "";
let calcDisplayContent = 0;
let decimalPoint = 1;
let decimalPointActive = false;
let numberTwoActive = false;

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

const calcButton = document.createElement("button");

const calcDisplay = document.createElement("div");
calcDisplay.textContent = calcDisplayContent;
mainApp.appendChild(calcDisplay);

BTN_ALL.forEach(element => {
    let newButton = calcButton.cloneNode();
    newButton.addEventListener("click", (e)=>{
        buttonPressed(e.target.getAttribute("value"), e.target.getAttribute("class"));
        updateDisplay();
    });

    newButton.textContent = element["btn_value"];
    newButton.setAttribute("id", "btn-" + element["btn_value"]);
    newButton.setAttribute("class", element["class"]);
    newButton.setAttribute("value", element["btn_value"]);

    mainApp.appendChild(newButton);
});

function buttonPressed(buttonValue, buttonClass){
    let newNumber;

    if(numberTwoActive){
        newNumber = [...numberTwo];
    } else {
        newNumber = [...numberOne];
    };
    
    if(buttonValue == BTN_DOT && !decimalPointActive){
        if(newNumber.length == 0){newNumber.push("0")};
        newNumber.push(buttonValue);
        decimalPointActive = true;
    };

    if(buttonClass == BTN_CLASS_NUM){
        newNumber.push(buttonValue);
    };
    
    if(buttonClass == BTN_CLASS_OPER && numberTwo.length == 0){
        operator = buttonValue;
        numberTwoActive = true;
        decimalPointActive = false;
        updateDisplay();
        return;
    } else if (buttonClass == BTN_CLASS_OPER && numberTwoActive){
        console.log("Execute operation and set answer as the first number");
        return
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
