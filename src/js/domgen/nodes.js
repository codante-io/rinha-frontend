import { createSpanNode } from "./creators.js";

export const openBracketNode = createSpanNode("[", "orange");
export const closeBracketNode = createSpanNode("]", "orange");
export const colonNode = createSpanNode(":", "colon");
export const tabNode = createSpanNode("", "tab");
export const breakNode = createSpanNode("\n", "break");
export const nullNode = createSpanNode("null", "string");

export const tabImageNode = document.createElement("div");
tabImageNode.className = "tab-img";
