// Select DOM elements
const display = document.querySelector(".calc__calculation"); // Calculation display
const resultDisplay = document.querySelector(".calc__result"); // Result display
const buttons = [...document.querySelectorAll(".calc__button")]; // All buttons

let isShowResult = false;

const clearButton = document.querySelector("[data-action='ce']");
clearButton.addEventListener("click", clearDisplay);

function clearDisplay() {
  if (display.textContent === "0") return;
  display.textContent =
    display.textContent.length === 1 ? "0" : display.textContent.slice(0, -1);
}

const resetButton = document.querySelector("[data-action='c']");
resetButton.addEventListener("click", resetCalculator);

function resetCalculator() {
  display.textContent = "0";
  resultDisplay.textContent = "";
}

const digitButtons = buttons.filter((button) =>
  /[0-9]/.test(button.getAttribute("data-action"))
);
digitButtons.forEach((button) => button.addEventListener("click", handleDigit));

function handleDigit(event) {
  if (isShowResult == true) {
    resetCalculator();
  }
  isShowResult = false;
  const buttonValue = event.target.getAttribute("data-action");
  // Prevent leading zero unless current display is zero
  if (buttonValue === "0" && display.textContent === "0") return;
  else if (buttonValue !== "0" && display.textContent === "0")
    display.textContent = buttonValue;
  else display.textContent += buttonValue;
}

const operatorButtons = buttons.filter((button) =>
  /[\/*+-]/.test(button.getAttribute("data-action"))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", handleOperator)
);

function handleOperator(e) {
  if (isShowResult == true) {
    resetCalculator();
  }
  isShowResult = false;
  const buttonValue = e.target.getAttribute("data-action");
  if (/[\/+*]/.test(buttonValue) && display.textContent === "0") return;
  if (/[\/+*]/.test(buttonValue) && display.textContent === "-") return;
  if (/[-]/.test(buttonValue) && display.textContent === "0")
    display.textContent = buttonValue;
  else if (/[\/*+-]/.test(display.textContent.slice(-1)))
    display.textContent = display.textContent.slice(0, -1) + buttonValue;
  else display.textContent += buttonValue;
}

function extractOperatorAndOperands(expression) {
  // Check for trailing operator (unfinished calculation)
  if (/[\/+*-.]/.test(expression.slice(-1))) {
    displayError("Please complete the calculation with a number.");
    return;
  }
  // Extraction des opérandes et de l'opérateur
  const operands = expression.match(/(-?\d+(\.\d+)?)([+\-*/])(-?\d+(\.\d+)?)/);
  // const operands = expression.match(/(-?\d+)([+\-*/])*(-?\d+)*/);
  // const operands = expression.match(/(-?\d*)*([+\-*/])*(-?\d*)*/);
  let operand1, operand2, operator;
  operator = operands[3];
  try {
    operand1 = Number(operands[1]);
    operand2 = Number(operands[4]);
  } catch (error) {
    displayError("Invalid number format.");
    return;
  }

  return {
    operand1,
    operand2,
    operator,
  };
}

const equalsButton = document.querySelector("[data-action='=']");
equalsButton.addEventListener("click", showResult);

function showResult() {
  const calculationData = extractOperatorAndOperands(display.textContent);

  const result = calculate(
    calculationData.operand1,
    calculationData.operand2,
    calculationData.operator
  );

  resultDisplay.textContent = display.textContent;
  display.textContent = result;

  if (!result) {
    display.textContent = resultDisplay.textContent;
  }
  if (result == "0") {
    display.textContent = result;
  }
  console.log(result);
  isShowResult = true;
}

function calculate(operand1, operand2, operator) {
  let result;

  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "*":
      result = operand1 * operand2;
      break;
    case "/":
      if (operand2 === 0) {
        displayError("Division by zero is not allowed.");
        return;
      }
      result = operand1 / operand2;
      break;
  }

  return result;
}

const decimalButton = document.querySelector("[data-action='.']");
decimalButton.addEventListener("click", handleDecimal);

function handleDecimal() {
  if (!display.textContent) return;

  let lastNumberSet = "";
  for (let i = display.textContent.length - 1; i >= 0; i--) {
    if (/[\/+*-]/.test(display.textContent[i])) {
      break;
    } else {
      lastNumberSet += display.textContent[i];
    }
  }

  if (!lastNumberSet.includes(".")) {
    display.textContent += ".";
  }
}

function displayError(message) {
  resultDisplay.textContent = message;
  setTimeout(() => {
    display.textContent = "0";
    resultDisplay.textContent = "";
  }, 2000);
}
