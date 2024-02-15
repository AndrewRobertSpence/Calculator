function display(input) {
  document.getElementById("calculator__back__display").value += input;
  return input;
}

function clearDisplay() {
  document.getElementById("calculator__back__display").value = "";
}

function calculate() {
  let a = document.getElementById("calculator__back__display").value;
  let b = eval(a);
  document.getElementById("calculator__back__display").value = b;
  return b;
}

function negativePositive() {
  const display = document.getElementById("calculator__back__display");
  const currentValue = parseFloat(display.value);
  if (!isNaN(currentValue)) {
    display.value = -currentValue;
  }
}
