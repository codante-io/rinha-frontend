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
        openFirstChunks();
      });
      p.textContent = first2Parts;

      divLines.appendChild(p);

      const buffer = await file.arrayBuffer();

      //   console.log(".buffer()", bufferToText(buffer));

      const fileSliceBlob = file.slice(0, file.length);
      const fileSliceBlobStream = await fileSliceBlob.stream();

      //   console.log(
      //     ".slice() and .stream()",
      //     await streamToText(fileSliceBlobStream)
      //   );
    })();
  });

  const streamToText = async (blob) => {
    const readableStream = await blob.getReader();
    const chunk = await readableStream.read();

    return new TextDecoder("utf-8").decode(chunk.value);
  };

  const bufferToText = (buffer) => {
    const bufferByteLength = buffer.byteLength;
    const bufferUint8Array = new Uint8Array(buffer, 0, bufferByteLength);

    return new TextDecoder().decode(bufferUint8Array);
  };
});
