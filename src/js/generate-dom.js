// {
//   "glossary": {
//     "title": "example glossary",
//     "p2": "p2",
//     "empty": ""
//   }
// }
/**
 * @param {string} text
 */
export const lexer = (text) => {
  const tokens = [];
  let i = 0;
  let tabs = 0;

  while (i < text.length) {
    const char = text[i];
    switch (char) {
      case "{":
        parseOn("brace", "{");
        i++;
        continue;
      case "}":
        parseOn("brace", "}");
        i++;
        continue;
      case ":":
        parseOn("colon", ":");
        i++;
        continue;
      case ",":
        parseOn("comma", ",");
        i++;
        continue;
      case '"':
        const [value, length] = readString(text, i + 1);
        parseOn("string", value);
        i += length + 1;
        continue;
      case " ":
      case "\n":
      case "\t":
        i++;
        continue;
      default:
        i++;
        continue;
    }
  }
  return tokens;
};

const output = document.getElementById("output");
const createOrangeNode = (text) => {
  const node = document.createElement("span");
  node.classList.add("orange");
  node.innerText = text;
  return node;
};
const commaNode = createOrangeNode(",");
const openBraceNode = createOrangeNode("{");
const closeBraceNode = createOrangeNode("}");
const colonNode = createOrangeNode(":");

const createClonableTextNode = () => {
  const node = document.createElement("span");
  node.classList.add("text");
  return node;
};
const clonableTextNode = createClonableTextNode();
const createTextNode = (text) => {
  const node = clonableTextNode.cloneNode();
  node.innerText = text;
  return node;
};

const parseOn = (type, value) => {
  const when = {
    comma(_) {
      cloneAndAppend(commaNode);
    },
    string(value) {
      const node = createTextNode(value);
      output.appendChild(node);
    },
    brace(value) {
      // TODO: Fazer cada brace separado
      if (value === "{") {
        cloneAndAppend(openBraceNode);
      } else {
        cloneAndAppend(closeBraceNode);
      }
    },
    colon(_) {
      cloneAndAppend(colonNode);
    },
  };

  when[type](value);
};

const cloneAndAppend = (node) => {
  const clone = node.cloneNode(true);
  output.appendChild(clone);
};

const readString = (text, i) => {
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
};
