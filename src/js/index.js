import { measure, runAfterFramePaint } from "./measure.js";
document.addEventListener("DOMContentLoaded", function () {
  let inputArquivo = document.getElementById("arquivo");
  let divLines = document.getElementById("output");
  let indexDiv = document.getElementById("index");

  inputArquivo.addEventListener("click", (e) => {
    // indexDiv.setAttribute("style", "display: none");
    setTimeout(() => indexDiv.remove(), 1000);
  });

  inputArquivo.addEventListener("change", function (e) {
    const openFirstChunks = measure("paint first chunks");
    let file = e.target.files[0];
    let p = document.createElement("p");

    (async () => {
      const fileContentStream = await file.stream();
      let first2Parts = await streamToText(fileContentStream);

      runAfterFramePaint(async () => {
        openFirstChunks.finish();
      });
      p.textContent = first2Parts;
      divLines.appendChild(p);
    })();
  });

  const streamToText = async (blob) => {
    const readableStream = await blob.getReader({
      mode: "byob",
    });

    while (true) {
      const { done, value } = await readableStream.read(new Uint8Array(2000));

      if (done) {
        break;
      }

      const text = new TextDecoder().decode(value);
      processChunkToDOM(text);
    }
  };

  const processChunkToDOM = (chunk) => {
    let p = document.createElement("p");

    p.textContent = chunk;

    divLines.appendChild(p);
  };
});
