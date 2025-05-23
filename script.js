const inputDisplay = document.getElementById('inputDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const buttons = document.querySelectorAll('.btn');

let input = '';
let finalized = false;

const operators = ['+', '-', '*', '/', '%', '.'];

function formatInput(expression) {
  // Replace a%b with a*(b/100)
  return expression.replace(/(\d+(\.\d+)?)\s*%\s*(\d+(\.\d+)?)/g, '($1*($3/100))')
                   // Replace single number with % (e.g., 10%) with (10/100)
                   .replace(/(\d+(\.\d+)?)%/g, '($1/100)');
}

function evaluateExpression(expr) {
  try {
  
    const formattedPercent = formatInput(expr);
    const formatted = formattedPercent.replace(/(\d+)\s*\^\s*(\d+)/g, 'Math.pow($1,$2)');
    return Function('"use strict"; return (' + formatted + ')')();
  } catch {
    return '';
  }
}


buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();

    if (value === 'AC') {
      input = '';
      inputDisplay.textContent = '0';
      resultDisplay.textContent = '';
      finalized = false;
      return;
    }

    if (value === '⌫') {
      input = input.slice(0, -1);
    } else if (value === '=') {
      if (!finalized) {
        const result = evaluateExpression(input);
        inputDisplay.textContent = result !== '' ? result : 'Err';
        resultDisplay.textContent = '';
        input = String(result);
        finalized = true;
      }
    } else {
      if (finalized) {
        input = '';
        finalized = false;
      }

      const lastChar = input.slice(-1);
      const isOperator = operators.includes(value);

      if (isOperator && operators.includes(lastChar)) {
        // Prevent duplicate operators
        input = input.slice(0, -1) + value;
      } else {
        input += value;
      }
    }

    if (!finalized) {
      inputDisplay.textContent = input || '0';
      const result = evaluateExpression(input);
      resultDisplay.textContent = result !== '' ? result : '';
    }
  });
});
