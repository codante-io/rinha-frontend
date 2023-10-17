const tree = document.getElementById("tree");

function splitJson(text) {
  const array = text.split("\n");
  return array;
}

function jsonToTree(arr) {
  let element = "li";
  let mom = tree;

  arr.forEach(line => {

    if(line[line.length - 1] === '}' ||
       line[line.length - 1] === ']' ||
       line[line.length - 2] === '}' ||
       line[line.length - 2] === ']' ) {

      mom = mom.parentNode;
    }

    var el = document.createElement(element)
    el.appendChild(document.createTextNode(`${line}`))

    mom.appendChild(el);
    if(element == "ul") {
      mom = el;
      element = "li";
    }

    console.log(line);
    if(line[line.length - 1] === '{' ||
        line[line.length - 1] === '[') {
    
      element = "ul";
    }
  });
}

  fetch("./verysmall.json")
.then(res => res.json())
  .then(data => {
    text = JSON.stringify(data, null, " ");
    let ret = splitJson(text);
    jsonToTree(ret);
  })
.catch((err => console.error(err)))

var uls = document.getElementsByTagName('ul')
uls = uls[0].childNodes

console.log(uls)