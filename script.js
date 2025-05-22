let expression = '';
let result = '0';

const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');

function updateDisplay() {
  expressionDisplay.textContent = expression || '0';
  resultDisplay.textContent = result;
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.textContent.trim();

    if (value === 'AC') {
      expression = '';
      result = '0';
    } else if (value === '⌫') {
      expression = expression.slice(0, -1);
    } else if (value === '=') {
      try {
        result = eval(expression).toString();
      } catch {
        result = 'Error';
      }
    } else {
      expression += value;
    }

    updateDisplay();
  });
});

updateDisplay();
