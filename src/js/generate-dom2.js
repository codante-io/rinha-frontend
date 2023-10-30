import {
  createArrayKeyNode,
  createKeyNode,
  createStringNode,
} from "./domgen/creators";
import {
  breakNode,
  closeBracketNode,
  colonNode,
  nullNode,
  openBracketNode,
  tabImageNode,
  tabNode,
} from "./domgen/nodes";

export const createParser = () => {
  let helpers = {
    partialValue: [""],
    isAfterColon: false,
    isInsideString: false,
    isInsideNumber: false,
    isInsideBooleanOrNull: false,
    accumulatedString: "",
    accumulatedNumber: "",
    accumulatedBooleanOrNull: "",
    scopes: [],
  };
  let vdom = document.createDocumentFragment();
  const output = document.getElementById("output");

  function putLineToDom() {
    const line = document.createElement("div");
    line.className = "line";
    line.appendChild(vdom);
    vdom = document.createDocumentFragment();
    output.appendChild(line);
  }

  function cloneToVdom(node) {
    const clonedNode = node.cloneNode(true);

    vdom.appendChild(clonedNode);
  }

  function cloneTabsOld() {
    let i = 0;
    const tabs = getTabs(helpers.scopes);
    while (i < tabs) {
      const cloneTab = tabNode.cloneNode(true);
      vdom.appendChild(cloneTab);
      i++;
    }
  }

  function cloneTabs() {
    let i = 0;
    const tabWidth = getTabs(helpers.scopes) * 20;

    const cloneTab = tabImageNode.cloneNode(true);
    cloneTab.style.width = tabWidth + "px";

    vdom.appendChild(cloneTab);
  }

  function getTabs(scopes) {
    const subTabs = scopes[0].type === "object" ? 1 : 0;

    return scopes.length - subTabs;
  }

  return (text, done) => {
    let i = 0;

    while (i < text.length) {
      let char = text[i];

      if (char === "{") {
        if (!helpers.isInsideString) {
          // se não tiver no meio de uma string
          helpers.isAfterColon = false;

          console.log("abrir object");
          putLineToDom();
        }
        helpers.scopes.push({ type: "object", index: 0 });
      } else if (char === "[") {
        if (!helpers.isInsideString) {
          console.log("abrir array");

          if (helpers.scopes.at(-1).type === "object") {
            console.log("ARRAY_IN_OBJECT");
            cloneToVdom(openBracketNode);
            cloneToVdom(breakNode);
          } else if (helpers.scopes.at(-1).type === "array") {
            console.log("ARRAY_IN_ARRAY");
            cloneTabs();
            cloneToVdom(openBracketNode);
            cloneToVdom(breakNode);
          }
          putLineToDom();
        }
        // se não tiver no meio de uma string...
        helpers.scopes.push({ type: "array", index: 0 });
      } else if (char === "}") {
        //se não tiver no meio de uma string
        if (!helpers.isInsideString) {
          console.log("fechar object");
        }
        helpers.scopes.pop();
      } else if (char === "]") {
        if (!helpers.isInsideString) {
          if (helpers.isInsideBooleanOrNull) {
            // TODO: solucao [001]
            console.log(
              "BOOL_IN_ARRAY >>> ",
              helpers.accumulatedBooleanOrNull,
              "index: " + helpers.scopes.at(-1).index
            );
            cloneTabs();
            vdom.appendChild(
              createArrayKeyNode(helpers.scopes.at(-1).index + ": ")
            );
            vdom.appendChild(
              createStringNode(helpers.accumulatedBooleanOrNull)
            );
            helpers.accumulatedBooleanOrNull = "";
            helpers.isInsideBooleanOrNull = false;
          }

          if (helpers.isInsideNumber) {
            console.log(
              "NUMBER_IN_ARRAY >>> ",
              helpers.accumulatedNumber,
              "index: " + helpers.scopes.at(-1).index
            );
            cloneTabs();
            vdom.appendChild(
              createArrayKeyNode(helpers.scopes.at(-1).index + ": ")
            );
            vdom.appendChild(createStringNode(helpers.accumulatedNumber));
            helpers.accumulatedNumber = "";
            helpers.isInsideNumber = false;
          }

          console.log("fechar array");
          helpers.scopes.pop();
          putLineToDom();
          cloneTabs();
          cloneToVdom(closeBracketNode);
        } else {
          helpers.scopes.pop();
        }
      } else if (char === ":") {
        helpers.isAfterColon = true;
        if (!helpers.isInsideString) {
          console.log("dois pontos");

          cloneToVdom(colonNode);
        }
        // se não tiver no meio de uma string
      } else if (char === ",") {
        helpers.isAfterColon = false;

        if (!helpers.isInsideString) {
          // aumentar o index caso o virgula indique um novo item de array
          // if (helpers.scopes.at(-1).type === "array") {
          //   helpers.scopes.at(-1).index++;
          // }

          if (helpers.isInsideNumber) {
            if (helpers.scopes.at(-1).type === "array") {
              console.log(
                "NUMBER_IN_ARRAY >>> ",
                helpers.accumulatedNumber,
                "index: " + helpers.scopes.at(-1).index
              );
              cloneTabs();
              vdom.appendChild(
                createArrayKeyNode(helpers.scopes.at(-1).index + ": ")
              );
              vdom.appendChild(createStringNode(helpers.accumulatedNumber));
            } else if (helpers.scopes.at(-1).type === "object") {
              console.log("NUMBER_In_OBJECT >>> ", helpers.accumulatedNumber);
              vdom.appendChild(createStringNode(helpers.accumulatedNumber));
            }
            helpers.accumulatedNumber = "";
            helpers.isInsideNumber = false;
          }
          if (helpers.isInsideBooleanOrNull) {
            if (helpers.scopes.at(-1).type === "array") {
              // TODO[001]: bug: number, null e boolean estão sendo renderizados
              //                 fora do array quando são o último item
              console.log(
                "BOOL_IN_ARRAY >>> ",
                helpers.accumulatedBooleanOrNull,
                "index: " + helpers.scopes.at(-1).index
              );
              cloneTabs();
              vdom.appendChild(
                createArrayKeyNode(helpers.scopes.at(-1).index + ": ")
              );
              vdom.appendChild(
                createStringNode(helpers.accumulatedBooleanOrNull)
              );
            } else {
              console.log("BOOL_NULL >>> ", helpers.accumulatedBooleanOrNull);
              vdom.appendChild(
                createStringNode(helpers.accumulatedBooleanOrNull)
              );
            }
            helpers.accumulatedBooleanOrNull = "";
            helpers.isInsideBooleanOrNull = false;
          }
          if (helpers.scopes.at(-1).type === "array") {
            helpers.scopes.at(-1).index++;
          }
          console.log("virgula");
          putLineToDom();
        }
        // se não tiver no meio de uma string
      } else if (char === '"') {
        // se não tiver no meio de uma string, abrir uma string
        //se tiver no meio de uma string, fechar a string, renderizar e limpar auxiliares
        helpers.isInsideString = !helpers.isInsideString;
        if (helpers.isInsideString) {
          helpers.accumulatedString = "";
        } else if (!helpers.isInsideString) {
          if (helpers.scopes.at(-1).type === "object") {
            if (!helpers.isAfterColon) {
              console.log(
                "OBJECT_KEY >>> ",
                helpers.accumulatedString,
                "scope " + helpers.scopes.at(-1).type
              );
              cloneTabs();
              vdom.appendChild(createKeyNode(helpers.accumulatedString));
            } else {
              console.log("STRING >>> ", helpers.accumulatedString);
              vdom.appendChild(
                createStringNode('"' + helpers.accumulatedString + '"')
              );
            }
          }
          if (helpers.scopes.at(-1).type === "array") {
            console.log(
              "STRING_IN_ARRAY >>> ",
              helpers.accumulatedString,
              "index: " + helpers.scopes.at(-1).index,
              "scope: " + helpers.scopes.at(-1).type
            );
            cloneTabs();
            vdom.appendChild(
              createArrayKeyNode(helpers.scopes.at(-1).index + ": ")
            );
            vdom.appendChild(
              createStringNode('"' + helpers.accumulatedString + '"')
            );
          }
          helpers.accumulatedString = "";
        }
      } else if (
        char === " " ||
        char === "\n" ||
        char === "\r" ||
        char === "\t"
      ) {
        // se não tiver aberto um aspas antes
        if (!helpers.isInsideString) {
          console.log("pula linha, espaço essas coisas");
        } else {
          // se tiver dentro de um aspas, inserir o caractere
          helpers.accumulatedString += char;
        }
      } else if (helpers.isInsideString) {
        helpers.accumulatedString += char;
      } else if (
        !isNaN(Number(char)) ||
        char === "-" ||
        char === "." ||
        char === "+" ||
        char === "e" ||
        char === "E"
      ) {
        // se não tiver aberto um aspas antes ou dentro de um boolean
        if (!helpers.isInsideString && !helpers.isInsideBooleanOrNull) {
          helpers.isInsideNumber = true;
          helpers.accumulatedNumber += char;
        } else if (helpers.isInsideBooleanOrNull) {
          helpers.accumulatedBooleanOrNull += char;
        }
      } else if (!helpers.isInsideNumber && !helpers.isInsideString) {
        // Essas condições acima são redundantes, mas são para deixar claro o que está acontecendo
        // booleanos e null

        helpers.isInsideBooleanOrNull = true;
        helpers.accumulatedBooleanOrNull += char;
      }

      i++;
    }

    if (done) {
      putLineToDom();
    }
  };
};
