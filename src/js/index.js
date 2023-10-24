import { createParser } from "./generate-dom.js";
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
    const parser = createParser();
    while (true) {
      const { done, value } = await readableStream.read(new Uint8Array(1000));

      const text = new TextDecoder().decode(value);
      runAfterFramePaint(async () => {
        openFirstChunks.finish();
      });
      console.log(text.substring(text.length - 6));
      parser(text, done);
      if (done) break;
    }
  };
});
