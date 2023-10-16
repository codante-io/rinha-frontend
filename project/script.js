const content = document.getElementById("content");

function splitJson(text) {
  const array = text.split("\n");
  return array;
}

function jsonToTree(arr) {
  content.innerHTML += '<ul class="tree">'

  let str = "";

  arr.forEach(line => {
    console.log(line);
    if(line[line.length - 1] == '{') str += '*';
    else if(line[line.length - 1] == '}') str = str.substring(0, str.length - 1)

    content.innerHTML += `<li>${str}${line}</li>`
  });
    
  content.innerHTML += "</ul>"

}

  fetch("./small.json")
.then(res => res.json())
  .then(data => {
    text = JSON.stringify(data, null, " ");
    let ret = splitJson(text);
    jsonToTree(ret);
  })
.catch((err => console.error(err)))
