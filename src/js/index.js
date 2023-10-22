import { lexer } from "./generate-dom.js";
import { measure, runAfterFramePaint } from "./measure.js";

let openFirstChunks;
document.addEventListener("DOMContentLoaded", function () {
  let inputFile = document.getElementById("arquivo");
  let initialBlock = document.getElementById("index");

  inputFile.addEventListener("click", (e) => initialBlock.remove());

  inputFile.addEventListener("change", function (e) {
    openFirstChunks = measure("paint first chunks");
    let file = e.target.files[0];

    (async () => {
      const fileContentStream = await file.stream();
      await streamToText(fileContentStream);
    })();
  });

  const streamToText = async (blob) => {
    const readableStream = await blob.getReader({ mode: "byob" });

    while (true) {
      const { done, value } = await readableStream.read(new Uint8Array(1000));

      if (done) break;

      const text = new TextDecoder().decode(value);

      lexer(text);

      runAfterFramePaint(async () => {
        openFirstChunks.finish();
      });
    }
  };
});
