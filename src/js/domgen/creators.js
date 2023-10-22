export const createSpanNode = (content, className) => {
  const node = document.createElement("span");
  node.classList.add(className);
  node.innerText = content;
  return node;
};

export const createStringNode = (text) => createSpanNode(text, "string");
export const createKeyNode = (text) => createSpanNode(text, "key");
export const createArrayKeyNode = (text) => createSpanNode(text, "array-key");
