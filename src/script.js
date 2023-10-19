const tree = document.getElementById("tree");

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

jQuery(() => {
  
  $(document).on('click' ,'li.test', function(e) {
    alert("Clicou")
  })

  const input = document.getElementById("input")
  input.addEventListener("change", handle);

  function handle() {
    let file = input.files[0]

    let reader = new FileReader()
    reader.onload = (e) => {
      const json = JSON.stringify(JSON.parse(e.target.result), null, 2)
      const lines = json.split("\n")

      console.log(json)
      console.log("worked")
      console.log(lines)

      jsonToTree(lines)
    }
    reader.readAsText(file, "UTF-8")
  }
})
