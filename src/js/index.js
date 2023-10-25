import { createParser } from "./generate-dom.js";
import { createParser as parserTeste } from "./generate-dom2.js";
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
    const createParserBeta = parserTeste();
    while (true) {
      console.log("começou nova chunk");
      const { done, value } = await readableStream.read(new Uint8Array(10));

      const text = new TextDecoder().decode(value);
      runAfterFramePaint(async () => {
        openFirstChunks.finish();
      });
      //parser(text, done);
      createParserBeta(text);
      console.log(text.substring(text.length - 6));
      if (done) break;
    }
  };
});
