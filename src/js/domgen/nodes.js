import { createSpanNode } from "./creators.js";

export const openBracketNode = createSpanNode("[", "orange");
export const closeBracketNode = createSpanNode("]", "orange");
export const colonNode = createSpanNode(": ", "orange");
export const tabNode = createSpanNode("", "tab");
export const breakNode = createSpanNode("\n", "break");
export const nullNode = createSpanNode("null", "string");
