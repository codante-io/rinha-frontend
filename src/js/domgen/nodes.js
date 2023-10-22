import { createSpanNode } from "./creators.js";

export const commaNode = createSpanNode(",\n", "orange");
export const openBraceNode = createSpanNode("{\n", "orange");
export const closeBraceNode = createSpanNode("}", "orange");
export const openBracketNode = createSpanNode("[", "orange");
export const closeBracketNode = createSpanNode("]", "orange");
export const colonNode = createSpanNode(": ", "orange");
export const tabNode = createSpanNode("", "tab");
export const breakNode = createSpanNode("\n", "break");
