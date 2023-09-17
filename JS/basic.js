"use strict";
const displayTotal = document.querySelector(".total");
const displayOperation = document.querySelector(".calculate-display");
const keys = document.querySelectorAll(".calc-element");

let input = "";

for (const key of keys) {
 const keyValue = key.dataset.key;

 key.addEventListener("click", function () {
  if (keyValue == "clear") {
   input = "";
   displayTotal.innerHTML = "";
   displayOperation.innerHTML = "";
  } else if (keyValue === "backspace") {
   input = input.slice(0, -1);
   displayOperation.innerHTML = cleanInput(input);
  } else if (keyValue === "=") {
   let sum = eval(prepareInput(input));
   displayTotal.innerHTML = cleanOutput(sum);
  } else if (keyValue === "brackets") {
   if (
    input.indexOf("(") == -1 ||
    (input.indexOf("(") != -1 &&
     input.indexOf(")") != -1 &&
     input.lastIndexOf("(") < input.lastIndexOf(")"))
   ) {
    input += "(";
   } else if (
    (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
    (input.indexOf("(") != -1 &&
     input.indexOf(")") != -1 &&
     input.lastIndexOf("(") > input.lastIndexOf(")"))
   ) {
    input += ")";
   }

   displayOperation.innerHTML = cleanInput(input);
  } else {
    if (validateInput(keyValue)) {
      input += keyValue;
      displayOperation.innerHTML = cleanInput(input);
    }
  }
 });
}

function cleanInput(input) {
 let inputArray = input.split("");
 let inputArrayLength = inputArray.length;

 for (let i = 0; i < inputArrayLength; i++) {
  if (inputArray[i] == "*") {
   inputArray[i] = ` <span class="operator">×</span> `;
  } else if (inputArray[i] == "/") {
   inputArray[i] = ` <span class="operator">÷</span> `;
  } else if (inputArray[i] == "+") {
   inputArray[i] = ` <span class="operator">+</span> `;
  } else if (inputArray[i] == "-") {
   inputArray[i] = ` <span class="operator">-</span> `;
  } else if (inputArray[i] == "(") {
   inputArray[i] = `<span class="operator">(</span>`;
  } else if (inputArray[i] == ")") {
   inputArray[i] = `<span class="operator">)</span>`;
  } else if (inputArray[i] == "%") {
    inputArray[i] = `<span class="percent">%</span>`;
  }
 }

 return inputArray.join("");
}

function cleanOutput(output) {
  let outputString = output.toString();
  let decimal = outputString.split(".")[1];
  outputString = outputString.split(".")[0];
  let outputArray = outputString.split("");

  if (outputArray.length > 3) {
    for (let i = outputArray.length - 3; i > 0; i -= 3) {
      outputArray.splice(i, 0, ",");
    }
  }

  if (decimal) {
    outputArray.push(".");
    outputArray.push(decimal);
  }
  return outputArray.join("");
}


function validateInput(value) {
  let lastInput = input.slice(-1);
  let operatorsArray = ["+", "-", "*", "/"];
  if (value == "." && lastInput == ".") {
    return false;
  }
  if (operatorsArray.includes(value)) {
    if (operatorsArray.includes(lastInput)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function prepareInput(input) {
 let inputArray = input.split("");
 for (let i = 0; i < inputArray.length; i++) {
  if (inputArray[i] == "%") {
   inputArray[i] = "/100";
  }
 }

 return inputArray.join("");
};