export function removeElement(element) {
  var i = element.childNodes.length;
  while (i--) {
    element.removeChild(element.lastChild);
  }
}
