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
            calculatorScreen.textContent = '';
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
    // return eval(input); 
    let num1 = 0;
    let num2 = 0;
    let plus = input.indexOf("+");
   

    // for adding
    if(plus !== -1){
        num1 = Number(input.slice(0, plus));
        num2 = Number(input.slice(plus + 1));
        return add(num1, num2);
    }

    // for subtracting
    let sub = input.indexOf("-");
    if(sub !== -1){
        num1 = Number(input.slice(0, sub));
        num2 = Number(input.slice(sub + 1));
        return subtract(num1, num2);
    }

    // for multiplying
    let mult = input.indexOf("*");
    if(mult !== -1){
        num1 = Number(input.slice(0, mult));
        num2 = Number(input.slice(mult + 1));
        return multiply(num1, num2);
    }

    // for dividing
    let d = input.indexOf("/");
    if(d !== -1){
        num1 = Number(input.slice(0, d));
        num2 = Number(input.slice(d + 1));
        return divide(num1, num2);
    }
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

