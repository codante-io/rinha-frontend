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
    scope: "",
  };

  return (text) => {
    let i = 0;

    while (i < text.length) {
      let char = text[i];

      if (char === "{") {
        if (!helpers.isInsideString) {
          console.log("abrir object");
        }
        // se não tiver no meio de uma string
        helpers.scope = "object";
      } else if (char === "[") {
        if (!helpers.isInsideString) {
          console.log("abrir array");
        }
        // se não tiver no meio de uma string...
        helpers.scope = "array";
      } else if (char === "}") {
        //se não tiver no meio de uma string
        if (!helpers.isInsideString) {
          console.log("fechar object");
        }
        helpers.scope = "";
      } else if (char === "]") {
        if (!helpers.isInsideString) {
          console.log("fechar array");
        }
        //se não tiver no meio de uma string
        helpers.scope = "";
      } else if (char === ":") {
        helpers.isAfterColon = true;
        if (!helpers.isInsideString) {
          console.log("dois pontos");
        }
        // se não tiver no meio de uma string
      } else if (char === ",") {
        helpers.isAfterColon = false;
        if (!helpers.isInsideString) {
          if (helpers.isInsideNumber) {
            console.log("NUMBER >>> ", helpers.accumulatedNumber);
            helpers.accumulatedNumber = "";
            helpers.isInsideNumber = false;
          }
          if (helpers.isInsideBooleanOrNull) {
            console.log("BOOL_NULL >>> ", helpers.accumulatedBooleanOrNull);
            helpers.accumulatedBooleanOrNull = "";
            helpers.isInsideBooleanOrNull = false;
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
          if (!helpers.isAfterColon) {
            console.log("OBJECT_KEY >>> ", helpers.accumulatedString);
          } else {
            console.log("STRING >>> ", helpers.accumulatedString);
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
      } else if (!isNaN(Number(char)) && !isNaN(parseFloat(char))) {
        // se não tiver aberto um aspas antes
        if (!helpers.isInsideString) {
          helpers.isInsideNumber = true;
          helpers.accumulatedNumber += char;
        }
      } else if (helpers.isInsideString) {
        helpers.accumulatedString += char;
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
