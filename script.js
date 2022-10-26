let displayText = '0';
let firstNum = null;
let secondNum = null;
let opLive = null;
let opStore = null;
let DEBUG = true;

function updateDisplay() {
  const display = document.querySelector('.display');
  display.textContent = displayText;
}

updateDisplay();

function handleClick(e) {
  // entering numbers when the display is 0
  if (e.target.classList.contains('num') && displayText === '0') {
    displayText = e.target.textContent;
    updateDisplay();
  // entering numbers when the display is not 0
  } else if (e.target.classList.contains('num') && !opLive) {
    displayText += e.target.textContent;
    updateDisplay();
  // entering numbers immediately after an operation has been
  //  pressed
  } else if (e.target.classList.contains('num') && opLive) {
    if (opLive != '=') {
      opStore = opLive;
    }
    opLive = null;
    displayText = e.target.textContent;
    updateDisplay();
  // clearing the calculator
  } else if (e.target.classList.contains('ac')) {
    displayText = '0';
    firstNum = null;
    secondNum = null;
    opLive = null;
    opStore = null;
    updateDisplay();
  // using equals (only calculates if a first operand exists)
  } else if (e.target.classList.contains('eq') && firstNum) {
    secondNum = displayText;
    displayText = operate(opStore || opLive, firstNum, secondNum).toString();
    firstNum = null;
    secondNum = null;
    opLive = '=';
    opStore = null;
    updateDisplay();
  // entering an operator when no other operator has been entered
  } else if (e.target.classList.contains('op') && !firstNum) {
    firstNum = displayText;
    opLive = e.target.textContent;
  // entering an operator when an operator already exists
  } else if (e.target.classList.contains('op') && opStore) {
    secondNum = displayText;
    displayText = operate(opStore, firstNum, secondNum).toString();
    firstNum = displayText;
    secondNum = null;
    opLive = e.target.textContent;
    opStore = null;
    updateDisplay();
  }

  if (DEBUG) {
    console.log(`clicked: ${e.target.textContent}
    displayText: ${displayText}
    firstNum: ${firstNum}
    secondNum: ${secondNum}
    opLive: ${opLive}
    opStore: ${opStore}`);
  }
}

function getClicks() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => btn.addEventListener('click', handleClick));
}

getClicks();

function operate (operator, a, b) {
  const x = +a;
  const y = +b;
  switch (operator) {
    case '+':
      return x + y;
    case '-':
      return x - y;
    case '*':
      return x * y;
    case '/':
      if (y === 0) {
        return "DIVISION BY 0";
      }
      return x / y;
    default:
      return "ERROR";
  }
}

