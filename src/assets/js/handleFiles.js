const arquivo = document.getElementById("arquivo");
const divIndex = document.getElementById("index");
const divOutput = document.getElementById("output");

arquivo.addEventListener("change", (e) => {
  divIndex.style.cssText = "display: none";
  currentTime12 = performance.timeOrigin + performance.now();
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = onReaderLoad;

  reader.readAsText(e.target.files[0]);
});

function render(content) {
  // const elementoNovo = document.createElement("div");
  // elementoNovo.innerHTML = content;
  // divOutput.appendChild(elementoNovo);
}
function onReaderLoad(e) {
  afterTime12 = performance.timeOrigin + performance.now();
  console.log("readAsText", afterTime12 - currentTime12);
  // Level 2 (no clock change risks)
  currentTime = performance.timeOrigin + performance.now();
  const arr = [];
  let count = 0;
  const json = JSON.parse(e.target.result, (e, f) => {
    arr.push(f);
    if (count < 40) {
      render(f);
    }
    count++;
  });

  afterTime = performance.timeOrigin + performance.now();

  console.log("JSON.parse", afterTime - currentTime);
  console.log(arr);

  currentTime2 = performance.timeOrigin + performance.now();

  // const canvas = document.getElementById("tree");
  // const context = canvas.getContext("2d");

  // context.font = "12px Arial";
  // context.fillText(JSON.stringify(json, null, 2), 0, 50);
}
