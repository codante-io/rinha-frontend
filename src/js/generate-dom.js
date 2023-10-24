// {
//   "glossary": {
//     "title": "example glossary",
//     "p2": "p2",
//     "empty": ""
//   }
// }
import {
  createArrayKeyNode,
  createKeyNode,
  createSpanNode,
  createStringNode,
} from "./domgen/creators.js";

import {
  breakNode,
  closeBracketNode,
  colonNode,
  openBracketNode,
  tabNode,
} from "./domgen/nodes.js";
import { measure } from "./measure.js";

export const createParser = () => {
  let partialValue = [""];
  let tabs = 0;
  let arrayCounters = [];
  let isAfterColon = false;
  let isInsideObject = false;

  let parserQueue = [];

  const output = document.getElementById("output");

  const parseQueue = () => {
    for (const item of parserQueue) {
      parseOn(item.type, item?.value);
    }
    console.log(parserQueue);
    parserQueue = [];
  };

  const addToParserQueue = ({ type, value, done }) => {
    if (!done) {
      parserQueue.push({ type, value });
      return;
    }
    parseOn(type, value);
  };

  const parseOn = (type, value) => {
    if (typeof value === "function") {
      value = value();
    }
    const when = {
      braceOpen: (_) => {
        cloneAndAppend(breakNode);
        appendTabs(tabs);
      },
      braceClose: (_) => {
        cloneAndAppend(breakNode);
        appendTabs(--tabs);
      },
      bracketOpen: (_) => {
        cloneAndAppend(openBracketNode);
        tabs++;
      },
      bracketClose: (_) => {
        cloneAndAppend(breakNode);
        appendTabs(--tabs);
        cloneAndAppend(closeBracketNode);
      },
      colon: (_) => {
        cloneAndAppend(colonNode);
      },
      comma: (_) => {
        cloneAndAppend(breakNode);
        appendTabs(tabs);
      },
      string(value) {
        const node = createStringNode(`"${value}"`);
        output.appendChild(node);
      },
      key(value) {
        const node = createKeyNode(value);
        output.appendChild(node);
      },
      value(value) {
        const node = createSpanNode(value);
        output.appendChild(node);
      },
      arrayKey(value) {
        // example: ["glossary": {
        let node;
        if (isInsideObject) {
          node = createArrayKeyNode(`${value}: \n`);
          output.appendChild(node);
          appendTabs(++tabs);
        } else {
          if (
            arrayCounters.length > 0 &&
            arrayCounters[arrayCounters.length - 1] == 1
          ) {
            cloneAndAppend(breakNode);
            appendTabs(tabs);
          }

          node = createArrayKeyNode(`${value}: `);
          output.appendChild(node);
        }
      },
      arrayString(value) {
        // example: ["title", "example glossary"]
        const node = createStringNode(`"${value}"`);
        output.appendChild(node);
      },
      // TODO: arrayValue [true, 12]
    };

    when[type](value);
  };

  const appendTabs = (tabs) => {
    for (let i = 0; i < tabs; i++) {
      cloneAndAppend(tabNode);
    }
  };

  const cloneAndAppend = (node) => {
    const clone = node.cloneNode(true);
    output.appendChild(clone);
  };

  function readString(text, i) {
    let value = "";
    let length = 0;
    while (i < text.length) {
      const char = text[i];
      if (char === '"') {
        return [value, length + 1];
      }
      value += char;
      length++;
      i++;
    }
  }

  function readValue(text, i) {
    let value = "";
    let length = 0;
    while (i < text.length) {
      const char = text[i];
      if (char === "," || char === "}" || char === "]") {
        console.log(value, length);
        return [value, length];
      }
      value += char;
      length++;
      i++;
    }
  }

  //parser
  return (text, done) => {
    if (partialValue) {
      partialValue.push(text);
      text = partialValue.join("");
    }
    let timeToFunction = measure("lexer");
    const tokens = [];
    let i = 0;
    let lastComma = 0;

    while (i < text.length) {
      const char = text[i];
      switch (char) {
        case "{":
          addToParserQueue(
            { type: "braceOpen", value: () => (isInsideObject = true) },
            done
          );
          if (arrayCounters.length > 0) {
            //parseOn("arrayKey", arrayCounters[arrayCounters.length - 1]++);
            addToParserQueue({
              type: "arrayKey",
              value: () => arrayCounters[arrayCounters.length - 1]++,
              done,
            });
          }
          isAfterColon = false;
          i++;
          continue;
        case "}":
          //parseOn("braceClose");
          addToParserQueue({ type: "braceClose", done });
          i++;
          continue;
        case "[":
          //parseOn("bracketOpen");
          addToParserQueue({
            type: "bracketOpen",
            done,
            value: () => {
              arrayCounters.push(0);
              isInsideObject = false;
            },
          });

          isAfterColon = false;
          i++;
          continue;
        case "]":
          //parseOn("bracketClose");
          addToParserQueue({
            type: "bracketClose",
            done,
            value: () => arrayCounters.pop(),
          });

          i++;
          continue;
        case ":":
          //parseOn("colon");
          addToParserQueue({ type: "colon", done });
          isAfterColon = true;
          i++;
          continue;
        case ",":
          lastComma = i;
          if (!done) parseQueue();
          parseOn("comma"); // Does not parse comma character
          isAfterColon = false;
          i++;
          continue;
        case '"':
          const string = readString(text, i + 1);
          if (string === undefined) {
            i = text.length;
            continue;
          }
          let value = string[0];
          let length = string[1];

          if (isAfterColon) {
            //parseOn("string", value);
            addToParserQueue({ type: "string", value, done });
            isAfterColon = false;
          } else if (!isInsideObject) {
            //parseOn("arrayKey", arrayCounters[arrayCounters.length - 1]++);
            addToParserQueue({
              type: "arrayKey",
              value: () => arrayCounters[arrayCounters.length - 1]++,
              done,
            });
            //parseOn("arrayString", value);
            addToParserQueue({ type: "arrayString", value, done });
          } else {
            //parseOn("key", value);
            addToParserQueue({ type: "key", value, done });
          }
          i += length + 1;
          continue;
        case " ":
        case "\n":
        case "\t":
          i++;
          continue;
        default:
          const [value2, length2] = readValue(text, i);
          //parseOn("value", value2);
          addToParserQueue({ type: "value", value: value2, done });
          i += length2;
          continue;
      }
    }
    if (lastComma != 0) {
      partialValue = [text.substring(lastComma + 1)];
      console.log("partial", partialValue);
      lastComma = 0;
      isAfterColon = false;
      parserQueue = [];
    }
    timeToFunction.finish();
    return tokens;
  };
};
