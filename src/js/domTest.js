const image = new Image();
image.src = "../../../tae.gif";

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
  let medirFatorial = measure("factorial trampoline", { willAlert: false });
  const f = lazy((a, n) => (n == 0 ? a : f(n * a, n - 1)));
  const result = trampoline(f(1, n));
  medirFatorial.finish();
  return result;
}

factorial(9999999);

// traditional factorial

function factorialTrad(n) {
  let medirFatorialTrad = measure("factorial tradicional", {
    willAlert: false,
  });
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
  let medirFatorialOtimizado = measure("factorial otimizado", {
    willAlert: false,
  });
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
  let tempoPushStrings = measure("push strings", { willAlert: false });
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
  let tempoConcatStrings = measure("concat strings", { willAlert: false });
  let result = "";
  for (let i = 0; i < 500000; i++) {
    result += str1;
  }
  tempoConcatStrings.finish();
  return result;
};

somarStringsTrad("Opa mano bora testar com 6 p");

// consoles
// const consoles = measure("consoles");

// for (let i = 0; i < 20; i++) {
//   console.log("Opa testando essa bagaça" + i);
// }
// consoles.finish();

// fim testes console
let button = document.getElementById("btn");
button.addEventListener("click", function () {
  //warmup
  // let spanWarm = document.createElement("span");
  // for (let i = 0; i < 100; i++) {
  //   document.body.appendChild(spanWarm.cloneNode(true));
  // }
  //testes de tabs:

  let mondiSpan = measure("span", { willAlert: false });
  let span = document.createElement("span");
  span.style.borderLeft = "1px solid black";
  span.style.width = "10px";
  span.style.height = "10px";

  for (let i = 0; i < 69; i++) {
    document.body.appendChild(span.cloneNode(true));
  }
  runAfterFramePaint(() => {
    mondiSpan.finish();
  });
});

let button2 = document.getElementById("btn2");
button2.addEventListener("click", function () {
  let divComBgInline = measure("div com bg inline", { willAlert: false });
  let div = document.createElement("div");
  div.style = "background-image: url(tae.gif)";
  div.style.width = "10px";
  div.style.height = "10px";

  for (let i = 0; i < 32; i++) {
    document.body.appendChild(div.cloneNode(true));
  }

  runAfterFramePaint(() => {
    divComBgInline.finish();
  });
});

let button3 = document.getElementById("btn3");
button3.addEventListener("click", function () {
  let divComBgClass = measure("div com bg class", { willAlert: false });
  let div2 = document.createElement("div");
  div2.className = "tab-img";

  for (let i = 0; i < 1000; i++) {
    document.body.appendChild(div2.cloneNode(true));
  }
  runAfterFramePaint(() => {
    divComBgClass.finish();
  });
});

let button4 = document.getElementById("btn4");
button4.addEventListener("click", function () {
  let divComBgInline = measure("div com bg inline", { willAlert: false });
  let div = document.createElement("div");
  div.style = "background-image: url(tae.gif)";
  div.style.width = "10px";
  div.style.height = "10px";

  for (let i = 0; i < 1000; i++) {
    document.body.appendChild(div.cloneNode(true));
  }

  runAfterFramePaint(() => {
    divComBgInline.finish();
  });
});

let button5 = document.getElementById("btn5");
button5.addEventListener("click", function () {
  let divComBgInline = measure("div com bg base64", { willAlert: false });
  let div = document.createElement("div");
  div.style =
    "background-image: url(data:image/gif;base64,R0lGODdhFAABAIABAL+/v////ywAAAAAFAABAAACBQyCqZsFADs=)";
  div.style.width = "10px";
  div.style.height = "10px";

  for (let i = 0; i < 1000; i++) {
    document.body.appendChild(div.cloneNode(true));
  }

  runAfterFramePaint(() => {
    divComBgInline.finish();
  });
});

let button6 = document.getElementById("btn6");
button6.addEventListener("click", function () {
  const testeDiv = document.createElement("div");
  testeDiv.innerHTML =
    '<span class="key">type</span><span class="orange">: </span><span class="string">"FeatureCollection"</span>';
  const timeToDom = measure("tempo pra jogar na tela:", { willAlert: false });

  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));
  output.appendChild(testeDiv.cloneNode(true));

  // for (let i = 0; i < 1000; i++) {
  //   document.body.appendChild(div.cloneNode(true));
  // }

  runAfterFramePaint(() => {
    timeToDom.finish();
  });
});
