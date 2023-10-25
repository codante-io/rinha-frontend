// {
//   "glossary": {
//     "title": "example glossary",
//     "p2": "p2",
//     "empty": ""
//   }
// }

export const createParser = () => {
  let helpers = {
    partialValue: [""],
    tabs: 0,
    arrayCounters: [],
    isAfterColon: false,
    isInsideString: false,
    isInsideNumber: false,
    isInsideBooleanOrNull: false,
    accumulatedString: "",
    accumulatedNumber: "",
    accumulatedBooleanOrNull: "",
    scopes: [],
  };

  return (text) => {
    let i = 0;

    while (i < text.length) {
      let char = text[i];

      if (char === "{") {
        if (!helpers.isInsideString) {
          helpers.isAfterColon = false;
          console.log("abrir object");
        }
        // se não tiver no meio de uma string
        helpers.scopes.push({ type: "object", index: 0 });
      } else if (char === "[") {
        if (!helpers.isInsideString) {
          console.log("abrir array, tabs " + helpers.tabs);
          helpers.tabs++;
        }
        // se não tiver no meio de uma string...
        helpers.scopes.push({ type: "array", index: 0 });
      } else if (char === "}") {
        //se não tiver no meio de uma string
        helpers.tabs--;
        if (!helpers.isInsideString) {
          console.log("fechar object");
        }
        helpers.scopes.pop();
      } else if (char === "]") {
        if (!helpers.isInsideString) {
          console.log("fechar array");
        }
        //se não tiver no meio de uma string
        helpers.scopes.pop();
      } else if (char === ":") {
        helpers.isAfterColon = true;
        if (!helpers.isInsideString) {
          console.log("dois pontos");
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
            } else if (helpers.scopes.at(-1).type === "object") {
              console.log("NUMBER_In_OBJECT >>> ", helpers.accumulatedNumber);
            }
            helpers.accumulatedNumber = "";
            helpers.isInsideNumber = false;
          }
          if (helpers.isInsideBooleanOrNull) {
            if (helpers.scopes.at(-1).type === "array") {
              console.log(
                "BOOL_IN_ARRAY >>> ",
                helpers.accumulatedBooleanOrNull,
                "index: " + helpers.scopes.at(-1).index
              );
            } else {
              console.log("BOOL_NULL >>> ", helpers.accumulatedBooleanOrNull);
            }
            helpers.accumulatedBooleanOrNull = "";
            helpers.isInsideBooleanOrNull = false;
          }
          if (helpers.scopes.at(-1).type === "array") {
            helpers.scopes.at(-1).index++;
          }
          console.log("virgula");
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
            } else {
              console.log("STRING >>> ", helpers.accumulatedString);
            }
          }
          if (helpers.scopes.at(-1).type === "array") {
            console.log(
              "STRING_IN_ARRAY >>> ",
              helpers.accumulatedString,
              "index: " + helpers.scopes.at(-1).index,
              "scope: " + helpers.scopes.at(-1).type
            );
          }
          helpers.accumulatedString = "";
        }
      } else if (char === " " || char === "\n" || char === "\t") {
        // se não tiver aberto um aspas antes
        if (!helpers.isInsideString) {
          console.log("pula linha, espaço essas coisas");
        } else {
          // se tiver dentro de um aspas, inserir o caractere
          helpers.accumulatedString += char;
        }
      } else if (helpers.isInsideString) {
        helpers.accumulatedString += char;
      } else if (!isNaN(Number(char)) && !isNaN(parseFloat(char))) {
        // se não tiver aberto um aspas antes
        if (!helpers.isInsideString) {
          helpers.isInsideNumber = true;
          helpers.accumulatedNumber += char;
        }
      } else if (!helpers.isInsideNumber && !helpers.isInsideString) {
        // Essas condições acima são redundantes, mas são para deixar claro o que está acontecendo
        // booleanos e null

        helpers.isInsideBooleanOrNull = true;
        helpers.accumulatedBooleanOrNull += char;
      }

      i++;
    }
  };
};
