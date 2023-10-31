import { createParser as parserTeste } from "./generate-dom2.js";
import { measure, runAfterFramePaint } from "./measure.js";
let openFirstChunks;

var throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;
  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

const handleInfiniteScroll = (callback) => {
  let limitToLoadMore =
    document.body.offsetHeight * 0.1 < 500
      ? document.body.offsetHeight * 0.1
      : 500;
  throttle(() => {
    const endOfPage =
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - limitToLoadMore;

    if (endOfPage) {
      console.log("end of page");
      callback();
    }
  }, 300);
};

const image = new Image();
image.src = "./tae.gif";

const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

document.addEventListener("DOMContentLoaded", function () {
  let inputFile = document.getElementById("arquivo");
  let initialBlock = document.getElementById("index");

  inputFile.addEventListener("click", (e) => initialBlock.remove());

  inputFile.addEventListener("change", function (e) {
    openFirstChunks = measure("paint first chunks", { willAlert: false });
    /** @type {File} */
    let file = e.target.files[0];

    document.getElementById("filename").innerText = file.name;

    streamToText(file);
  });

  async function readOne(stream, createParserBeta, length = 3000) {
    const { done, value } = await stream.read(new Uint8Array(length));
    const text = new TextDecoder().decode(value);

    createParserBeta(text, done);
    return done;
  }

  const streamToText = async (file) => {
    const blob = file.stream();

    let finished = false;
    const readableStream = await blob.getReader({ mode: "byob" });
    const createParserBeta = parserTeste();
    console.log("começou nova chunk");
    const { done, value } = await readableStream.read(new Uint8Array(500));
    const text = new TextDecoder().decode(value);

    createParserBeta(text, done);
    handleInfiniteScroll(() => {
      readOne(readableStream, createParserBeta, 500);
    });

    window.addEventListener("scroll", () =>
      handleInfiniteScroll(async () => {
        if (!finished) {
          let done = await readOne(readableStream, createParserBeta);
          finished = done;
        }
      })
    );

    runAfterFramePaint(async () => {
      openFirstChunks.finish();

      worker.postMessage(file);
      worker.onmessage = function (e) {
        if (e.data === true) {
          alert("Arquivo válido");
        } else {
          alert("Arquivo inválido");
          window.location.reload();
        }
      };
    });
  };
});
