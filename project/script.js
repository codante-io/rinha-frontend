const content = document.getElementById("content");

fetch("test.json")
.then(res => res.text())
  .then(data => {
    content.innerHTML = data;
    console.log(`Here is: ${data}`)
  })
.catch((err => console.error(err)))
