import { lexer } from "./generate-dom.js";
import { measure } from "./measure.js";

let openFirstChunks;
document.addEventListener("DOMContentLoaded", function () {
  let inputArquivo = document.getElementById("arquivo");
  let divLines = document.getElementById("output");
  let indexDiv = document.getElementById("index");

  inputArquivo.addEventListener("click", (e) => {
    // indexDiv.setAttribute("style", "display: none");
    setTimeout(() => indexDiv.remove(), 1000);
  });

  inputArquivo.addEventListener("change", function (e) {
    openFirstChunks = measure("paint first chunks");
    let file = e.target.files[0];

    (async () => {
      const fileContentStream = await file.stream();
      await streamToText(fileContentStream);
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
      lexer(text);
      // runAfterFramePaint(async () => {
      //   openFirstChunks.finish();
      // });
      // return;
    }
  };
});
