const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let current = '';
let reset = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const val = button.getAttribute('data-value');

    if (val === 'C') {
      current = '';
      display.textContent = '0';
    } else if (val === '=') {
      try {
        current = eval(current).toString();
        display.textContent = current;
        reset = true;
      } catch {
        display.textContent = 'Error';
        current = '';
      }
    } else {
      if (reset) {
        current = '';
        reset = false;
      }
      current += val;
      display.textContent = current;
    }
  });
});
