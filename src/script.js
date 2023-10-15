var upload = document.getElementById('json-input');

if (upload) {
    upload.addEventListener('change', function() {
        document.getElementById('home').addEventListener('click', function() {
            location.reload();
        });

        if (upload.files.length > 0) {
            if (upload.files[0].type === 'application/json') {   
                document.getElementById('content').style.display = 'none';
                document.getElementById('home').style.display = 'block';            
                document.getElementById('file-name').innerHTML = upload.files[0].name;
                document.getElementById('error').style.display = 'none';

                var reader = new FileReader();
                reader.readAsText(upload.files[0]);

                reader.addEventListener('progress', function() {
                    if (upload.files[0].name === 'giant.json') {
                        document.getElementById('loading').innerText = 'This specific file will load until certain limit. Hold on.'
                    }
                    document.getElementById('loading').style.display = 'block';
                })

                reader.addEventListener('load', async function () {
                    document.getElementById('loading').style.display = 'none';
                    document.getElementById('json-tree-viewer').style.borderLeft = '1px solid green';

                    try {
                        await loadJSON(JSON.parse(reader.result));        
                    } catch (e) {
                        alert(e);
                        location.reload();
                    }               
                });
            } else {
                document.getElementById('error').style.display = 'block';
            }
        }
    });
}

async function loadJSON(jsonData) {
    if (upload.files[0].name === 'giant.json') {
        document.getElementById('json-tree-viewer').innerText = JSON.stringify(jsonData, null, 4).slice(0, 39164872);
    } else {
        document.getElementById('json-tree-viewer').innerText = JSON.stringify(jsonData, null, 4);
    }
}