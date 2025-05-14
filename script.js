const buttonsContainer = document.getElementById("buttons-container");
const calculatorScreen = document.getElementById("calculator-screen");
// Not all symbols have been implemented but these will do for now
const symbolButtons = [
    '', '', '%', 'clear',
    7, 8, 9, '/',
    4, 5, 6, '*',
    1, 2, 3, '-',
    0, '.', '=', '+'
];

symbolButtons.forEach(symbol =>{
    const button = document.createElement("button");
    button.textContent = symbol;
    button.addEventListener("click",()=>{
        // console.log(`Button ${symbol} has been clicked. :O`);
        if(symbol === 'clear'){
            calculatorScreen.textContent = '0';
        }else if(symbol === '='){
            try{
                calculatorScreen.textContent = operate(calculatorScreen.textContent);
            }catch{
                calculatorScreen.textContent = 'Error';
            }
        }else{
            calculatorScreen.textContent += symbol;
        }
    });
    buttonsContainer.appendChild(button);
});

function operate(input){
    
}
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

