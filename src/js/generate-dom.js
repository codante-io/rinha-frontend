// {
//   "glossary": {
//     "title": "example glossary",
//     "p2": "p2",
//     "empty": ""
//   }
// }
import {
  colonNode,
  tabNode,
  closeBracketNode,
  openBracketNode,
  breakNode,
} from "./domgen/nodes.js";
import {
  createArrayKeyNode,
  createKeyNode,
  createSpanNode,
  createStringNode,
} from "./domgen/creators.js";

let tabs = 0;
let arrayCounters = [];
let isAfterColon = false;
let isInsideObject = false;

export const lexer = (text) => {
  const tokens = [];
  let i = 0;

  while (i < text.length) {
    const char = text[i];
    switch (char) {
      case "{":
        isInsideObject = true;
        parseOn("braceOpen");
        if (arrayCounters.length > 0) {
          parseOn("arrayKey", arrayCounters[arrayCounters.length - 1]++);
        }
        isAfterColon = false;
        i++;
        continue;
      case "}":
        parseOn("braceClose");
        i++;
        continue;
      case "[":
        isInsideObject = false;
        parseOn("bracketOpen");
        arrayCounters.push(0);
        isAfterColon = false;
        i++;
        continue;
      case "]":
        parseOn("bracketClose");
        arrayCounters.pop();
        i++;
        continue;
      case ":":
        parseOn("colon");
        isAfterColon = true;
        i++;
        continue;
      case ",":
        parseOn("comma"); // Does not parse comma character
        isAfterColon = false;
        i++;
        continue;
      case '"':
        const [value, length] = readString(text, i + 1);

        if (isAfterColon) {
          parseOn("string", value);
          isAfterColon = false;
        } else if (!isInsideObject) {
          parseOn("arrayKey", arrayCounters[arrayCounters.length - 1]++);

          parseOn("arrayString", value);
        } else {
          parseOn("key", value);
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
        parseOn("value", value2);
        i += length2;
        continue;
    }
  }
  return tokens;
};

const output = document.getElementById("output");

const parseOn = (type, value) => {
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
      return [value, length];
    }
    value += char;
    length++;
    i++;
  }
}
