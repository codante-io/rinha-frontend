const content = document.getElementById("content");

function splitJson(text) {
  const array = text.split("\n");
  return array;
}

  fetch("./small.json")
.then(res => res.json())
  .then(data => {
    text = JSON.stringify(data, null, " ");
    let ret = splitJson(text);

    console.log(ret);
  })
.catch((err => console.error(err)))
