import wasmURL from "url:./release.wasm";
import testesFastJson from "./fast-json-tests.js";
const { FastJson } = require("fast-json");
const importObject = {
  main: {
    sayHello() {
      console.log("Hello from WebAssembly!");
    },
  },
  env: {
    abort(_msg, _file, line, column) {
      console.error("abort called at main.ts:" + line + ":" + column);
    },
  },
};

const wasmModule = WebAssembly.instantiateStreaming(
  fetch(wasmURL),
  importObject
).then((obj) => obj.instance.exports);

async function something() {
  // currentTime = performance.timeOrigin + performance.now();
  // const texto = await (await wasmModule).serializeJson("345");
  // afterTime = performance.timeOrigin + performance.now();
  // console.log("mandar e pegar de volta o textinho", afterTime - currentTime);
  // currentTime2 = performance.timeOrigin + performance.now();
  // JSON.parse(bigString);
  // afterTime2 = performance.timeOrigin + performance.now();
  // console.log("JSON.parse direto", afterTime2 - currentTime2);
  // currentTime3 = performance.timeOrigin + performance.now();
  // const fastJson = new FastJson();
  // fastJson.on("", (e) => {
  //   afterTime3 = performance.timeOrigin + performance.now();
  //   console.log("fast-json direto", afterTime3 - currentTime3);
  // });
  // fastJson.write(bigString);
}

testesFastJson();

something();
