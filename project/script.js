const tree = document.getElementById("tree");

function splitJson(text) {
  const array = text.split("\n");
  return array;
}

function jsonToTree(arr) {
  let str = "";

  arr.forEach(line => {
    console.log(line);
    if(line[line.length - 1] == '{') str += '*';
    else if(line[line.length - 1] == '}') str = str.substring(0, str.length - 1)

      tree.innerHTML += `<li>${str}${line}</li>`
  });
}

  fetch("./small.json")
.then(res => res.json())
  .then(data => {
    text = JSON.stringify(data, null, " ");
    let ret = splitJson(text);
    jsonToTree(ret);
  })
.catch((err => console.error(err)))
