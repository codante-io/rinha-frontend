import { measure, runAfterFramePaint } from "./measure";
const bagulho = { measure, runAfterFramePaint };

let p = document.createElement("p");
p.textContent = "Opa mano bora testar com 6 p";

// document.addEventListener("DOMContentLoaded", function () {
//   let medirInnerHTML = measure("innerHTML");
//   document.body.innerHTML = `
//     <div>
//       <p>Opa mano bora testar com 6 p</p>
//       <p>Opa mano bora testar com 6 p</p>
//       <p>Opa mano bora testar com 6 p</p>
//       <p>Opa mano bora testar com 6 p</p>
//       <p>Opa mano bora testar com 6 p</p>
//       <p>Opa mano bora testar com 6 p</p>
//       <p>Opa mano bora testar com 6 p</p>
//       <p>Opa mano bora testar com 6 p</p>
//       <p>Opa mano bora testar com 6 p</p>
//       <p>Opa mano bora testar com 6 p</p>
//       <p>Opa mano bora testar com 6 p</p>
//     </div>
// `;

//   runAfterFramePaint(async () => {
//     medirInnerHTML.finish();
//   });
// });

//72,75,68ms

// let medirCreateElement = measure("innerHTML");

// document.addEventListener("DOMContentLoaded", function () {
//   for (let i = 0; i < 500000; i++) {
//     let p = document.createElement("p");
//     p.textContent = "Opa mano bora testar com 6 p";
//     document.body.appendChild(p);
//   }

//   runAfterFramePaint(async () => {
//     medirCreateElement.finish();
//   });
// });

// 79ms média

// //media de 60ms

// let medirCloneNode = measure("cloneNode");

// document.addEventListener("DOMContentLoaded", function () {
//   for (let i = 0; i < 500; i++) {
//     const paragrafo = p.cloneNode(true);
//     document.body.appendChild(paragrafo);
//   }
// });
// runAfterFramePaint(async () => {
//   medirCloneNode.finish();
// });

//70ms 76 72 77

const trampoline = (x) => {
  while (typeof x == "function") x = x();
  return x;
};

const lazy =
  (f) =>
  (...args) =>
  () =>
    f(...args);

function factorial(n) {
  let medirFatorial = measure("factorial trampoline");
  const f = lazy((a, n) => (n == 0 ? a : f(n * a, n - 1)));
  const result = trampoline(f(1, n));
  medirFatorial.finish();
  return result;
}

factorial(9999999);

// traditional factorial

function factorialTrad(n) {
  let medirFatorialTrad = measure("factorial tradicional");
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  medirFatorialTrad.finish();
  return result;
}
factorialTrad(9999999);

// otimização do chatgpt
const trampolineDifferent =
  (fn) =>
  (...args) => {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  };

const factorialOtimizado = (n, accumulator = 1) => {
  let medirFatorialOtimizado = measure("factorial otimizado");
  const factorialHelper = (n, accumulator) => {
    if (n <= 1) {
      return accumulator;
    }
    return () => factorialHelper(n - 1, n * accumulator);
  };
  const result = trampolineDifferent(factorialHelper)(n, accumulator);
  medirFatorialOtimizado.finish();

  return result;
};

factorialOtimizado(9999999);

const somarStrings = (str1) => {
  let tempoPushStrings = measure("push strings");
  let result = [];
  for (let i = 0; i < 500000; i++) {
    result.push(str1);
  }
  let resultString = result.join("");
  tempoPushStrings.finish();
  return resultString;
};

somarStrings("Opa mano bora testar com 6 p");

const somarStringsTrad = (str1) => {
  let tempoConcatStrings = measure("concat strings");
  let result = "";
  for (let i = 0; i < 500000; i++) {
    result += str1;
  }
  tempoConcatStrings.finish();
  return result;
};

somarStringsTrad("Opa mano bora testar com 6 p");
