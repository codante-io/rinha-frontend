const tree = document.getElementById("tree");

function splitJson(text) {
  const array = text.split("\n");
  return array;
}

function jsonToTree(arr) {
  let element = "ul";
  let mom = tree;
  let add_class = false;

  arr.forEach(line => {

    if(line[line.length - 1] === '}' ||
       line[line.length - 1] === ']' ||
       line[line.length - 2] === '}' ||
       line[line.length - 2] === ']' ) {

      mom = mom.parentNode;
    }

    if(line[line.length - 1] === '{' ||
       line[line.length - 1] === '[') {
    
      element = "ul";
      let ne = document.createElement('ul');
      mom.appendChild(ne)
      mom = ne

      add_class = true;
    }

    var el = document.createElement('li')

    if(add_class) {
      $(el).addClass('test')
      add_class = false;
    }

    el.appendChild(document.createTextNode(`${line}`))
    mom.appendChild(el);

    if(element == "ul")
      element = "li";

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

jQuery(() => {
  
  $(document).on('click' ,'li.test', function(e) {
    alert("Clicou")


  })
})
