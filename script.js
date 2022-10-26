let displayText = '0';

function updateDisplay() {
  const display = document.querySelector('.display');
  display.textContent = displayText;
}

updateDisplay();

function operate (operator, a, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        return "DIVISION BY 0";
      }
      return a / b;
    default:
      return "ERROR";
  }
}

