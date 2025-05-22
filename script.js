const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "AC") {
      expression = "";
      display.textContent = "0";
    } else if (value === "⌫") {
      expression = expression.slice(0, -1);
      display.textContent = expression || "0";
    } else if (value === "=") {
      try {
        expression = eval(expression).toString();
        display.textContent = expression;
      } catch {
        display.textContent = "Error";
        expression = "";
      }
    } else {
      expression += value === "×" ? "*" : value === "÷" ? "/" : value;
      display.textContent = expression;
    }
  });
});
