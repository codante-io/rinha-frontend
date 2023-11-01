import { createParser } from "./generate-dom2.js";
import { measure, runAfterFramePaint } from "./measure.js";

let openFirstChunks;
let throttleTimer;
let finished = false;
const textDecoder = new TextDecoder();
const parser = createParser();

const image = new Image();
image.src = "./tae.gif";
document.body.appendChild(image);

const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

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

document.addEventListener("DOMContentLoaded", function () {
  const initialBlock = document.getElementById("index");
  const errorBlock = document.getElementById("error");

  if (this.location.hash === "#error") {
    errorBlock.style.display = "block";
    this.location.hash = "";
  }

  const inputFile = document.getElementById("arquivo");

  inputFile.addEventListener("change", function (e) {
    initialBlock.style.display = "none";
    errorBlock.style.display = "none";

    openFirstChunks = measure("paint first chunks", { willAlert: false });

    /** @type {File} */
    let file = e.target.files[0];

    streamToText(file);
  });

  async function readOne(stream, createParserBeta, length = 3000) {
    const { done, value } = await stream.read(new Uint8Array(length));
    const text = textDecoder.decode(value);

    createParserBeta(text, done);
    return done;
  }

  const streamToText = async (file) => {
    const blob = file.stream();
    const readableStream = await blob.getReader({ mode: "byob" });
    const { done, value } = await readableStream.read(new Uint8Array(500));
    const text = textDecoder.decode(value);

    const fileNameBlock = document.getElementById("filename");
    fileNameBlock.appendChild(document.createTextNode(file.name));

    parser(text, done);

    handleInfiniteScroll(() => {
      readOne(readableStream, parser, 500);
    });

    window.addEventListener("scroll", () =>
      handleInfiniteScroll(async () => {
        if (!finished) {
          let done = await readOne(readableStream, parser);
          finished = done;
        }
      })
    );

    runAfterFramePaint(async () => {
      openFirstChunks.finish();

      worker.postMessage(file);
      worker.onmessage = function (e) {
        if (e.data === false) {
          location.hash = "error";
          location.reload();
        }
      };
    });
  };
});
