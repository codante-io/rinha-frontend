const content = document.getElementById("content");

let text = "";

function printJson(text) {
  console.log(text);
}

  fetch("./small.json")
.then(res => res.json())
  .then(data => {
    text = JSON.stringify(data, null, "*");
    content.innerText = text;
    printJson(text);
  })
.catch((err => console.error(err)))
