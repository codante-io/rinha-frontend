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
