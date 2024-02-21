let currentNumber = "";
let currentOperator = "";
let decimalAdded = false;
let calculateString = "";

function display(input) {
  const displayElement = document.getElementById("calculator__back__display");
  console.log("Display function start");
  const operatorsArr = ["+", "-", "*", "÷"];

  if (operatorsArr.includes(input) && calculateString === "") {
    return;
  }
  if (operatorsArr.includes(input)) {
    displayElement.value = "";
    if (operatorsArr.includes(currentOperator)) {
      currentOperator = input;
      if (calculateString.slice(-1).match(/[+\-*/÷]/)) {
        calculateString = calculateString.slice(0, -1) + input;
      } else if (currentNumber === "") {
        return;
      } else {
        calculateString += input;
      }
    } else {
      currentOperator = input;
      currentNumber = displayElement.value;
      displayElement.value = "";
      decimalAdded = false;
      calculateString += input;
    }
  } else {
    if (input === "%") {
      if (currentOperator !== "") {
        handlePercentage(displayElement);
        currentNumber = displayElement.value;
        currentOperator = "";
        calculateString += currentNumber;
      } else {
        currentNumber = (parseFloat(displayElement.value) / 100).toString();
        displayElement.value = currentNumber;
        calculateString += currentNumber;
      }
      return;
    }
    if (input === ".") {
      if (decimalAdded) {
        return;
      }
      if (currentNumber === "" || isNaN(parseFloat(currentNumber))) {
        displayElement.value = "0.";
        currentNumber = "0";
        calculateString += input;
      } else if (currentOperator !== "" && displayElement.value === "") {
        displayElement.value = "0.";
        calculateString += input;
      } else {
        displayElement.value += input;
        calculateString += input;
      }
      decimalAdded = true;
      return;
    }

    if (displayElement.value === "0" && !isNaN(input)) {
      displayElement.value = input;
      currentNumber = input;
      calculateString += input;
      return;
    }
    if (currentNumber === "0" && !decimalAdded && !isNaN(input)) {
      currentNumber = "";
      calculateString += input;
    }
    if (currentNumber === "" && !isNaN(input)) {
      currentNumber = input;
      displayElement.value = currentNumber;
      calculateString += input;
    } else {
      displayElement.value += input;
      calculateString += input;
    }
  }
}

function clearDisplay() {
  const displayElement = document.getElementById("calculator__back__display");
  displayElement.value = "";
  currentNumber = "";
  currentOperator = "";
  decimalAdded = false;
  calculateString = "";
}

function calculate() {
  const displayElement = document.getElementById("calculator__back__display");
  let result;
  console.log("calculation begins");
  console.log("calculateString :", calculateString);
  console.log("calculation ends");
  try {
    const func = new Function("return " + calculateString);
    result = func();
    calculateString = result;
  } catch (error) {
    result = "Error";
  }
  displayElement.value = result;
  currentNumber = "";
  currentOperator = "";
  return result;
}

function negativePositive() {
  const displayElement = document.getElementById("calculator__back__display");
  const currentValue = parseFloat(displayElement.value);
  if (!isNaN(currentValue)) {
    displayElement.value = -currentValue;
    currentNumber = displayElement.value;
  }
}

function handlePercentage(displayElement) {
  let currentValue = parseFloat(displayElement.value);
  console.log("currentValue ", currentValue);
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
