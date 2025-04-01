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
const BTN_RET = "return";
const BTN_CLR = "clear";

const BTN_ALL = [
    BTN_0,
    BTN_1,
    BTN_2,
    BTN_3,
    BTN_4,
    BTN_5,
    BTN_6,
    BTN_7,
    BTN_8,
    BTN_9,
    BTN_DOT,
    BTN_ADD,
    BTN_SUB,
    BTN_MUL,
    BTN_DIV,
    BTN_RET,
    BTN_CLR,
];

let numberOne;
let numberTwo;
let operator;
let calcDisplayContent = 0;

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
        updateDisplay(e.target.textContent);
    });

    newButton.textContent = element;
    newButton.setAttribute("id", "btn-" + element);

    mainApp.appendChild(newButton);
});

function updateDisplay(content){
    calcDisplay.textContent = parseInt(calcDisplay.textContent + content);
};
