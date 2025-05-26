const buttonsContainer = document.getElementById("buttons-container");
const currentNumberText = document.getElementById("large-text");
const previousNumberText = document.getElementById("small-text");
// Not all symbols have been implemented but these will do for now
const symbolButtons = [
    '', '%', 'delete', 'clear',
    7, 8, 9, '/',
    4, 5, 6, '*',
    1, 2, 3, '-',
    0, '.', '=', '+'
];

let currentNum = "";
let previousNum = "";
let operation = null;
let divisionByZeroError = false;

symbolButtons.forEach(symbol =>{
    const button = document.createElement("button");
    button.textContent = symbol;
    button.addEventListener("click",()=>{
        // console.log(`Button ${symbol} has been clicked. :O`);
        if(symbol === 'clear') clear();

        else if(symbol === 'delete') deleteNum();

        else if(symbol === '%') convertPercentToDecimal();

        else if(!isNaN(symbol) || symbol === '.') addNumber(symbol);

        else if(['+', '-', '*', '/'].includes(symbol)) selectOperator(symbol);

        else if(symbol === '=') operate();

        updateScreen();
    });
    buttonsContainer.appendChild(button);
});

function convertPercentToDecimal(){
    if(currentNum === '') return;
    let result = divide(parseFloat(currentNum), 100);
    currentNum = result.toString();
}
function clear(){
    currentNum = "";
    previousNum = "";
    operation = null;
}

function updateScreen(){
    currentNumberText.textContent = currentNum;
    if(operation && previousNum !== ""){
        previousNumberText.textContent = `${previousNum} ${operation} `;
    }else{
        previousNumberText.textContent = "";
    }
}

function addNumber(num){
    if(num === '.' && currentNum.includes('.')) return;
    if(divisionByZeroError) {
        currentNum = num.toString();
        divisionByZeroError = false;
        return;
    }
    currentNum += num.toString();
}

function selectOperator(symbol){
    if(divisionByZeroError) return;
    if(operation && currentNum === ""){
        operation = symbol;
        updateScreen();
        return;
    }
    if(currentNum === "") return;

    if(previousNum !== "") operate();
    operation = symbol;
    previousNum = currentNum;
    currentNum = "";
}

function operate(){
    if(isNaN(previousNum) || isNaN(currentNum)) return;
    let firstNum = parseFloat(previousNum);
    let secondNum = parseFloat(currentNum);
    let answer = 0;
    if(operation === '+') answer = add(firstNum, secondNum);
    else if(operation === '-') answer = subtract(firstNum, secondNum);
    else if(operation === '*') answer = multiply(firstNum, secondNum);
    else if(operation === '/') {
        if(secondNum === 0) {
            divisionByZeroError = true;
        }
        else answer = divide(firstNum, secondNum);
    }
    if(divisionByZeroError){
        currentNum = 'Undefined :( Try again.';
        previousNum = "";
        operation = null;
        return;
    }
    currentNum = answer;
    previousNum = "";
    operation = null;
}

function deleteNum(){
    currentNum = currentNum.toString().slice(0, -1);
}
// May use this when I am calculating more than 2 numbers at the same time in the console
// function operate(input){
//     let num1 = 0;
//     let num2 = 0;
//     let plus = input.indexOf("+");
   
//     // for adding
//     if(plus !== -1){
//         num1 = Number(input.slice(0, plus));
//         num2 = Number(input.slice(plus + 1));
//         return add(num1, num2);
//     }

//     // for subtracting
//     let sub = input.indexOf("-");
//     if(sub !== -1){
//         num1 = Number(input.slice(0, sub));
//         num2 = Number(input.slice(sub + 1));
//         return subtract(num1, num2);
//     }

//     // for multiplying
//     let mult = input.indexOf("*");
//     if(mult !== -1){
//         num1 = Number(input.slice(0, mult));
//         num2 = Number(input.slice(mult + 1));
//         return multiply(num1, num2);
//     }

//     // for dividing
//     let d = input.indexOf("/");
//     if(d !== -1){
//         num1 = Number(input.slice(0, d));
//         num2 = Number(input.slice(d + 1));
//         if(num2 === 0) return 'Undefined :( Try again.';
//         return divide(num1, num2);
//     }
// }

// adds two numbers
function add(num1, num2){
    return num1 + num2;
}

// subtracts two numbers
function subtract(num1, num2){
    return num1 - num2;
}

// multiplies two numbers
function multiply(num1, num2){
    return num1 * num2;
}

// divides two numbers
function divide(num1, num2){
    return num1 / num2;
}

