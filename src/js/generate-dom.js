class Generator {
  level = 0;
  lastBracked = null; // 0 - square, 1 - curly

  constructor() {}

  createVerticalLine() {
    const verticalLine = document.createElement("div");
    verticalLine.classList.add("line");
    return verticalLine;
  }

  addLine(line = "") {
    const lineElement = document.createElement("div");
    lineElement.classList.add("line");

    const foundSquareOpen = line.indexOf("[") != -1;
    const foundSquareClose = line.indexOf("]") != -1;
    const foundCurlyOpen = line.indexOf("{") != -1;
    const foundCurlyClose = line.indexOf("}") != -1;

    if (foundSquareOpen) {
      this.level++;
      this.lastBracked = 0;
    }
    if (foundSquareClose) {
      this.level--;
      this.lastBracked = 0;
    }

    for (let i = 0; i < level; i++) {
      lineElement.appendChild(createVerticalLine());
    }

    const [key, value] = line.split(":");

    const keyElement = document.createElement("span");
    keyElement.classList.add("key");

    return lineElement;
  }
}
