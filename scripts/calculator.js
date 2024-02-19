let currentNumber = "";
let currentOperator = "";

function display(input) {
  const displayElement = document.getElementById("calculator__back__display");

  if (["+", "-", "*", "÷"].includes(input)) {
    { currentOperator = input;
      currentNumber = displayElement.value;
      displayElement.value = "";
    }
  } else {
    if (input === "%") {
      if (currentOperator !== "") {
        handlePercentage(displayElement);
        currentOperator = "";
      } else {
        currentNumber = (parseFloat(displayElement.value) / 100).toString();
        displayElement.value = currentNumber;
      }
      return;
    } else {
      displayElement.value += input;
    }
  }
}

function clearDisplay() {
  const displayElement = document.getElementById("calculator__back__display");
  displayElement.value = "";
  currentNumber = "";
  currentOperator = "";
}

function calculate() {
  const displayElement = document.getElementById("calculator__back__display");
  let secondNumber = displayElement.value;
  let result;

  switch (currentOperator) {
    case "+":
      result = (parseFloat(currentNumber) + parseFloat(secondNumber))
        .toFixed(8)
        .replace(/\.?0+$/, "");
      break;
    case "-":
      result = (parseFloat(currentNumber) - parseFloat(secondNumber))
        .toFixed(8)
        .replace(/\.?0+$/, "");
      break;
    case "*":
      result = (parseFloat(currentNumber) * parseFloat(secondNumber))
        .toFixed(8)
        .replace(/\.?0+$/, "");
      break;
    case "÷":
      result = (parseFloat(currentNumber) / parseFloat(secondNumber))
        .toFixed(8)
        .replace(/\.?0+$/, "");
      break;
    case "%":
      result = (
        parseFloat(currentNumber) *
        (1 + parseFloat(secondNumber) / 100)
      )
        .toFixed(8)
        .replace(/\.?0+$/, "");
      break;
    default:
      result = parseFloat(secondNumber);
  }

  displayElement.value = parseFloat(result);
  currentNumber = "";
  currentOperator = "";

  return result;
}

function negativePositive() {
  const displayElement = document.getElementById("calculator__back__display");
  const currentValue = parseFloat(displayElement.value);
  if (!isNaN(currentValue)) {
    displayElement.value = -currentValue;
  }
}

function handlePercentage(displayElement) {
  let currentValue = parseFloat(displayElement.value);
  if (!isNaN(currentValue)) {
    switch (currentOperator) {
      case "+":
        displayElement.value = (
          parseFloat(currentNumber) +
          (parseFloat(currentNumber) * currentValue) / 100
        ).toString();
        break;
      case "-":
        displayElement.value = (
          parseFloat(currentNumber) -
          (parseFloat(currentNumber) * currentValue) / 100
        ).toString();
        break;
      case "*":
        displayElement.value = (
          (parseFloat(currentNumber) * currentValue) /
          100
        ).toString();
        break;
      case "÷":
        displayElement.value = (
          (parseFloat(currentNumber) / currentValue) *
          100
        ).toString();
        break;
      default:
        displayElement.value = (currentValue / 100).toString();
    }
  }
}
